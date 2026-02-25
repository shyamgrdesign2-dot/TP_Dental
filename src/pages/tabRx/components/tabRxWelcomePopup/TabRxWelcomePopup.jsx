import React from "react";

/**
 * TabRxWelcomePopup
 *
 * Generic welcome / first‑time‑use popup for the TabRx experience.
 *
 * Props:
 * - open: boolean – controls visibility
 * - onClose: () => void – called when user closes the popup
 * - onGetStarted: () => void – primary CTA; defaults to onClose if not provided
 */
const TabRxWelcomePopup = ({ open, onClose, onGetStarted }) => {
  if (!open) return null;

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="tabrx-welcome-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        className="tabrx-welcome-card"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: 900,
          borderRadius: 24,
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          boxShadow:
            "0 18px 45px rgba(15, 23, 42, 0.35), 0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Left gradient panel */}
        <div
          className="tabrx-welcome-left"
          style={{
            flex: 1.1,
            minWidth: 0,
            padding: "24px 24px 24px 28px",
            color: "#FFFFFF",
            background:
              "radial-gradient(circle at top left, #161558 0%, #4B4AD5 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>

            <h2
              style={{
                marginTop: 16,
                marginBottom: 8,
                fontSize: 26,
                lineHeight: 1.25,
                fontWeight: 700,
              }}
            >
              Faster prescriptions.
              <br />
              Cleaner workspace.
            </h2>

            <p
              style={{
                margin: 0,
                marginTop: 6,
                fontSize: 13,
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              TabRx brings your entire consultation into a single, focused view –
              vitals, notes, investigations and billing all in one place.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 24,
              fontSize: 12,
              opacity: 0.92,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                }}
              >
                1
              </span>
              <span>Use the left rail to jump between sections.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                }}
              >
                2
              </span>
              <span>Everything autosaves as you type – no extra clicks.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                }}
              >
                3
              </span>
              <span>Switch back to classic view anytime from the header.</span>
            </div>
          </div>
        </div>

        {/* Right content panel */}
        <div
          className="tabrx-welcome-right"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "20px 24px 22px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 28,
                height: 28,
                borderRadius: "999px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 10,
                  height: 10,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: "50% 0 0 0",
                    height: 1.5,
                    backgroundColor: "#6B7280",
                    transform: "translateY(-50%) rotate(45deg)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    inset: "50% 0 0 0",
                    height: 1.5,
                    backgroundColor: "#6B7280",
                    transform: "translateY(-50%) rotate(-45deg)",
                  }}
                />
              </span>
            </button>
          )}

          <div style={{ marginBottom: 18, marginRight: 28 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Welcome to TabRx
            </h3>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: "#4B5563",
                lineHeight: 1.6,
              }}
            >
              A streamlined consultation workspace designed to reduce clicks and
              keep all patient details in sight while you prescribe.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flexGrow: 1,
            }}
          >
            <div
              style={{
                padding: 10,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                What&apos;s new
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 12,
                  color: "#4B5563",
                  lineHeight: 1.55,
                }}
              >
                <li>Left navigation to jump directly to vitals, history, Rx and more.</li>
                <li>Improved layout for investigations, lab reports and billing.</li>
                <li>Cleaner print preview that mirrors what patients actually see.</li>
              </ul>
            </div>

            <div
              style={{
                fontSize: 11,
                color: "#6B7280",
                marginTop: 4,
              }}
            >
              You can always reopen this walkthrough from the TabRx header menu.
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  borderRadius: 999,
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  padding: "7px 14px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Skip for now
              </button>
            )}
            <button
              type="button"
              onClick={handleGetStarted}
              style={{
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(90deg, #4B4AD5 0%, #6366F1 50%, #4B4AD5 100%)",
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                color: "#FFFFFF",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)",
              }}
            >
              Get started with TabRx
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabRxWelcomePopup;