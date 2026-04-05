"use client"

import { Suspense, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Tooth } from './Tooth'
import DentitionView from './DentitionView'
import { ToothSelector } from './ToothSelector'
import { QuickSurfaceSelector } from './QuickSurfaceSelector'
import { ExaminationPanel } from './ExaminationPanel'
import type { ZoneId, Finding, ToothDef, ViewMode, ToothEntry } from './types'
import { TEETH, QUADRANT_LABELS, ARCH_POSITIONS, ZONE_INFO } from './types'
import { applyDiagnosisSelection } from './DiagnosisMatrix'
import './dental-canvas.css'
import { LottieIcon } from '../LottieIcon'
import { INITIAL_TOOTH_STATE } from '../mock-data'

export interface DentalCanvasState {
  viewMode: 'dentition' | 'single-tooth'
  selectedTooth: ToothDef
  selectedZone: ZoneId | null
  findings: Finding[]
  toothDiagnoses: Record<string, Set<string>>
  implantTeeth: Set<string>
  findingsByTooth: Record<string, Finding[]>
  currentToothDiagnoses: Set<string>
  currentToothNotes: string
  zoneNotes: Record<string, string>
  isImplant: boolean
  /** Entity-centric entries (findings + procedures) for the currently selected tooth */
  currentToothEntries: ToothEntry[]
  /** Full entries store (all teeth) */
  allEntries: ToothEntry[]
  /** Surfaces to temporarily highlight on the 3D tooth (e.g. while hovering a table row) */
  highlightZones: ZoneId[]
  /** Multi-selected surfaces for the active Findings/Procedures draft row. Cmd/Ctrl+click on 3D toggles. */
  multiSelectZones: Set<ZoneId>
  /** FDI of the tooth currently being hovered (from either 3D canvas or summary cards). */
  hoveredToothFdi: string | null
  /** Whether a Findings/Procedures row is currently editing its surfaces — 3D clicks toggle into multiSelectZones only when this is true. */
  multiSelectActive: boolean
  /** Handlers for the side panel to mutate canvas state */
  onToggleToothDiagnosis: (diagnosis: string) => void
  onToggleImplant: () => void
  onAddFinding: (zoneId: ZoneId, type: string) => void
  onRemoveFinding: (id: string) => void
  onUpdateNotes: (zoneId: ZoneId, notes: string) => void
  onUpdateToothNotes: (notes: string) => void
  onBackToDentition: () => void
  onSelectTooth: (tooth: ToothDef) => void
  onSelectZone: (zoneId: ZoneId) => void
  /** Entity-centric entry handlers */
  onAddEntry: (entry: Omit<ToothEntry, "id" | "toothFdi">) => void
  onUpdateEntry: (id: string, patch: Partial<ToothEntry>) => void
  onRemoveEntry: (id: string) => void
  onSetHighlightZones: (zones: ZoneId[]) => void
  onToggleZoneMultiSelect: (zone: ZoneId) => void
  onClearMultiSelect: () => void
  onSetMultiSelectActive: (active: boolean) => void
  onSetHoveredTooth: (fdi: string | null) => void
}

let findingIdCounter = 0
// Stable empty collections so default values don't create new identity per render
// (which would cause downstream useEffect deps to re-fire and re-inject shaders)
const EMPTY_DIAG_SET: Set<string> = new Set()
const EMPTY_FINDINGS: readonly Finding[] = []

// ══════════════════════════════════════════════════════════════
// Camera Controller — animates between dentition and single-tooth views
// ══════════════════════════════════════════════════════════════

const DENTITION_CAMERA = { position: new THREE.Vector3(0, 2.5, 16.5), target: new THREE.Vector3(0, -0.9, -0.3), fov: 35 }
const SINGLE_TOOTH_CAMERA = { position: new THREE.Vector3(0.5, -0.15, 7.5), target: new THREE.Vector3(0, -0.35, 0), fov: 32 }

// Zone → spherical camera angle (azimuth, polar). Rotates the single-tooth
// camera around the tooth to show the selected surface head-on.
const ZONE_ANGLES: Record<string, { az: number; pol: number }> = {
  buccal:   { az: 0,             pol: Math.PI / 2 },
  lingual:  { az: Math.PI,       pol: Math.PI / 2 },
  mesial:   { az: -Math.PI / 2,  pol: Math.PI / 2 },
  distal:   { az:  Math.PI / 2,  pol: Math.PI / 2 },
  occlusal: { az: 0,             pol: 0.25 },
  cervical: { az: 0,             pol: Math.PI / 2.4 },
  root:     { az: 0,             pol: Math.PI - 0.35 },
}

function ZoneCameraRotator({ zone, controlsRef, radius = 7.5 }: { zone: ZoneId | null; controlsRef: React.RefObject<any>; radius?: number }) {
  const { camera } = useThree()
  const target = useRef<THREE.Spherical | null>(null)
  useEffect(() => {
    if (!zone || !ZONE_ANGLES[zone]) return
    const a = ZONE_ANGLES[zone]
    target.current = new THREE.Spherical(radius, a.pol, a.az)
  }, [zone, radius])
  useFrame(() => {
    if (!target.current || !controlsRef.current) return
    const controls = controlsRef.current
    const center = controls.target
    // Current spherical around target
    const offset = new THREE.Vector3().subVectors(camera.position, center)
    const cur = new THREE.Spherical().setFromVector3(offset)
    const goal = target.current
    // Lerp spherical angles
    const lerp = 0.12
    cur.theta += shortestAngleDelta(cur.theta, goal.theta) * lerp
    cur.phi += (goal.phi - cur.phi) * lerp
    // Keep radius roughly constant
    cur.radius += (goal.radius - cur.radius) * lerp
    const next = new THREE.Vector3().setFromSpherical(cur)
    camera.position.copy(next.add(center))
    controls.update()
    // Stop when close enough
    if (
      Math.abs(shortestAngleDelta(cur.theta, goal.theta)) < 0.005 &&
      Math.abs(cur.phi - goal.phi) < 0.005 &&
      Math.abs(cur.radius - goal.radius) < 0.01
    ) {
      target.current = null
    }
  })
  return null
}

function shortestAngleDelta(from: number, to: number): number {
  let d = to - from
  while (d > Math.PI) d -= Math.PI * 2
  while (d < -Math.PI) d += Math.PI * 2
  return d
}

function CameraController({ viewMode, controlsRef }: { viewMode: ViewMode; controlsRef: React.RefObject<any> }) {
  const { camera, size } = useThree()
  const animRef = useRef({ active: false, t: 0, startPos: new THREE.Vector3(), endPos: new THREE.Vector3(), startTarget: new THREE.Vector3(), endTarget: new THREE.Vector3(), startFov: 32, endFov: 32 })
  const prevMode = useRef(viewMode)
  const initialized = useRef(false)

  // Canvas-aspect-responsive dentition z: the narrower the canvas, the further
  // back the camera pulls so the whole arch still fits without cropping.
  // Wider range so narrow panels never clip the teeth.
  const dentitionZ = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height)
    if (aspect < 0.6) return 30
    if (aspect < 0.8) return 26
    if (aspect < 1.0) return 22
    if (aspect < 1.2) return 19
    if (aspect < 1.5) return 17
    return 16
  }, [size.width, size.height])

  // Same idea for single-tooth view — pull camera back when canvas narrows.
  const singleToothZ = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height)
    if (aspect < 0.7) return 10.5
    if (aspect < 0.9) return 9.2
    if (aspect < 1.1) return 8.4
    if (aspect < 1.4) return 7.9
    return 7.5
  }, [size.width, size.height])

  // Set initial camera position based on initial viewMode
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const cam = viewMode === 'dentition' ? DENTITION_CAMERA : SINGLE_TOOTH_CAMERA
    camera.position.copy(cam.position)
    if (viewMode === 'dentition') camera.position.z = dentitionZ
    else camera.position.z = singleToothZ
    ;(camera as THREE.PerspectiveCamera).fov = cam.fov
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    if (controlsRef.current) {
      controlsRef.current.target.copy(cam.target)
      controlsRef.current.update()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // React to canvas resize (e.g. draggable split) — both modes.
  useEffect(() => {
    if (animRef.current.active) return
    camera.position.z = viewMode === 'dentition' ? dentitionZ : singleToothZ
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    if (controlsRef.current) controlsRef.current.update()
  }, [dentitionZ, singleToothZ, viewMode, camera, controlsRef])

  // Animate on mode change
  useEffect(() => {
    if (prevMode.current === viewMode) return
    prevMode.current = viewMode

    const target = viewMode === 'dentition' ? DENTITION_CAMERA : SINGLE_TOOTH_CAMERA
    const a = animRef.current
    a.startPos.copy(camera.position)
    a.endPos.copy(target.position)
    if (viewMode === 'dentition') a.endPos.z = dentitionZ
    else a.endPos.z = singleToothZ
    a.startTarget.copy(controlsRef.current?.target || new THREE.Vector3())
    a.endTarget.copy(target.target)
    a.startFov = (camera as THREE.PerspectiveCamera).fov
    a.endFov = target.fov
    a.t = 0
    a.active = true

    if (controlsRef.current) controlsRef.current.enabled = false
  }, [viewMode, camera, controlsRef])

  useFrame((_, delta) => {
    const a = animRef.current
    if (!a.active) return

    a.t += delta / 1.0 // 1.0 second transition — more pronounced zoom
    const t = Math.min(a.t, 1)
    // easeOutQuint — a stronger slowdown near the end gives the "settle into place" feel
    const ease = 1 - Math.pow(1 - t, 5)

    camera.position.lerpVectors(a.startPos, a.endPos, ease)
    ;(camera as THREE.PerspectiveCamera).fov = a.startFov + (a.endFov - a.startFov) * ease
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()

    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(a.startTarget, a.endTarget, ease)
      controlsRef.current.update()
    }

    if (t >= 1) {
      a.active = false
      if (controlsRef.current) controlsRef.current.enabled = true
    }
  })

  return null
}

// ══════════════════════════════════════════════════════════════
// App
// ══════════════════════════════════════════════════════════════

export function DentalCanvas({
  patientId,
  compact = false,
  onStateChange,
}: {
  patientId: string
  compact?: boolean
  /** Emitted whenever view mode, selected tooth, findings, or diagnoses change */
  onStateChange?: (state: DentalCanvasState) => void
}) {
  // Pull initial state for this patient from mock data
  const initialState = INITIAL_TOOTH_STATE[patientId]
  const initialToothDiagnoses = useMemo(() => {
    if (!initialState?.toothDiagnoses) return {}
    const out: Record<string, Set<string>> = {}
    for (const [fdi, diags] of Object.entries(initialState.toothDiagnoses)) {
      out[fdi] = new Set(diags)
    }
    return out
  }, [initialState])
  const initialImplants = useMemo(() => new Set(initialState?.implantTeeth ?? []), [initialState])
  const initialFindings = useMemo(() => {
    if (!initialState?.findingsByTooth) return {}
    const out: Record<string, Finding[]> = {}
    for (const [fdi, list] of Object.entries(initialState.findingsByTooth)) {
      out[fdi] = list.map((f, i) => ({ id: `seed-${fdi}-${i}`, zoneId: f.zoneId as any, type: f.type, notes: '' }))
    }
    return out
  }, [initialState])
  const [viewMode, setViewMode] = useState<ViewMode>('dentition')
  const [selectedTooth, setSelectedTooth] = useState<ToothDef>(TEETH.find(t => t.fdi === '26')!)
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>(null)
  const [, setHoveredZone] = useState<ZoneId | null>(null)
  const [findingsByTooth, setFindingsByTooth] = useState<Record<string, Finding[]>>(initialFindings)
  // Last 3D click point per zone (world space) — used as spot decal center for findings.
  // Keyed by "fdi-zoneId" so points are scoped to the correct tooth.
  const [zoneHitPoints, setZoneHitPoints] = useState<Record<string, [number, number, number]>>({})
  const [zoneNotes, setZoneNotes] = useState<Record<string, string>>({})
  const [implantTeeth, setImplantTeeth] = useState<Set<string>>(initialImplants)
  const [toothDiagnoses, setToothDiagnoses] = useState<Record<string, Set<string>>>(initialToothDiagnoses)
  const [toothNotes, setToothNotes] = useState<Record<string, string>>({})
  const [allEntries, setAllEntries] = useState<ToothEntry[]>([])
  const [highlightZones, setHighlightZones] = useState<ZoneId[]>([])
  const [multiSelectZones, setMultiSelectZones] = useState<Set<ZoneId>>(() => new Set())
  const [multiSelectActive, setMultiSelectActive] = useState(false)
  const [hoveredToothFdi, setHoveredToothFdi] = useState<string | null>(null)
  const controlsRef = useRef<any>(null)

  const isImplant = implantTeeth.has(selectedTooth.fdi)
  const currentToothDiagnoses = toothDiagnoses[selectedTooth.fdi] || EMPTY_DIAG_SET
  const currentToothNotes = toothNotes[selectedTooth.fdi] || ''

  // Implant toggle routes through the compatibility matrix (see toggleToothDiagnosis below).
  // The matrix sync-fires `setImplantTeeth` to keep the top-level set in step so the
  // ImplantScrew shader sees the same truth as the UI chips.
  const toggleImplant = useCallback(() => {
    // Forward-ref: toggleToothDiagnosis is declared below but captured at call time.
    // Using a deferred wrapper avoids use-before-declaration lint errors.
    toggleToothDiagnosisRef.current?.('Implant')
    setSelectedZone(prev => (prev === 'cervical' || prev === 'root') ? null : prev)
  }, [])
  const toggleToothDiagnosisRef = useRef<((d: string) => void) | null>(null)

  const toggleToothDiagnosis = useCallback((diagnosis: string) => {
    const fdi = selectedTooth.fdi
    setToothDiagnoses(prev => {
      const current = new Set(prev[fdi] || [])
      const next = applyDiagnosisSelection(current, diagnosis)
      // If Implant was removed by the matrix, also drop from implantTeeth set.
      if (current.has('Implant') && !next.has('Implant')) {
        setImplantTeeth(ip => { const n = new Set(ip); n.delete(fdi); return n })
      }
      // If Implant was added by the matrix (via click), mirror into implantTeeth.
      if (!current.has('Implant') && next.has('Implant')) {
        setImplantTeeth(ip => { const n = new Set(ip); n.add(fdi); return n })
      }
      return { ...prev, [fdi]: next }
    })
    // Tooth-level diagnosis changed → clear all surface findings for this tooth
    setFindingsByTooth(prev => { const next = { ...prev }; delete next[fdi]; return next })

    if (diagnosis === 'Missing') {
      setImplantTeeth(prev => {
        const next = new Set(prev)
        next.delete(selectedTooth.fdi)
        return next
      })
      setSelectedZone(null)
    }
  }, [selectedTooth.fdi])

  // Keep the deferred ref in sync so toggleImplant can route through the matrix.
  toggleToothDiagnosisRef.current = toggleToothDiagnosis

  const updateToothNotes = useCallback((notes: string) => {
    setToothNotes(prev => ({ ...prev, [selectedTooth.fdi]: notes }))
  }, [selectedTooth.fdi])

  const handleSelectTooth = useCallback((tooth: ToothDef) => {
    setSelectedTooth(tooth)
    setSelectedZone(null)
    setViewMode('single-tooth')
  }, [])

  const handleBackToDentition = useCallback(() => {
    setViewMode('dentition')
    setSelectedZone(null)
    setHoveredZone(null)
  }, [])

  const handleSelectZone = useCallback((zone: ZoneId, hitPoint?: [number, number, number], opts?: { multi?: boolean }) => {
    if (currentToothDiagnoses.has('Missing')) return
    if (hitPoint) {
      const key = `${selectedTooth.fdi}-${zone}`
      setZoneHitPoints(prev => ({ ...prev, [key]: hitPoint }))
    }
    if (opts?.multi) {
      setMultiSelectZones((prev) => {
        const next = new Set(prev)
        if (next.has(zone)) next.delete(zone)
        else next.add(zone)
        return next
      })
      return
    }
    setSelectedZone((prev) => (prev === zone ? null : zone))
  }, [currentToothDiagnoses, selectedTooth.fdi])

  const handleToggleZoneMultiSelect = useCallback((zone: ZoneId) => {
    // Always rotate the 3D camera to the picked surface — the 3D canvas
    // reacts to actions happening in the side panel (bi-directional link).
    setSelectedZone(zone)
    // Multi-select mode is gated by multiSelectActive (enabled only when a
    // surface cell in the Findings/Procedures table is active).
    if (!multiSelectActive) return
    setMultiSelectZones((prev) => {
      const next = new Set(prev)
      if (next.has(zone)) next.delete(zone)
      else next.add(zone)
      return next
    })
  }, [multiSelectActive])

  const handleClearMultiSelect = useCallback(() => {
    setMultiSelectZones(new Set())
  }, [])

  const handleSetMultiSelectActive = useCallback((active: boolean) => {
    setMultiSelectActive(active)
  }, [])

  const handleSetHoveredTooth = useCallback((fdi: string | null) => {
    setHoveredToothFdi(fdi)
  }, [])

  const handleAddFinding = useCallback((zoneId: ZoneId, type: string) => {
    const id = `finding-${++findingIdCounter}`
    const fdi = selectedTooth.fdi
    const hitPoint = zoneHitPoints[`${fdi}-${zoneId}`]
    setFindingsByTooth((prev) => {
      let list = [...(prev[fdi] || [])]
      if (type === 'Normal') {
        list = list.filter(f => f.zoneId !== zoneId)
      } else {
        list = list.filter(f => !(f.zoneId === zoneId && f.type === 'Normal'))
      }
      list.push({ id, zoneId, type, notes: '', hitPoint })
      return { ...prev, [fdi]: list }
    })
  }, [zoneHitPoints, selectedTooth.fdi])

  const handleRemoveFinding = useCallback((id: string) => {
    const fdi = selectedTooth.fdi
    setFindingsByTooth((prev) => {
      const list = (prev[fdi] || []).filter((f) => f.id !== id)
      return { ...prev, [fdi]: list }
    })
  }, [selectedTooth.fdi])

  // Current tooth's findings (derived, stable identity when empty)
  const findings = findingsByTooth[selectedTooth.fdi] || (EMPTY_FINDINGS as Finding[])

  const handleUpdateNotes = useCallback((zoneId: ZoneId, notes: string) => {
    setZoneNotes((prev) => ({ ...prev, [zoneId]: notes }))
  }, [])

  // ── Entity-centric entries (findings + procedures) ──────────────
  let entryIdCounter = useRef(0).current
  const handleAddEntry = useCallback((partial: Omit<ToothEntry, "id" | "toothFdi">) => {
    const fdi = selectedTooth.fdi
    setAllEntries((prev) => [
      ...prev,
      { ...partial, id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, toothFdi: fdi },
    ])
  }, [selectedTooth.fdi])

  const handleUpdateEntry = useCallback((id: string, patch: Partial<ToothEntry>) => {
    setAllEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }, [])

  const handleRemoveEntry = useCallback((id: string) => {
    setAllEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const handleSetHighlightZones = useCallback((zones: ZoneId[]) => {
    setHighlightZones(zones)
  }, [])

  const currentToothEntries = useMemo(
    () => allEntries.filter((e) => e.toothFdi === selectedTooth.fdi),
    [allEntries, selectedTooth.fdi],
  )

  // Emit state changes to parent (ExaminationTab) for the right-side panel
  useEffect(() => {
    if (!onStateChange) return
    onStateChange({
      viewMode,
      selectedTooth,
      selectedZone,
      findings,
      toothDiagnoses,
      implantTeeth,
      findingsByTooth,
      currentToothDiagnoses,
      currentToothNotes,
      zoneNotes,
      isImplant,
      currentToothEntries,
      allEntries,
      highlightZones,
      multiSelectZones,
      multiSelectActive,
      hoveredToothFdi,
      onToggleToothDiagnosis: toggleToothDiagnosis,
      onToggleImplant: toggleImplant,
      onAddFinding: handleAddFinding,
      onRemoveFinding: handleRemoveFinding,
      onUpdateNotes: handleUpdateNotes,
      onUpdateToothNotes: updateToothNotes,
      onBackToDentition: handleBackToDentition,
      onSelectTooth: handleSelectTooth,
      onSelectZone: handleSelectZone,
      onAddEntry: handleAddEntry,
      onUpdateEntry: handleUpdateEntry,
      onRemoveEntry: handleRemoveEntry,
      onSetHighlightZones: handleSetHighlightZones,
      onToggleZoneMultiSelect: handleToggleZoneMultiSelect,
      onClearMultiSelect: handleClearMultiSelect,
      onSetMultiSelectActive: handleSetMultiSelectActive,
      onSetHoveredTooth: handleSetHoveredTooth,
    })
  }, [
    viewMode, selectedTooth, selectedZone, findings, toothDiagnoses, implantTeeth, findingsByTooth,
    currentToothDiagnoses, currentToothNotes, zoneNotes, isImplant, onStateChange,
    currentToothEntries, allEntries, highlightZones, multiSelectZones, multiSelectActive, hoveredToothFdi,
    toggleToothDiagnosis, toggleImplant, handleAddFinding, handleRemoveFinding,
    handleUpdateNotes, updateToothNotes, handleBackToDentition, handleSelectTooth, handleSelectZone,
    handleAddEntry, handleUpdateEntry, handleRemoveEntry, handleSetHighlightZones,
    handleToggleZoneMultiSelect, handleClearMultiSelect, handleSetMultiSelectActive, handleSetHoveredTooth,
  ])

  const isDentitionView = viewMode === 'dentition'

  return (
    <div className={`dental-canvas-root ${isDentitionView ? 'dentition-mode' : ''} ${compact ? 'compact' : ''}`}>
      <div className="viewer">
        <div className="viewer-header">
          {isDentitionView ? (
            <div className="tooth-name">Full dentition view</div>
          ) : (
            <div className="tooth-name">
              {QUADRANT_LABELS[selectedTooth.quadrant]} {selectedTooth.name}
              <span className="tooth-fdi">#{selectedTooth.fdi}</span>
            </div>
          )}
        </div>

        {/* Bottom-center hint — animated up-arrow + "Click any tooth" text */}
        {isDentitionView && (
          <div
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              pointerEvents: 'none',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            <LottieIcon name="arrow-up" size={26} color="#94a3b8" />
            <span
              style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: 500,
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
              }}
            >
              Click any tooth to examine
            </span>
          </div>
        )}

        {/* Tooth grid — only in single-tooth view */}
        {!isDentitionView && (
          <ToothSelector
            selectedTooth={selectedTooth}
            onSelectTooth={handleSelectTooth}
            toothDiagnoses={toothDiagnoses}
            viewMode={viewMode}
            onBackToDentition={handleBackToDentition}
          />
        )}


        {/* QuickSurfaceSelector at bottom-right (single-tooth only) */}
        {!isDentitionView && (
          <div className="viewer-bottom-controls">
            <QuickSurfaceSelector
              selectedZones={multiSelectActive ? multiSelectZones : (selectedZone ? new Set([selectedZone]) : new Set())}
              onToggleZone={handleToggleZoneMultiSelect}
              arch={selectedTooth.arch}
              toothPosition={selectedTooth.position}
              zonesWithFindings={new Set(findings.map(f => f.zoneId))}
              disabled={currentToothDiagnoses.has('Missing')}
            />
          </div>
        )}

        <Canvas
          camera={{ position: [0, 2.5, 13], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, toneMapping: 3, toneMappingExposure: 1.3, powerPreference: 'high-performance' }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 5, 4]} intensity={1.0} />
          <directionalLight position={[-2, 3, -2]} intensity={0.4} />
          <directionalLight position={[0, -2, 1]} intensity={0.3} />

          <CameraController viewMode={viewMode} controlsRef={controlsRef} />
          {!isDentitionView && (
            <ZoneCameraRotator zone={selectedZone} controlsRef={controlsRef} />
          )}

          <Suspense fallback={null}>
            {isDentitionView ? (
              <DentitionView
                toothDiagnoses={toothDiagnoses}
                findingsByTooth={findingsByTooth}
                implantTeeth={implantTeeth}
                onSelectTooth={handleSelectTooth}
                onHoverTooth={setHoveredToothFdi}
                externalHoveredFdi={hoveredToothFdi}
              />
            ) : (
              <Tooth
                key={`${selectedTooth.fdi}-${isImplant ? 'imp' : 'nat'}-${[...currentToothDiagnoses].sort().join(',')}`}
                selectedZone={selectedZone}
                onSelectZone={handleSelectZone}
                onHoverZone={setHoveredZone}
                modelPath={selectedTooth.modelPath}
                arch={selectedTooth.arch}
                mirrorX={selectedTooth.mirrorX}
                quadrant={selectedTooth.quadrant}
                toothPosition={selectedTooth.position}
                toothFdi={selectedTooth.fdi}
                isImplant={isImplant}
                findings={findings}
                zoneNotes={zoneNotes}
                toothDiagnoses={currentToothDiagnoses}
                multiSelectZones={multiSelectZones}
                multiSelectActive={multiSelectActive}
                toothEntries={currentToothEntries.map(e => ({ kind: e.kind, name: e.name, surfaces: e.surfaces }))}
              />
            )}
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableDamping dampingFactor={0.12}
            rotateSpeed={0.8}
            minDistance={isDentitionView ? 6 : 2.5}
            maxDistance={isDentitionView ? 22 : 10}
            enablePan={isDentitionView}
            touches={{ ONE: 0, TWO: 2 }}
          />
        </Canvas>
      </div>

      {/* Examination panel — only in single-tooth view. In compact mode it renders
          inside the host panel (not here) — we still need to keep it unmounted here
          to avoid double-rendering. */}
      {!isDentitionView && !compact && (
        <ExaminationPanel
          selectedZone={selectedZone}
          findings={findings}
          onAddFinding={handleAddFinding}
          onRemoveFinding={handleRemoveFinding}
          onUpdateNotes={handleUpdateNotes}
          zoneNotes={zoneNotes}
          tooth={selectedTooth}
          isImplant={isImplant}
          onToggleImplant={toggleImplant}
          toothDiagnoses={currentToothDiagnoses}
          onToggleToothDiagnosis={toggleToothDiagnosis}
          toothNotes={currentToothNotes}
          onUpdateToothNotes={updateToothNotes}
        />
      )}
    </div>
  )
}
