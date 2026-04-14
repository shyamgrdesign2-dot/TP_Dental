"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

interface NoiseOverlayProps {
  opacity?: number
  className?: string
}

export function NoiseOverlay({ opacity = 0.06, className }: NoiseOverlayProps) {
  const filterId = `noise-${useId().replace(/[:]/g, "")}`

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter={`url(#${filterId})`}
        opacity={opacity}
        style={{ mixBlendMode: "overlay" }}
      />
    </svg>
  )
}
