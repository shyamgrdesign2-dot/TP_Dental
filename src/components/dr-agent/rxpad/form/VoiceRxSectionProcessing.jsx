import React from "react";

export function VoiceRxSectionProcessing({ transcript, sectionLabel = "Clinical Notes" }) {
  return (
    <div
      data-voice-allow
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        width: "100%",
        height: "100%",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "3px solid rgba(103,58,172,0.18)",
          borderTopColor: "#673AAC",
          animation: "spin 0.9s linear infinite",
        }}
      />
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#454551",
          letterSpacing: 0.1,
        }}
      >
        Updating {sectionLabel}…
      </div>
      {transcript ? (
        <div
          style={{
            maxWidth: 320,
            fontSize: 12,
            lineHeight: 1.5,
            color: "rgba(69,69,81,0.65)",
            fontStyle: "italic",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          “{transcript}”
        </div>
      ) : null}
    </div>
  );
}

