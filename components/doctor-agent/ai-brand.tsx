"use client"

import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"

export const AI_GRADIENT = "linear-gradient(135deg, #D565EA 0%, #673AAC 45%, #1A1994 100%)"
export const AI_GRADIENT_SOFT =
  "linear-gradient(135deg, rgba(213,101,234,0.18) 0%, rgba(139,92,246,0.22) 50%, rgba(103,58,172,0.18) 100%)"

function FallbackSpark({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d="M12 2L13.09 8.26L19 7L15 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9 12L5 7L10.91 8.26L12 2Z"
        fill="currentColor"
        opacity={0.92}
      />
    </svg>
  )
}

/**
 * Dr. Agent brand sparkle — uses /icons/dr-agent/*.svg; falls back to inline SVG if assets 404.
 */
export function AiBrandSparkIcon({
  size = 24,
  className,
  withBackground = false,
  sparkOverlayScale = 0.55,
}: {
  size?: number
  className?: string
  withBackground?: boolean
  sparkOverlayScale?: number
}) {
  const inner = Math.round(size * sparkOverlayScale)
  const [assetFailed, setAssetFailed] = useState(false)
  const onImgError = useCallback(() => setAssetFailed(true), [])

  if (withBackground) {
    if (assetFailed) {
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-[30%] bg-gradient-to-br from-[#D565EA] via-[#673AAC] to-[#1A1994] text-white",
            className,
          )}
          style={{ width: size, height: size, minWidth: size, minHeight: size }}
          aria-hidden
        >
          <FallbackSpark size={inner} className="text-white" />
        </span>
      )
    }

    return (
      <span
        className={cn(
          "pointer-events-none relative inline-flex shrink-0 items-center justify-center overflow-hidden",
          className,
        )}
        style={{ width: size, height: size, minWidth: size, minHeight: size, borderRadius: size * 0.3 }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/dr-agent/agent-bg.svg"
          alt=""
          width={size}
          height={size}
          className="absolute inset-0 block h-full w-full shrink-0 object-cover"
          draggable={false}
          onError={onImgError}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/dr-agent/agent-spark.svg"
          alt=""
          width={inner}
          height={inner}
          className="relative z-10 block shrink-0 object-contain"
          style={{ width: inner, height: inner, minWidth: inner, minHeight: inner }}
          draggable={false}
          onError={onImgError}
        />
      </span>
    )
  }

  if (assetFailed) {
    return <FallbackSpark size={size} className={cn("text-violet-600", className)} />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/dr-agent/spark-icon.svg"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("pointer-events-none block shrink-0 object-contain", className)}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      draggable={false}
      onError={onImgError}
    />
  )
}
