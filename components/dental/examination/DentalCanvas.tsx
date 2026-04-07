"use client"

import { Suspense, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Tooth, getFrontAzimuth, getDirsForTooth } from './Tooth'
import DentitionView from './DentitionView'
import { ToothSelector } from './ToothSelector'
import { QuickSurfaceSelector } from './QuickSurfaceSelector'
import type { ZoneId, Finding, ToothDef, ViewMode, ToothEntry, TreatmentHistoryDetail, PatientType, Quadrant } from './types'
import { TEETH, PEDIATRIC_TEETH, QUADRANT_LABELS, ZONE_INFO, getDefaultTreatmentSurfaces } from './types'
import { applyDiagnosisSelection } from './DiagnosisMatrix'
import './dental-canvas.css'
import { LottieIcon } from '../LottieIcon'
import { INITIAL_TOOTH_STATE } from '../mock-data'

export interface DentalCanvasState {
  viewMode: 'dentition' | 'single-tooth'
  patientType: PatientType
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
  currentTreatmentHistoryDetails: Record<string, TreatmentHistoryDetail>
  /** Full entries store (all teeth) */
  allEntries: ToothEntry[]
  /** Surfaces to temporarily highlight on the 3D tooth (e.g. while hovering a table row) */
  highlightZones: ZoneId[]
  /** Multi-selected surfaces for the active Findings/Procedures draft row. Cmd/Ctrl+click on 3D toggles. */
  multiSelectZones: Set<ZoneId>
  /** FDI of the tooth currently being hovered (from either 3D canvas or summary cards). */
  hoveredToothFdi: string | null
  /** Current selection mode when not in single-tooth context. */
  selectionScopeType?: 'tooth' | 'quadrant' | 'full-mouth'
  selectionScopeId?: string
  selectionScopeLabel?: string
  selectionScopeFdis?: string[]
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
  onClearSelectedZone: () => void
  /** Entity-centric entry handlers */
  onAddEntry: (entry: Omit<ToothEntry, "id" | "toothFdi">) => void
  onUpdateEntry: (id: string, patch: Partial<ToothEntry>) => void
  onRemoveEntry: (id: string) => void
  onUpdateTreatmentHistoryDetail: (name: string, patch: Partial<TreatmentHistoryDetail>) => void
  onSetHighlightZones: (zones: ZoneId[]) => void
  onToggleZoneMultiSelect: (zone: ZoneId) => void
  onSetMultiSelectZones: (zones: ZoneId[]) => void
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

function ZoneCameraRotator({ 
  zone, toothFdi, quadrant, arch, controlsRef, radius = 7.5 
}: { 
  zone: ZoneId | null; toothFdi: string; quadrant: Quadrant; arch: 'maxillary' | 'mandibular'; controlsRef: React.RefObject<any>; radius?: number 
}) {
  const { camera } = useThree()
  const target = useRef<THREE.Spherical | null>(null)
  
  useEffect(() => {
    if (!zone) return
    const frontAz = getFrontAzimuth(toothFdi) ?? 0
    let az = frontAz
    let pol = Math.PI / 2

    const dirs = getDirsForTooth(toothFdi, quadrant, 0)

    if (zone === 'buccal')   { az = frontAz;             pol = Math.PI / 2 }
    if (zone === 'lingual')  { az = frontAz + Math.PI;   pol = Math.PI / 2 }
    if (zone === 'mesial')   { az = Math.atan2(dirs.mesial.x, dirs.mesial.z); pol = Math.PI / 2 }
    if (zone === 'distal')   { az = Math.atan2(dirs.distal.x, dirs.distal.z); pol = Math.PI / 2 }
    if (zone === 'occlusal') { az = frontAz;             pol = arch === 'mandibular' ? 0.25 : Math.PI - 0.25 }
    if (zone === 'cervical') { az = frontAz;             pol = arch === 'mandibular' ? Math.PI / 2.4 : Math.PI - (Math.PI / 2.4) }
    if (zone === 'root')     { az = frontAz;             pol = arch === 'mandibular' ? Math.PI - 0.35 : 0.35 }
    
    if (controlsRef.current) {
      controlsRef.current.enabled = false
      controlsRef.current.enableDamping = false
    }
    target.current = new THREE.Spherical(radius, pol, az)
  }, [zone, toothFdi, quadrant, arch, radius, controlsRef])
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
      if (controls) {
        controls.enabled = true
        controls.enableDamping = true
      }
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

function CameraController({
  viewMode,
  patientType,
  selectionScopeType = 'tooth',
  dentitionCameraOverride,
  dentitionVerticalNudge,
  onDentitionVerticalNudgeChange,
  controlsRef,
}: {
  viewMode: ViewMode
  patientType: PatientType
  selectionScopeType?: 'tooth' | 'quadrant' | 'full-mouth'
  dentitionCameraOverride?: { position: [number, number, number]; target: [number, number, number] }
  dentitionVerticalNudge: number
  onDentitionVerticalNudgeChange: (value: number | ((prev: number) => number)) => void
  controlsRef: React.RefObject<any>
}) {
  const { camera, size } = useThree()
  const animRef = useRef({ active: false, t: 0, startPos: new THREE.Vector3(), endPos: new THREE.Vector3(), startTarget: new THREE.Vector3(), endTarget: new THREE.Vector3(), startFov: 32, endFov: 32 })
  const prevMode = useRef(viewMode)
  const prevPatientType = useRef(patientType)
  const initialized = useRef(false)

  // Canvas-aspect-responsive dentition z: the narrower the canvas, the further
  // back the camera pulls so the whole arch still fits without cropping.
  // Wider range so narrow panels never clip the teeth.
  const dentitionZ = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height)
    const widthFactor = (size.width - 980) / 980
    // Wider canvas => zoom in a bit (lower Z), narrower => zoom out (higher Z)
    const widthAdjust = Math.max(-1.8, Math.min(1.8, -widthFactor * 2.2))
    const base = (() => {
      if (aspect < 0.6) return 30
      if (aspect < 0.8) return 26
      if (aspect < 1.0) return 22
      if (aspect < 1.2) return 19
      if (aspect < 1.5) return 17
      return 16
    })()
    if (patientType === 'pediatric') return base - 4.2 + widthAdjust
    if (patientType === 'mixed') return base + 0.3 + widthAdjust
    return base - 1.4 + widthAdjust
  }, [size.width, size.height, patientType])

  // Same idea for single-tooth view — pull camera back when canvas narrows.
  const singleToothZ = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height)
    const widthFactor = (size.width - 980) / 980
    const widthAdjust = Math.max(-1.1, Math.min(1.1, -widthFactor * 1.5))
    if (aspect < 0.7) return 9.15 + widthAdjust
    if (aspect < 0.9) return 8.15 + widthAdjust
    if (aspect < 1.1) return 7.45 + widthAdjust
    if (aspect < 1.4) return 6.85 + widthAdjust
    return 6.45 + widthAdjust
  }, [size.width, size.height])

  const groupedScopeZ = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height)
    const widthFactor = (size.width - 980) / 980
    const widthAdjust = Math.max(-1.6, Math.min(1.6, -widthFactor * 2.0))
    const base = aspect < 0.8 ? 22 : aspect < 1.1 ? 19.6 : 17.6
    if (selectionScopeType === 'full-mouth') return base + (patientType === 'mixed' ? 7.2 : 5.2) + widthAdjust
    return base + (patientType === 'mixed' ? 1.4 : 0.8) + widthAdjust
  }, [size.width, size.height, patientType, selectionScopeType])

  // Ctrl/Cmd + drag vertically nudges dentition framing (desktop).
  // iPad keeps native 2-finger panning through OrbitControls.
  useEffect(() => {
    if (!controlsRef.current?.domElement) return
    const dom = controlsRef.current.domElement as HTMLElement
    let dragging = false
    let lastY = 0
    const clampNudge = (v: number) => Math.max(-2.0, Math.min(2.0, v))

    const onPointerDown = (e: PointerEvent) => {
      if (viewMode !== 'dentition') return
      if (e.pointerType === 'touch') return
      if (!(e.ctrlKey || e.metaKey)) return
      dragging = true
      lastY = e.clientY
      if (controlsRef.current) controlsRef.current.enabled = false
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dy = e.clientY - lastY
      lastY = e.clientY
      if (controlsRef.current) {
        controlsRef.current.object.position.y += dy * 0.01
        controlsRef.current.target.y += dy * 0.01
        controlsRef.current.update()
      }
      onDentitionVerticalNudgeChange((prev) => clampNudge(prev + dy * 0.01))
      e.preventDefault()
    }

    const stopDragging = () => {
      if (!dragging) return
      dragging = false
      if (controlsRef.current?.dispatchEvent) {
        controlsRef.current.dispatchEvent({ type: 'end' })
      }
      if (controlsRef.current && !animRef.current.active) controlsRef.current.enabled = true
    }

    dom.addEventListener('pointerdown', onPointerDown, { passive: false })
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', stopDragging)
    window.addEventListener('pointercancel', stopDragging)

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown as EventListener)
      window.removeEventListener('pointermove', onPointerMove as EventListener)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
    }
  }, [controlsRef, viewMode, onDentitionVerticalNudgeChange])

  const getCameraPreset = useCallback(() => {
    if (viewMode === 'dentition') {
      if (dentitionCameraOverride) {
        return {
          cam: {
            ...DENTITION_CAMERA,
            position: new THREE.Vector3(
              dentitionCameraOverride.position[0],
              dentitionCameraOverride.position[1],
              dentitionCameraOverride.position[2],
            ),
            target: new THREE.Vector3(
              dentitionCameraOverride.target[0],
              dentitionCameraOverride.target[1],
              dentitionCameraOverride.target[2],
            ),
          },
        }
      }
      // Keep all dentition variants aligned to the canvas center-line vertically.
      const centeredY = 2.36
      const centeredTargetY = -0.34
      const dentitionFrameByType = patientType === 'pediatric'
        ? { y: centeredY, targetY: centeredTargetY, z: dentitionZ - 2.05 }
        : patientType === 'mixed'
          ? { y: centeredY, targetY: centeredTargetY, z: dentitionZ + 0.9 }
          : { y: centeredY, targetY: centeredTargetY, z: dentitionZ - 0.85 }
      return {
        cam: {
          ...DENTITION_CAMERA,
          position: new THREE.Vector3(
            DENTITION_CAMERA.position.x,
            dentitionFrameByType.y + dentitionVerticalNudge,
            dentitionFrameByType.z
          ),
          target: new THREE.Vector3(
            DENTITION_CAMERA.target.x,
            dentitionFrameByType.targetY + dentitionVerticalNudge,
            DENTITION_CAMERA.target.z
          )
        },
      }
    }
    if (selectionScopeType !== 'tooth') {
      return {
        cam: { position: new THREE.Vector3(0, 0.28, groupedScopeZ), target: new THREE.Vector3(0, -0.05, -0.35), fov: 35 },
      }
    }
    return {
      cam: {
        ...SINGLE_TOOTH_CAMERA,
        position: new THREE.Vector3(
          SINGLE_TOOTH_CAMERA.position.x,
          SINGLE_TOOTH_CAMERA.position.y,
          singleToothZ
        ),
      },
    }
  }, [viewMode, patientType, selectionScopeType, dentitionZ, groupedScopeZ, singleToothZ, dentitionVerticalNudge, dentitionCameraOverride])

  // Set initial camera position based on initial viewMode
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const { cam } = getCameraPreset()
    camera.position.copy(cam.position)
    camera.position.z = cam.position.z
    ;(camera as THREE.PerspectiveCamera).fov = cam.fov
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    if (controlsRef.current) {
      controlsRef.current.target.copy(cam.target)
      controlsRef.current.update()
    }
  }, [getCameraPreset]) // eslint-disable-line react-hooks/exhaustive-deps

  // React to canvas resize (e.g. draggable split) — both modes.
  useEffect(() => {
    if (animRef.current.active) return
    camera.position.z = getCameraPreset().cam.position.z
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    if (controlsRef.current) controlsRef.current.update()
  }, [dentitionZ, singleToothZ, groupedScopeZ, viewMode, selectionScopeType, getCameraPreset, camera, controlsRef])

  // Switching patient tabs should restore that tab's own view (or default),
  // rather than carrying over the previous tab's current camera transform.
  useEffect(() => {
    if (viewMode !== 'dentition') {
      prevPatientType.current = patientType
      return
    }
    if (prevPatientType.current === patientType) return
    prevPatientType.current = patientType
    const { cam } = getCameraPreset()
    camera.position.copy(cam.position)
    ;(camera as THREE.PerspectiveCamera).fov = cam.fov
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    if (controlsRef.current) {
      controlsRef.current.target.copy(cam.target)
      controlsRef.current.update()
    }
  }, [patientType, viewMode, getCameraPreset, camera, controlsRef])

  // Animate on mode change
  useEffect(() => {
    if (prevMode.current === viewMode) return
    prevMode.current = viewMode

    const { cam: target } = getCameraPreset()
    const a = animRef.current
    a.startPos.copy(camera.position)
    a.endPos.copy(target.position)
    a.endPos.z = target.position.z
    a.startTarget.copy(controlsRef.current?.target || new THREE.Vector3())
    a.endTarget.copy(target.target)
    a.startFov = (camera as THREE.PerspectiveCamera).fov
    a.endFov = target.fov
    a.t = 0
    a.active = true

    if (controlsRef.current) controlsRef.current.enabled = false
  }, [viewMode, selectionScopeType, getCameraPreset, camera, controlsRef])

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

const EMPTY_DIAGNOSES = new Set<string>()
const EMPTY_TREATMENTS = {}

const getTeethForPatientType = (type: PatientType): ToothDef[] => (
  type === 'adult'
    ? TEETH
    : type === 'pediatric'
      ? PEDIATRIC_TEETH
      : [...TEETH, ...PEDIATRIC_TEETH]
)

const getDefaultFdiForPatientType = (type: PatientType): string => (
  type === 'adult' ? '26' : type === 'pediatric' ? '64' : '26'
)

type SelectionScope = {
  type: 'tooth' | 'quadrant' | 'full-mouth'
  id: string
  label: string
  fdis: string[]
}

type PersistedCanvasState = {
  patientType?: PatientType
  viewMode?: ViewMode
  selectedToothFdi?: string
  selectionScope?: SelectionScope
  dentitionVerticalNudgeByType?: Partial<Record<PatientType, number>>
  dentitionCameraByType?: Partial<Record<PatientType, { position: [number, number, number]; target: [number, number, number] }>>
}

export function DentalCanvas({
  patientId,
  patientAge = 30,
  compact = false,
  onStateChange,
}: {
  patientId: string
  patientAge?: number
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
  const [patientType, setPatientType] = useState<PatientType>(patientAge < 12 ? 'pediatric' : 'adult')
  const activeTeeth = useMemo(() => getTeethForPatientType(patientType), [patientType])

  const [viewMode, setViewMode] = useState<ViewMode>('dentition')
  const [selectedTooth, setSelectedTooth] = useState<ToothDef>(
    activeTeeth.find(t => t.fdi === getDefaultFdiForPatientType(patientType)) ?? activeTeeth[0]
  )
  const [selectionScope, setSelectionScope] = useState<SelectionScope>({
    type: 'tooth',
    id: 'tooth',
    label: '',
    fdis: [],
  })
  const hasHydratedFromStorage = useRef(false)
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
  const [treatmentHistoryDetailsByTooth, setTreatmentHistoryDetailsByTooth] = useState<Record<string, Record<string, TreatmentHistoryDetail>>>({})
  const [highlightZones, setHighlightZones] = useState<ZoneId[]>([])
  const [multiSelectZones, setMultiSelectZones] = useState<Set<ZoneId>>(() => new Set())
  const [multiSelectActive, setMultiSelectActive] = useState(false)
  const [hoveredToothFdi, setHoveredToothFdi] = useState<string | null>(null)
  const [dentitionVerticalNudgeByType, setDentitionVerticalNudgeByType] = useState<Partial<Record<PatientType, number>>>({})
  const [dentitionCameraByType, setDentitionCameraByType] = useState<Partial<Record<PatientType, { position: [number, number, number]; target: [number, number, number] }>>>({})
  const [hideExamineHint, setHideExamineHint] = useState(false)
  const controlsRef = useRef<any>(null)
  const dentitionVerticalNudge = dentitionVerticalNudgeByType[patientType] ?? 0
  const dentitionCameraOverride = dentitionCameraByType[patientType]

  useEffect(() => {
    if (!selectionScope.fdis.length) {
      setSelectionScope({
        type: 'tooth',
        id: selectedTooth.fdi,
        label: `${QUADRANT_LABELS[selectedTooth.quadrant]} ${selectedTooth.name}`,
        fdis: [selectedTooth.fdi],
      })
    }
  }, [selectionScope.fdis.length, selectedTooth])

  useEffect(() => {
    if (typeof window === 'undefined' || hasHydratedFromStorage.current) return
    hasHydratedFromStorage.current = true
    const raw = window.localStorage.getItem(`dental.canvas.state.${patientId}`)
    if (!raw) return
    try {
      const saved = JSON.parse(raw) as PersistedCanvasState
      const nextType = (saved.patientType === 'adult' || saved.patientType === 'pediatric' || saved.patientType === 'mixed')
        ? saved.patientType
        : undefined
      const nextViewMode = (saved.viewMode === 'dentition' || saved.viewMode === 'single-tooth')
        ? saved.viewMode
        : undefined

      if (nextType) setPatientType(nextType)
      const source = getTeethForPatientType(nextType ?? patientType)
      const candidateFdi = saved.selectedToothFdi
      const fallbackFdi = getDefaultFdiForPatientType(nextType ?? patientType)
      const tooth = source.find((t) => t.fdi === candidateFdi) ?? source.find((t) => t.fdi === fallbackFdi) ?? source[0]
      if (tooth) {
        setSelectedTooth(tooth)
        setSelectionScope({
          type: 'tooth',
          id: tooth.fdi,
          label: `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}`,
          fdis: [tooth.fdi],
        })
      }
      if (saved.selectionScope && saved.selectionScope.fdis?.length) {
        setSelectionScope(saved.selectionScope)
      }
      if (nextViewMode) setViewMode(nextViewMode)
      if (saved.dentitionVerticalNudgeByType) {
        setDentitionVerticalNudgeByType(saved.dentitionVerticalNudgeByType)
      }
      if (saved.dentitionCameraByType) {
        setDentitionCameraByType(saved.dentitionCameraByType)
      }
    } catch {
      // ignore corrupted localStorage payload
    }
  }, [patientId, patientType])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hidden = window.localStorage.getItem(`dental.canvas.hintDismissed.${patientId}`)
    if (hidden === '1') setHideExamineHint(true)
  }, [patientId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const payload: PersistedCanvasState = {
      patientType,
      viewMode,
      selectedToothFdi: selectedTooth.fdi,
      selectionScope,
      dentitionVerticalNudgeByType,
      dentitionCameraByType,
    }
    window.localStorage.setItem(`dental.canvas.state.${patientId}`, JSON.stringify(payload))
  }, [patientId, patientType, viewMode, selectedTooth.fdi, selectionScope, dentitionVerticalNudgeByType, dentitionCameraByType])

  const handleDentitionVerticalNudgeChange = useCallback((value: number | ((prev: number) => number)) => {
    setDentitionVerticalNudgeByType((prev) => {
      const current = prev[patientType] ?? 0
      const nextRaw = typeof value === 'function' ? value(current) : value
      const next = Math.max(-2.0, Math.min(2.0, nextRaw))
      if (Math.abs(next - current) < 0.0001) return prev
      return { ...prev, [patientType]: next }
    })
  }, [patientType])

  const handleDentitionControlsEnd = useCallback(() => {
    if (viewMode !== 'dentition' || !controlsRef.current) return
    const ctrl = controlsRef.current
    const p = ctrl.object?.position
    const t = ctrl.target
    if (!p || !t) return
    const pose = {
      position: [p.x, p.y, p.z] as [number, number, number],
      target: [t.x, t.y, t.z] as [number, number, number],
    }
    setDentitionCameraByType((prev) => ({ ...prev, [patientType]: pose }))
  }, [patientType, viewMode])

  useEffect(() => {
    if (hideExamineHint) return
    const hasExamData = allEntries.length > 0 || Object.values(findingsByTooth).some((items) => items.length > 0)
    if (!hasExamData) return
    setHideExamineHint(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`dental.canvas.hintDismissed.${patientId}`, '1')
    }
  }, [allEntries.length, findingsByTooth, hideExamineHint, patientId])

  const currentToothDiagnoses = useMemo(
    () => toothDiagnoses[selectedTooth.fdi] || EMPTY_DIAGNOSES,
    [toothDiagnoses, selectedTooth.fdi]
  )

  const isImplant = currentToothDiagnoses.has('Implant') || implantTeeth.has(selectedTooth.fdi)
  const currentToothNotes = toothNotes[selectedTooth.fdi] || ''
  const currentTreatmentHistoryDetails = useMemo(() => {
    return treatmentHistoryDetailsByTooth[selectedTooth.fdi] || EMPTY_TREATMENTS
  }, [treatmentHistoryDetailsByTooth, selectedTooth.fdi])

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

    if (diagnosis === 'Missing' || diagnosis === 'Extraction') {
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
    setSelectionScope({
      type: 'tooth',
      id: tooth.fdi,
      label: `${QUADRANT_LABELS[tooth.quadrant]} ${tooth.name}`,
      fdis: [tooth.fdi],
    })
    setSelectedZone(null)
    setViewMode('single-tooth')
  }, [])

  const handleBackToDentition = useCallback(() => {
    setViewMode('dentition')
    setSelectionScope({
      type: 'tooth',
      id: selectedTooth.fdi,
      label: `${QUADRANT_LABELS[selectedTooth.quadrant]} ${selectedTooth.name}`,
      fdis: [selectedTooth.fdi],
    })
    setSelectedZone(null)
    setHoveredZone(null)
  }, [selectedTooth])

  const getScopeFdis = useCallback((scope: 'UR' | 'UL' | 'LR' | 'LL' | 'FULL') => {
    const source = getTeethForPatientType(patientType)
    if (scope === 'FULL') return source.map((t) => t.fdi)
    const quadrantMap: Record<'UR' | 'UL' | 'LR' | 'LL', Quadrant> = {
      UR: 'upper-right',
      UL: 'upper-left',
      LR: 'lower-right',
      LL: 'lower-left',
    }
    return source.filter((t) => t.quadrant === quadrantMap[scope]).map((t) => t.fdi)
  }, [patientType])

  const handleSelectScope = useCallback((scope: 'UR' | 'UL' | 'LR' | 'LL' | 'FULL') => {
    const fdis = getScopeFdis(scope)
    if (fdis.length === 0) return
    const representative = activeTeeth.find((t) => t.fdi === fdis[0]) ?? activeTeeth[0]
    setSelectedTooth(representative)
    setSelectionScope({
      type: scope === 'FULL' ? 'full-mouth' : 'quadrant',
      id: scope,
      label: scope === 'FULL'
        ? 'Full mouth'
        : ({
          UR: 'Upper Right Quadrant',
          UL: 'Upper Left Quadrant',
          LR: 'Lower Right Quadrant',
          LL: 'Lower Left Quadrant',
        }[scope]),
      fdis,
    })
    setSelectedZone(null)
    setViewMode('single-tooth')
  }, [activeTeeth, getScopeFdis])

  const handlePatientTypeChange = useCallback((nextType: PatientType) => {
    setPatientType(nextType)
    const nextTeeth = getTeethForPatientType(nextType)
    setSelectedTooth((prev) => {
      const nextSelected = nextTeeth.find(t => t.fdi === prev.fdi)
        ?? nextTeeth.find(t => t.fdi === getDefaultFdiForPatientType(nextType))
        ?? nextTeeth[0]
      setSelectionScope({
        type: 'tooth',
        id: nextSelected.fdi,
        label: `${QUADRANT_LABELS[nextSelected.quadrant]} ${nextSelected.name}`,
        fdis: [nextSelected.fdi],
      })
      return nextSelected
    })
  }, [])

  const handleSelectZone = useCallback((zone: ZoneId, hitPoint?: [number, number, number], opts?: { multi?: boolean }) => {
    if (currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction')) return
    if (hitPoint) {
      const key = `${selectedTooth.fdi}-${zone}`
      setZoneHitPoints(prev => ({ ...prev, [key]: hitPoint }))
    }
    if (opts?.multi) {
      // Always rotate camera to the clicked surface — even during multi-select
      setSelectedZone(zone)
      setMultiSelectZones((prev) => {
        const next = new Set(prev)
        if (zone !== 'whole' && next.has('whole')) next.delete('whole')
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
    setSelectedZone((prev) => multiSelectActive ? zone : (prev === zone ? null : zone))
    // Multi-select mode is gated by multiSelectActive (enabled only when a
    // surface cell in the Findings/Procedures table is active).
    if (!multiSelectActive) return
    setMultiSelectZones((prev) => {
      if (zone === 'whole') {
        return prev.has('whole') ? new Set<ZoneId>() : new Set<ZoneId>(['whole'])
      }
      const next = new Set(prev)
      if (next.has('whole')) next.delete('whole')
      if (next.has(zone)) next.delete(zone)
      else next.add(zone)
      return next
    })
  }, [multiSelectActive])

  const handleToggleZoneFromQuickSelector = useCallback((zone: ZoneId) => {
    // Keep selector visible always, but only allow true multi-select
    // while a surfaces cell is actively editing.
    if (!multiSelectActive) {
      setMultiSelectZones((prev) => (prev.size === 0 ? prev : new Set<ZoneId>()))
      setSelectedZone((prev) => (prev === zone ? null : zone))
      return
    }
    setSelectedZone(zone)
    setMultiSelectZones((prev) => {
      if (zone === 'whole') {
        return prev.has('whole') ? new Set<ZoneId>() : new Set<ZoneId>(['whole'])
      }
      const next = new Set(prev)
      if (next.has('whole')) next.delete('whole')
      if (next.has(zone)) next.delete(zone)
      else next.add(zone)
      return next
    })
  }, [multiSelectActive])

  const handleClearMultiSelect = useCallback(() => {
    setMultiSelectZones((prev) => (prev.size === 0 ? prev : new Set()))
  }, [])

  const handleClearSelectedZone = useCallback(() => {
    setSelectedZone(null)
  }, [])

  const handleSetMultiSelectZones = useCallback((zones: ZoneId[]) => {
    setMultiSelectZones((prev) => {
      if (prev.size === zones.length && zones.every((zone) => prev.has(zone))) return prev
      return new Set(zones)
    })
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

  const handleUpdateTreatmentHistoryDetail = useCallback((name: string, patch: Partial<TreatmentHistoryDetail>) => {
    const fdi = selectedTooth.fdi
    setTreatmentHistoryDetailsByTooth((prev) => {
      const currentToothDetails = prev[fdi] || {}
      const previous = currentToothDetails[name] || { surfaces: getDefaultTreatmentSurfaces(name) }
      return {
        ...prev,
        [fdi]: {
          ...currentToothDetails,
          [name]: { ...previous, ...patch },
        },
      }
    })
  }, [selectedTooth.fdi])

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
      patientType,
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
      currentTreatmentHistoryDetails,
      allEntries,
      highlightZones,
      multiSelectZones,
      multiSelectActive,
      hoveredToothFdi,
      selectionScopeType: selectionScope.type,
      selectionScopeId: selectionScope.id,
      selectionScopeLabel: selectionScope.label,
      selectionScopeFdis: selectionScope.fdis,
      onToggleToothDiagnosis: toggleToothDiagnosis,
      onToggleImplant: toggleImplant,
      onAddFinding: handleAddFinding,
      onRemoveFinding: handleRemoveFinding,
      onUpdateNotes: handleUpdateNotes,
      onUpdateToothNotes: updateToothNotes,
      onBackToDentition: handleBackToDentition,
      onSelectTooth: handleSelectTooth,
      onSelectZone: handleSelectZone,
      onClearSelectedZone: handleClearSelectedZone,
      onAddEntry: handleAddEntry,
      onUpdateEntry: handleUpdateEntry,
      onRemoveEntry: handleRemoveEntry,
      onUpdateTreatmentHistoryDetail: handleUpdateTreatmentHistoryDetail,
      onSetHighlightZones: handleSetHighlightZones,
      onToggleZoneMultiSelect: handleToggleZoneMultiSelect,
      onSetMultiSelectZones: handleSetMultiSelectZones,
      onClearMultiSelect: handleClearMultiSelect,
      onSetMultiSelectActive: handleSetMultiSelectActive,
      onSetHoveredTooth: handleSetHoveredTooth,
    })
  }, [
    viewMode, patientType, selectedTooth, selectedZone, findings, toothDiagnoses, implantTeeth, findingsByTooth,
    currentToothDiagnoses, currentToothNotes, currentTreatmentHistoryDetails, zoneNotes, isImplant, onStateChange,
    currentToothEntries, allEntries, highlightZones, multiSelectZones, multiSelectActive, hoveredToothFdi, selectionScope,
    toggleToothDiagnosis, toggleImplant, handleAddFinding, handleRemoveFinding,
    handleUpdateNotes, updateToothNotes, handleBackToDentition, handleSelectTooth, handleSelectZone, handleClearSelectedZone,
    handleAddEntry, handleUpdateEntry, handleRemoveEntry, handleUpdateTreatmentHistoryDetail, handleSetHighlightZones,
    handleToggleZoneMultiSelect, handleSetMultiSelectZones, handleClearMultiSelect, handleSetMultiSelectActive, handleSetHoveredTooth,
  ])

  const isDentitionView = viewMode === 'dentition'
  const dentitionTitle = patientType === 'adult'
    ? 'Full Adult Dentition View'
    : patientType === 'pediatric'
      ? 'Full Pediatric Dentition View'
      : 'Full Mixed Dentition View'

  return (
    <div className={`dental-canvas-root ${isDentitionView ? 'dentition-mode' : ''} ${compact ? 'compact' : ''}`}>
      <div className="viewer">
        <div className="viewer-header">
          {isDentitionView ? (
            <div className="tooth-name tooth-name--dentition">
              <span key={patientType} className="tooth-name-text">
                {dentitionTitle}
              </span>
            </div>
          ) : (
            <div
              className="tooth-name"
              style={{ paddingLeft: 6, gap: 3, cursor: 'pointer' }}
              onClick={handleBackToDentition}
              title="Back to full dentition view"
              role="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08" stroke="#1e293b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.2" />
              </svg>
              {selectionScope.type === 'tooth' ? (
                <>
                  {QUADRANT_LABELS[selectedTooth.quadrant]} {selectedTooth.name}
                  <span className="tooth-fdi">T{selectedTooth.fdi}</span>
                </>
              ) : (
                <>
                  {selectionScope.type === 'full-mouth' ? 'Full Mouth View' : `${selectionScope.label} View`}
                  <span className="tooth-fdi">
                    {selectionScope.type === 'full-mouth' ? 'FULL' : selectionScope.id}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Patient type tabs */}
        {isDentitionView && (
          <div className="absolute right-4 top-[12px] z-20">
            <div className="inline-flex h-[36px] items-center gap-[4px] rounded-[10px] bg-[#E9E9EF] p-[3px] text-[rgba(160,160,167,1)]">
              <button 
                onClick={() => handlePatientTypeChange('adult')}
                className={`relative h-[30px] px-3 text-[11px] font-semibold rounded-[8px] transition-colors ${patientType === 'adult' ? 'bg-white text-tp-slate-800 pointer-events-none' : 'text-tp-slate-500 hover:text-tp-slate-700 hover:bg-white/70'}`}
              >
                Adult
              </button>
              <button 
                onClick={() => handlePatientTypeChange('pediatric')}
                className={`relative h-[30px] px-3 text-[11px] font-semibold rounded-[8px] transition-colors ${patientType === 'pediatric' ? 'bg-white text-tp-slate-800 pointer-events-none' : 'text-tp-slate-500 hover:text-tp-slate-700 hover:bg-white/70'}`}
              >
                Pediatric
              </button>
              <button
                onClick={() => handlePatientTypeChange('mixed')}
                className={`relative h-[30px] px-3 text-[11px] font-semibold rounded-[8px] transition-colors ${patientType === 'mixed' ? 'bg-white text-tp-slate-800 pointer-events-none' : 'text-tp-slate-500 hover:text-tp-slate-700 hover:bg-white/70'}`}
              >
                Mixed
              </button>
            </div>
          </div>
        )}

        {isDentitionView && (
          <div className="absolute bottom-4 right-4 z-20">
            <div className="flex h-[36px] items-center gap-1.5 rounded-[10px] border border-white/60 bg-white/70 px-1.5 backdrop-blur-xl">
              {(['UR', 'UL', 'LR', 'LL', 'FULL'] as const).map((scope) => {
                const active =
                  (scope === 'FULL' && selectionScope.type === 'full-mouth') ||
                  (scope !== 'FULL' && selectionScope.type === 'quadrant' && selectionScope.id === scope)
                return (
                  <button
                    key={scope}
                    onClick={() => handleSelectScope(scope)}
                    className={`relative h-[28px] px-3 text-[11px] font-semibold rounded-[8px] border transition-all ${active ? 'border-tp-blue-600 bg-tp-blue-600 text-white' : 'border-transparent bg-white text-tp-slate-600 hover:border-tp-blue-200 hover:bg-tp-blue-50 hover:text-tp-blue-700'}`}
                  >
                    {scope === 'FULL' ? 'Full' : scope}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Bottom-center hint — animated up-arrow + "Click any tooth" text */}
        {isDentitionView && !hideExamineHint && (
          <div
            style={{
              position: 'absolute',
              bottom: '58px',
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
            <LottieIcon name="arrow-up" size={24} color="#d5dde8" />
            <span
              style={{
                fontSize: '14px',
                color: '#b7c3d4',
                fontWeight: 500,
                opacity: 0.72,
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
              }}
            >
              Click any tooth to examine
            </span>
          </div>
        )}

        {/* Tooth grid — only in single-tooth view */}
        {!isDentitionView && selectionScope.type === 'tooth' && (
          <ToothSelector
            selectedTooth={selectedTooth}
            patientType={patientType}
            onSelectTooth={handleSelectTooth}
            toothDiagnoses={toothDiagnoses}
            viewMode={viewMode}
            onBackToDentition={handleBackToDentition}
            surfaceSelector={(
              <QuickSurfaceSelector
                selectedZones={multiSelectActive
                  ? multiSelectZones
                  : (selectedZone ? new Set<ZoneId>([selectedZone]) : new Set<ZoneId>())
                }
                onToggleZone={handleToggleZoneFromQuickSelector}
                arch={selectedTooth.arch}
                toothPosition={selectedTooth.position}
                zonesWithFindings={new Set(findings.map(f => f.zoneId))}
                disabled={currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction')}
              />
            )}
          />
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

          <CameraController
            viewMode={viewMode}
            patientType={patientType}
            selectionScopeType={selectionScope.type}
            dentitionCameraOverride={dentitionCameraOverride}
            dentitionVerticalNudge={dentitionVerticalNudge}
            onDentitionVerticalNudgeChange={handleDentitionVerticalNudgeChange}
            controlsRef={controlsRef}
          />
          {!isDentitionView && selectionScope.type === 'tooth' && (
            <ZoneCameraRotator zone={selectedZone} toothFdi={selectedTooth.fdi} quadrant={selectedTooth.quadrant} arch={selectedTooth.arch} controlsRef={controlsRef} />
          )}

          <Suspense fallback={null}>
            {isDentitionView ? (
              <DentitionView
                patientType={patientType}
                layoutMode="split"
                toothDiagnoses={toothDiagnoses}
                findingsByTooth={findingsByTooth}
                implantTeeth={implantTeeth}
                onSelectTooth={handleSelectTooth}
                onHoverTooth={setHoveredToothFdi}
                externalHoveredFdi={hoveredToothFdi}
                allEntries={allEntries}
                toothNotes={toothNotes}
              />
            ) : (
              selectionScope.type !== 'tooth' ? (
                <DentitionView
                  patientType={patientType}
                  visibleFdis={selectionScope.fdis}
                  disableSelection={true}
                  layoutMode={selectionScope.type === 'full-mouth' ? 'natural' : 'split'}
                  toothDiagnoses={toothDiagnoses}
                  findingsByTooth={findingsByTooth}
                  implantTeeth={implantTeeth}
                  onSelectTooth={handleSelectTooth}
                  onHoverTooth={setHoveredToothFdi}
                  externalHoveredFdi={hoveredToothFdi}
                  allEntries={allEntries}
                  toothNotes={toothNotes}
                />
              ) : (
                <group position={[0, -0.15, 0]}>
                  <Tooth
                    key={`${selectedTooth.fdi}-${isImplant ? 'imp' : 'nat'}-${[...currentToothDiagnoses].sort().join(',')}`}
                    selectedZone={selectedZone}
                    onSelectZone={handleSelectZone}
                    onClearSelectedZone={handleClearSelectedZone}
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
                    hideTags={true}
                    treatmentHistoryDetails={currentTreatmentHistoryDetails}
                    toothEntries={currentToothEntries.map(e => ({ kind: e.kind, name: e.name, surfaces: e.surfaces }))}
                  />
                </group>
              )
            )}
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            onEnd={handleDentitionControlsEnd}
            enableDamping dampingFactor={0.12}
            rotateSpeed={0.8}
            minDistance={isDentitionView ? 6 : (selectionScope.type === 'tooth' ? 2.5 : 5)}
            maxDistance={isDentitionView ? (patientType === 'mixed' ? 28 : 22) : (selectionScope.type === 'tooth' ? 10 : 30)}
            enablePan={isDentitionView}
            touches={{ ONE: 0, TWO: 2 }}
          />
        </Canvas>
      </div>
    </div>
  )
}
