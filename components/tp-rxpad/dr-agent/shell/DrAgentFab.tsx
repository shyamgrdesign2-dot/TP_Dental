"use client"

import React from "react"

interface DrAgentFabProps {
  onClick: () => void
  hasNudge?: boolean
}

/** White spark icon — cropped viewBox for large visible star, with subtle shimmer animation */
function WhiteSparkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="4 4 16 16"
      fill="none"
      aria-hidden="true"
      className="animate-[sparkShimmer_4s_ease-in-out_infinite]"
    >
      <style>{`
        @keyframes sparkShimmer {
          0%, 100% { opacity: 0.88; transform: scale(1) rotate(0deg); }
          50%      { opacity: 1;    transform: scale(1.12) rotate(15deg); }
        }
      `}</style>
      <path
        d="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z"
        fill="white"
      />
    </svg>
  )
}

/**
 * Dr. Agent edge FAB — gradient pill/tab shape on the right viewport edge.
 * Uses the organic concave-sided tab SVG path rotated 90° to sit vertically.
 * The flat edge is flush with (hidden behind) the viewport right edge;
 * the curved concave body protrudes ~35px into the viewport.
 */
export function DrAgentFab({ onClick, hasNudge = false }: DrAgentFabProps) {
  return (
    <div
      className="group fixed z-40 cursor-pointer"
      style={{ bottom: 32, right: 0, width: 56, height: 230 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open Dr. Agent"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick()
      }}
    >
      {/* Tooltip — appears on hover, left of tag */}
      <div className="pointer-events-none absolute right-[64px] top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="relative whitespace-nowrap rounded-[6px] bg-tp-slate-800 px-[8px] py-[4px] text-[12px] font-medium text-white shadow-lg">
          Open Dr. Agent
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-tp-slate-800" />
        </div>
      </div>

      {/* Shape — rotated 90° tab with gradient, completely flush edge */}
      <div
        className="absolute transition-transform duration-200 ease-out group-hover:translate-x-[-3px]"
        style={{
          top: "50%",
          right: -82,
          width: 230,
          height: 66,
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center center",
        }}
      >
        {/* SVG gradient shape — the concave-sided tab */}
        <svg
          className="pointer-events-none absolute overflow-visible"
          width={230}
          height={66}
          viewBox="0 0 430 115"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ left: -7, top: -14 }}
        >
          <defs>
            <filter
              id="da-fab-shadow"
              x="0"
              y="0"
              width="430"
              height="114.769"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="12" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.175838 0 0 0 0 0.173404 0 0 0 0 0.173404 0 0 0 0.42 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
            </filter>
            <linearGradient
              id="da-fab-shell"
              x1="28.43"
              x2="401.32"
              y1="53"
              y2="53"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#D565EA" />
              <stop offset="0.5" stopColor="#673AAC" />
              <stop offset="1" stopColor="#1A1994" />
            </linearGradient>
          </defs>
          <g filter="url(#da-fab-shadow)">
            <path
              d="M395.24 23.6125C381.35 31.5666 366.81 41.5232 360.83 55.4195C352.63 74.3548 341.13 86.7689 319.47 86.769H110.53C88.87 86.7689 77.37 74.3548 69.17 55.4195C63.19 41.5232 48.62 31.5666 34.73 23.6125L28.43 20H401.32L395.24 23.6125Z"
              fill="url(#da-fab-shell)"
            />
          </g>
        </svg>

        {/* Content overlay — spark + label, scaled to fit inside the shape */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: -7,
            top: -11.75,
            width: 430,
            height: 115,
            transform: `scale(${230 / 430 * 1.03})`,
            transformOrigin: "0px 0px",
          }}
        >
          <div
            style={{
              width: 430,
              height: 115,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: "17px 60px 26px",
            }}
          >
            <WhiteSparkIcon size={42} />
            <span
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "0.3px",
                textShadow: "0 1px 3px rgba(0,0,0,0.25)",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              Dr. Agent
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
