"use client"

import { useState } from 'react'
import { ZONE_INFO, type ZoneId } from './types'

interface QuickSurfaceSelectorProps {
  /** Multi-select set — any zone in here renders filled with its zone colour. */
  selectedZones: Set<ZoneId>
  onToggleZone: (zone: ZoneId) => void
  arch?: 'maxillary' | 'mandibular'
  toothPosition?: number
  /** Zones with at least one finding — rendered with a lighter filled state + matching stroke. */
  zonesWithFindings?: Set<ZoneId>
  disabled?: boolean
}

// ──────────────────────────────────────────────────────────────
// Shapes from the user-provided reference SVGs.
// viewBox unified to 113 × 175 (crown circle + cervical + root arrow).
// Crown circle: 113×108, center at (56.2, 54.4)
// Cervical crescent (79×64 SVG, scaled to fit crown width): sits at y=112
// Root arrow: sits below cervical, points down
// ──────────────────────────────────────────────────────────────

// Crown quadrant wedges
const PATH_TL = "M54.2227 26.7041 C51.1534 26.9126 48.1333 27.5999 45.2803 28.7441 C41.8093 30.1363 38.6513 32.1784 35.9883 34.7568 C33.3252 37.3354 31.2086 40.3997 29.7637 43.7773 C28.5825 46.5384 27.8705 49.4635 27.6494 52.4385 H2.04004 C2.28457 46.2436 3.66252 40.1329 6.11816 34.3926 C7.23902 31.7725 9.52035 30.1763 12.623 28.5225 C15.5534 26.9605 19.3964 25.2924 22.2715 22.5088 C25.1312 19.7398 27.0862 15.8092 28.9092 12.7656 C30.8468 9.53073 32.7096 7.09993 35.4521 6 C41.4191 3.60688 47.7761 2.2653 54.2227 2.03516 V26.7041 Z"
const PATH_TR = "M58.2227 2.03516 C64.6695 2.26525 71.0269 3.60673 76.9941 6 C79.7366 7.09993 81.5986 9.53079 83.5361 12.7656 C85.3591 15.8092 87.314 19.7397 90.1738 22.5088 C93.049 25.2927 96.8928 26.9604 99.8232 28.5225 C102.926 30.1763 105.206 31.7725 106.327 34.3926 C108.783 40.133 110.162 46.2436 110.406 52.4385 H84.7969 C84.5758 49.4635 83.8628 46.5384 82.6816 43.7773 C81.2367 40.3999 79.1209 37.3353 76.458 34.7568 C73.795 32.1783 70.6361 30.1363 67.165 28.7441 C64.3119 27.5999 61.292 26.9125 58.2227 26.7041 V2.03516 Z"
const PATH_BL = "M27.6494 56.4385 C27.8705 59.4136 28.5825 62.3384 29.7637 65.0996 C31.2086 68.4774 33.3251 71.5424 35.9883 74.1211 C38.6513 76.6996 41.8093 78.7417 45.2803 80.1338 C48.1332 81.278 51.1534 81.9634 54.2227 82.1719 V106.842 C47.7761 106.612 41.4192 105.27 35.4521 102.877 C32.7096 101.777 30.8468 99.3462 28.9092 96.1113 C27.0863 93.0678 25.1311 89.138 22.2715 86.3691 C19.3963 83.5853 15.5535 81.9165 12.623 80.3545 C9.52035 78.7006 7.23902 77.1045 6.11816 74.4844 C3.66255 68.744 2.2845 62.6334 2.04004 56.4385 H27.6494 Z"
const PATH_BR = "M110.406 56.4385 C110.162 62.6336 108.783 68.7448 106.327 74.4854 C105.206 77.1052 102.926 78.7017 99.8232 80.3555 C96.8927 81.9175 93.049 83.5852 90.1738 86.3691 C87.3141 89.1382 85.3591 93.0687 83.5361 96.1123 C81.5987 99.3469 79.7364 101.777 76.9941 102.877 C71.0269 105.27 64.6695 106.612 58.2227 106.842 V82.1719 C61.2919 81.9635 64.312 81.278 67.165 80.1338 C70.6361 78.7416 73.795 76.6996 76.458 74.1211 C79.1211 71.5425 81.2367 68.4773 82.6816 65.0996 C83.8628 62.3384 84.5758 59.4136 84.7969 56.4385 H110.406 Z"
// Cervical crescent + root arrow from the new user-provided SVG (viewBox 79×64, scaled to fit)
const PATH_CERVICAL = "M20.2764 2.09277 C22.6396 4.22348 25.3376 5.95239 28.2588 7.20117 C31.6387 8.64602 35.2518 9.42177 38.8926 9.48047 C42.5334 9.53917 46.1308 8.87973 49.4785 7.53809 C52.3594 6.38352 55.0049 4.74215 57.3057 2.68848 L76.1113 21.4941 C71.4287 25.91 65.9482 29.4121 59.9346 31.8223 C57.1171 32.9514 54.2272 32.4166 50.8525 31.3887 C47.6179 30.4034 43.8244 28.903 39.915 28.8398 C36.0217 28.7771 31.9637 30.1422 28.4619 31.0205 C24.7979 31.9395 21.6159 32.3855 18.7334 31.1533 C12.6099 28.5357 6.98563 24.8327 2.13574 20.2334 L20.2764 2.09277 Z"
const PATH_ROOT = "M21.8115 41.4541 H56.4404 C58.7185 41.4541 59.8096 44.2519 58.1328 45.7939 L40.8184 61.7178 C39.8618 62.5974 38.3902 62.5973 37.4336 61.7178 L20.1191 45.7939 C18.4424 44.2519 19.5335 41.4541 21.8115 41.4541 Z"

/**
 * QuickSurfaceSelector — 7-zone picker (5 crown wedges + cervical band + root tip).
 * Uses the user-provided reference SVGs for cervical + root shapes.
 */
export function QuickSurfaceSelector({
  selectedZones, onToggleZone, zonesWithFindings, disabled,
}: QuickSurfaceSelectorProps) {
  const [hovered, setHovered] = useState<ZoneId | null>(null)

  const NEUTRAL_STROKE = '#94a3b8'  // slate-400
  const NEUTRAL_FINDING_FILL = '#cbd5e1'  // slate-300
  const zoneProps = (id: ZoneId) => {
    const baseColor = ZONE_INFO[id].color
    const isSel = selectedZones.has(id)
    const isHov = hovered === id
    const hasFinding = zonesWithFindings?.has(id) ?? false
    // Default: neutral stroke + no fill.
    // Hover: neutral fill (subtle preview).
    // Finding (no selection): light neutral fill.
    // Selected: ONLY state where the zone color shows.
    let fill: string
    let fillOpacity: number
    let stroke: string
    let strokeOpacity: number
    if (isSel) {
      fill = baseColor; fillOpacity = 1; stroke = baseColor; strokeOpacity = 1
    } else if (isHov) {
      fill = NEUTRAL_STROKE; fillOpacity = 0.22; stroke = NEUTRAL_STROKE; strokeOpacity = 1
    } else if (hasFinding) {
      fill = NEUTRAL_FINDING_FILL; fillOpacity = 0.5; stroke = NEUTRAL_STROKE; strokeOpacity = 0.85
    } else {
      fill = NEUTRAL_STROKE; fillOpacity = 0; stroke = NEUTRAL_STROKE; strokeOpacity = 0.85
    }
    return {
      fill,
      fillOpacity: disabled ? 0 : fillOpacity,
      stroke,
      strokeWidth: isSel ? 2.8 : 1.6,
      strokeOpacity: disabled ? 0.4 : strokeOpacity,
      style: { cursor: disabled ? 'default' : 'pointer', transition: 'fill-opacity 0.15s, stroke-width 0.15s, stroke 0.15s, fill 0.15s' },
      onMouseEnter: () => setHovered(id),
      onMouseLeave: () => setHovered(null),
      onClick: (e: any) => { e.stopPropagation(); if (!disabled) onToggleZone(id) },
    }
  }

  // Scale cervical + root to ~72% of the crown width — big enough to read
  // clearly, smaller than the crown so the crown remains the focal point.
  // Cervical original: 79 wide. Root original: 79 wide.
  // Target width = ~72, scale = 72/79 ≈ 0.91
  const shapeScale = 0.91
  const shapeWidth = 79 * shapeScale
  const shapeX = (113 - shapeWidth) / 2
  // Cervical crescent: below the crown circle (crown ends ~y=108)
  const cervTransform = `translate(${shapeX}, 112) scale(${shapeScale})`
  // Root tip: directly below cervical
  const rootTransform = `translate(${shapeX}, 114) scale(${shapeScale})`

  // Upper teeth: flip the crown orientation vertically (buccal moves from top to bottom wedge).
  // We keep the SVG layout simple — the user reads "top half = outer surface wedges".
  // Cervical + root tip always appear BELOW the crown regardless of arch.
  return (
    <div
      className="quick-surface-selector"
      style={disabled ? { opacity: 0.45, pointerEvents: 'none' } : undefined}
    >
      <svg viewBox="0 0 113 180" className="quick-surface-svg">
        {/* Crown wedges */}
        <path d={PATH_TL} {...zoneProps('buccal')} />
        <path d={PATH_TR} {...zoneProps('lingual')} />
        <path d={PATH_BL} {...zoneProps('mesial')} />
        <path d={PATH_BR} {...zoneProps('distal')} />
        {/* Center circle → occlusal/incisal */}
        <circle cx={56.2} cy={54.4} r={20} {...zoneProps('occlusal')} />
        {/* Cervical crescent band */}
        <g transform={cervTransform}>
          <path d={PATH_CERVICAL} {...zoneProps('cervical')} />
        </g>
        {/* Root triangle tip */}
        <g transform={rootTransform}>
          <path d={PATH_ROOT} {...zoneProps('root')} />
        </g>
      </svg>
    </div>
  )
}
