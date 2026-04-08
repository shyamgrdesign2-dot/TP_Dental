"use client"

import { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, Html, Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { TEETH, PEDIATRIC_TEETH, ARCH_POSITIONS, PEDIATRIC_ARCH_POSITIONS, ZONE_INFO, getZoneLabel, QUADRANT_LABELS, type ToothDef, type Finding, type ToothEntry, type PatientType, type ArchPose } from './types'
import {
  cloneSceneWithUniqueMaterials,
  injectShader,
  getDentalShaderVariantKey,
  ImplantScrew,
  prewarmDentalShaderProgram,
  PreparedStump,
  RootCanals,
  getDirsForTooth,
  IMPLANT_TOP_DIAM,
} from './Tooth'

// ══════════════════════════════════════════════════════════════
// ArchTooth — reuses the exact same rendering pipeline as the
// single-tooth Tooth component (same clone, same shader, same
// implant/crown/stump visuals) but without camera controls or
// zone selection interactivity.
// ══════════════════════════════════════════════════════════════

interface ArchToothProps {
  tooth: ToothDef
  archPose: ArchPose
  toothScale?: number
  diagnoses: Set<string> | undefined
  findings: Finding[]
  treatmentHistoryTags: string[]
  isImplant: boolean
  isHovered: boolean
  isPinned: boolean
  onHover: (fdi: string | null) => void
  onClick: (tooth: ToothDef) => void
  onPin: (fdi: string | null) => void
}

const ArchTooth = memo(function ArchTooth({
  tooth, archPose, toothScale = 1, diagnoses, findings, treatmentHistoryTags, isImplant, isHovered, isPinned, onHover, onClick, onPin,
}: ArchToothProps) {
  const { gl, camera } = useThree()
  const gltf = useGLTF(tooth.modelPath)
  const implantGltf = useGLTF('/models/implant.glb')
  const groupRef = useRef<THREE.Group>(null)   // Center ref (for bounding box)
  const outerGroupRef = useRef<THREE.Group>(null) // mirrorX group (parentGroup for diagnosis visuals)
  const meshRef = useRef<THREE.Group>(null)

  const isMissing = diagnoses?.has('Missing') || diagnoses?.has('Extraction') || false
  const isCrown = diagnoses?.has('Crown') || false
  const isRCT = diagnoses?.has('RCT') || false
  const isBridge = diagnoses?.has('Bridge') || false
  const isDenture = diagnoses?.has('Denture') || false

  // Same deep clone as Tooth.tsx — unique materials per tooth
  const clonedScene = useMemo(() => {
    return cloneSceneWithUniqueMaterials(gltf.scene)
  }, [gltf])

  // Implant placement state + tooth mesh ref for procedural implant
  const [implantPlacement, setImplantPlacement] = useState<{
    cervicalY: number; centerX: number; centerZ: number; cervicalDiam: number
  } | null>(null)
  // Mesh bounds + dirs for PreparedStump and RootCanals
  const [meshBoundsData, setMeshBoundsData] = useState<{
    center: THREE.Vector3; size: THREE.Vector3; cervicalY: number; bb: THREE.Box3
  } | null>(null)
  const [zoneDirs, setZoneDirs] = useState<Record<string, THREE.Vector3> | null>(null)
  const toothMeshRefLocal = useRef<THREE.Mesh | null>(null)
  const implantBB = useRef<THREE.Box3 | null>(null)
  const shaderRefs = useRef<Array<{ shader: any }>>([])
  const zoneFindingsRef = useRef<number[]>([0, 0, 0, 0, 0, 0, 0])

  // Update findings ref whenever findings change — picked up next frame
  useEffect(() => {
    const order = ['occlusal', 'buccal', 'lingual', 'mesial', 'distal', 'cervical', 'root'] as const
    zoneFindingsRef.current = order.map(z => findings.some(f => f.zoneId === z) ? 1 : 0)
  }, [findings])

  // Push finding-tint uniform every frame
  useFrame(() => {
    const zf = zoneFindingsRef.current
    for (const ref of shaderRefs.current) {
      const s = ref.shader
      if (!s?.uniforms?.uZoneHasFinding) continue
      const arr = s.uniforms.uZoneHasFinding.value
      arr[0] = zf[0]; arr[1] = zf[1]; arr[2] = zf[2]; arr[3] = zf[3]
      arr[4] = zf[4]; arr[5] = zf[5]; arr[6] = zf[6]
    }
  })

  // Capture first mesh from cloned scene
  useMemo(() => {
    toothMeshRefLocal.current = null
    clonedScene.traverse((obj: THREE.Object3D) => {
      const m = obj as THREE.Mesh
      if (m.isMesh && !toothMeshRefLocal.current) {
        toothMeshRefLocal.current = m
      }
    })
  }, [clonedScene])

  // After mount: compute bounding box and inject the SAME shader as single-tooth view
  // No guard ref — always re-inject when diagnosis flags change.
  // Uses requestAnimationFrame to wait for <Center> layout.
  useEffect(() => {
    const applyToCurrentScene = () => {
      if (!groupRef.current) return false
      groupRef.current.updateMatrixWorld(true)

      const bb = new THREE.Box3().setFromObject(groupRef.current)
      const sizeProbe = new THREE.Vector3()
      bb.getSize(sizeProbe)
      if (sizeProbe.lengthSq() < 1e-8) return false
      const center = new THREE.Vector3()
      const size = new THREE.Vector3()
      bb.getCenter(center)
      bb.getSize(size)

      let cervicalY: number, cejY: number, crownBottomY: number
      if (tooth.arch === 'maxillary') {
        cervicalY = bb.min.y + size.y * 0.42
        cejY = bb.min.y + size.y * 0.50
        crownBottomY = bb.min.y
      } else {
        cervicalY = bb.max.y - size.y * 0.42
        cejY = bb.max.y - size.y * 0.50
        crownBottomY = bb.max.y
      }

      const quadNum = parseInt(tooth.fdi[0])
      const zoneYawRad = (quadNum === 1 || quadNum === 4)
        ? -Math.PI * (tooth.position - 1) / 14
        : Math.PI * (tooth.position - 1) / 14

      // Collect materials and inject the same shader as single-tooth view.
      const materials: THREE.Material[] = []
      clonedScene.traverse((obj: THREE.Object3D) => {
        const m = obj as THREE.Mesh
        if (m.isMesh && m.material) {
          if (Array.isArray(m.material)) materials.push(...m.material)
          else materials.push(m.material)
        }
      })

      shaderRefs.current = []
      for (const mat of materials) {
        shaderRefs.current.push(
          injectShader(
            mat, cervicalY, cejY, crownBottomY,
            center.x, center.z, tooth.arch, tooth.quadrant, zoneYawRad, tooth.fdi,
            isImplant, isMissing, isCrown, isRCT, isBridge, isDenture,
          )
        )
        mat.needsUpdate = true
      }
      prewarmDentalShaderProgram({
        gl,
        camera,
        source: clonedScene,
        variantKey: getDentalShaderVariantKey({
          isImplant,
          isMissing,
          isCrown,
          isRCT,
          isBridge,
          isDenture,
        }),
      })

      // Compute implant placement + store bb
      implantBB.current = bb
      if (isImplant) {
        const cervicalDiam = Math.max(size.x, size.z) * 0.75
        setImplantPlacement({ cervicalY, centerX: center.x, centerZ: center.z, cervicalDiam })
      } else {
        setImplantPlacement(null)
      }

      // Compute mesh bounds in outerGroupRef local space for Crown/RCT visuals
      // This ensures PreparedStump + RootCanals render correctly regardless of arch position
      if (outerGroupRef.current) {
        outerGroupRef.current.updateMatrixWorld(true)
        const outerInv = new THREE.Matrix4().copy(outerGroupRef.current.matrixWorld).invert()

        const localCenter = center.clone().applyMatrix4(outerInv)
        const localBBmin = bb.min.clone().applyMatrix4(outerInv)
        const localBBmax = bb.max.clone().applyMatrix4(outerInv)
        const localBB = new THREE.Box3(
          new THREE.Vector3(Math.min(localBBmin.x, localBBmax.x), Math.min(localBBmin.y, localBBmax.y), Math.min(localBBmin.z, localBBmax.z)),
          new THREE.Vector3(Math.max(localBBmin.x, localBBmax.x), Math.max(localBBmin.y, localBBmax.y), Math.max(localBBmin.z, localBBmax.z)),
        )
        const localSize = new THREE.Vector3()
        localBB.getSize(localSize)
        const localCervPt = new THREE.Vector3(center.x, cervicalY, center.z).applyMatrix4(outerInv)

        setMeshBoundsData({
          center: localCenter,
          size: localSize,
          cervicalY: localCervPt.y,
          bb: localBB,
        })

        // Compute direction vectors in outerGroupRef local space
        const dirs = getDirsForTooth(tooth.fdi, tooth.quadrant, zoneYawRad)
        // Transform direction vectors to local space (rotation only, no translation)
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(outerInv)
        const transformDir = (d: THREE.Vector3) => d.clone().applyMatrix3(normalMatrix).normalize()
        setZoneDirs({
          buccal: transformDir(dirs.buccal),
          lingual: transformDir(dirs.lingual),
          mesial: transformDir(dirs.mesial),
          distal: transformDir(dirs.distal),
        })
      }
      return true
    }

    if (applyToCurrentScene()) return
    let raf = 0
    let tries = 0
    const maxTries = 12
    const tick = () => {
      if (applyToCurrentScene()) return
      tries += 1
      if (tries < maxTries) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [clonedScene, tooth, isImplant, isMissing, isCrown, isRCT, isBridge, isDenture, gl, camera])

  // Hover glow on state change (avoid per-frame traversals across all teeth).
  useEffect(() => {
    if (!meshRef.current) return
    meshRef.current.traverse((obj) => {
      const m = obj as THREE.Mesh
      if (m.isMesh && m.material && !Array.isArray(m.material)) {
        const mat = m.material as THREE.MeshStandardMaterial
        if (mat.metalness > 0.5) return
        if (isHovered) {
          mat.emissiveIntensity = 0.32
          mat.emissive.set('#4a9eff')
        } else {
          mat.emissiveIntensity = 0
          mat.emissive.set('#000000')
        }
      }
    })
  }, [isHovered])

  if (!archPose) return null

  const handlePointerEnter = useCallback((e: any) => {
    e.stopPropagation()
    onHover(tooth.fdi)
    document.body.style.cursor = 'pointer'
  }, [tooth.fdi, onHover])

  const handlePointerLeave = useCallback((e: any) => {
    e.stopPropagation()
    onHover(null)
    document.body.style.cursor = 'default'
  }, [onHover])

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    // On touch: first tap pins the tooltip, second tap navigates.
    // On mouse: click navigates immediately (hover already shows tooltip).
    const isTouch = e.pointerType === 'touch' || e.nativeEvent?.pointerType === 'touch'
    if (isTouch) {
      if (isPinned) {
        onPin(null)
        onClick(tooth)
      } else {
        onPin(tooth.fdi)
      }
    } else {
      onClick(tooth)
    }
  }, [tooth, onClick, onPin, isPinned])

  // Diagnosis labels for pill (only tooth-level primary diagnoses)
  const occlusalOffsetY = tooth.arch === 'maxillary' ? -0.75 : 0.75

  return (
    <group
      ref={meshRef}
      position={archPose.position}
      rotation={archPose.rotation}
      scale={[toothScale, toothScale, toothScale]}
    >
      <group ref={outerGroupRef} scale={tooth.mirrorX ? [-1, 1, 1] : [1, 1, 1]}>
        <Center ref={groupRef}>
          <primitive
            object={clonedScene}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick}
          />
        </Center>

        {/* Crown → PreparedStump (tooth-shaped abutment under crown) */}
        {isCrown && meshBoundsData && toothMeshRefLocal.current && (
          <PreparedStump
            toothMesh={toothMeshRefLocal.current}
            meshBounds={meshBoundsData}
            arch={tooth.arch}
            parentGroup={outerGroupRef.current}
          />
        )}

        {/* RCT → RootCanals (red nerve canals inside root) */}
        {isRCT && meshBoundsData && zoneDirs && (
          <RootCanals
            meshBounds={meshBoundsData}
            arch={tooth.arch}
            toothPosition={tooth.position}
            dirs={zoneDirs}
            toothFdi={tooth.fdi}
          />
        )}

        {/* Procedural implant — tooth-shaped abutment + cylindrical screw */}
        {isImplant && implantPlacement && (
          <ImplantScrew
            placement={implantPlacement}
            arch={tooth.arch}
            implantScene={implantGltf.scene}
            toothMesh={toothMeshRefLocal.current}
            bb={implantBB.current}
            parentGroup={outerGroupRef.current}
          />
        )}
      </group>

      {/* Primary diagnosis pill (grey chips, occlusal side). */}
      {treatmentHistoryTags.length > 0 && (
        <Html
          position={[0, occlusalOffsetY, 0]}
          center
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
          zIndexRange={(isHovered || isPinned) ? [80, 40] : [30, 0]}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '3px',
          }}>
            {treatmentHistoryTags.map(d => (
              <span key={d} style={{
                fontSize: '11px', fontWeight: 600, padding: '2px 7px',
                borderRadius: '4px', fontFamily: 'Inter, system-ui, sans-serif',
                background: 'rgba(107, 114, 128, 0.78)', color: '#fff', lineHeight: '1.3',
                backdropFilter: 'blur(3px)', letterSpacing: '0.01em',
              }}>{d}</span>
            ))}
          </div>
        </Html>
      )}
    </group>
  )
})

// ══════════════════════════════════════════════════════════════
// DentitionView — full 32-tooth panoramic view
// ══════════════════════════════════════════════════════════════

interface DentitionViewProps {
  patientType: PatientType
  visibleFdis?: string[]
  disableSelection?: boolean
  layoutMode?: 'split' | 'natural'
  showGuides?: boolean
  showScopeHotspots?: boolean
  onSelectScope?: (scope: 'UR' | 'UL' | 'LR' | 'LL' | 'FULL') => void
  toothDiagnoses: Record<string, Set<string>>
  findingsByTooth: Record<string, Finding[]>
  implantTeeth: Set<string>
  onSelectTooth: (tooth: ToothDef) => void
  onHoverTooth?: (fdi: string | null) => void
  externalHoveredFdi?: string | null
  allEntries?: ToothEntry[]
  toothNotes?: Record<string, string>
}

export default function DentitionView({
  patientType,
  visibleFdis,
  disableSelection = false,
  layoutMode = 'split',
  showGuides = false,
  showScopeHotspots = false,
  onSelectScope,
  toothDiagnoses,
  findingsByTooth,
  implantTeeth,
  onSelectTooth,
  onHoverTooth,
  externalHoveredFdi,
  allEntries,
  toothNotes,
}: DentitionViewProps) {
  const USE_SPLIT_QUADRANT_EXPERIMENT = layoutMode === 'split'
  const [hoveredTooth, setHoveredToothInternal] = useState<string | null>(null)
  // Wrap setter to also notify parent.
  const setHoveredTooth = useCallback((v: string | null) => {
    setHoveredToothInternal(v)
    onHoverTooth?.(v)
  }, [onHoverTooth])
  // Merge externally-driven hover (e.g. from summary card hover).
  const effectiveHovered = externalHoveredFdi ?? hoveredTooth
  const [pinnedTooth, setPinnedTooth] = useState<string | null>(null)

  // Clear pinned tooltip on background tap / ESC
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      // If click lands on the canvas but NOT on a tooth (no stopPropagation), clear pin.
      // We rely on the tooth's onClick having already fired and set pinnedTooth.
      // This timeout defers so the tooth's handler runs first.
      setTimeout(() => {
        const target = e.target as HTMLElement
        if (!target.closest('canvas')) setPinnedTooth(null)
      }, 0)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPinnedTooth(null) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onDoc)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onDoc)
    }
  }, [])

  const activeFdi = effectiveHovered || pinnedTooth
  const isPediatricOnly = patientType === 'pediatric'
  const isMixed = patientType === 'mixed'
  const activeTeeth = isMixed ? [...TEETH, ...PEDIATRIC_TEETH] : (isPediatricOnly ? PEDIATRIC_TEETH : TEETH)
  const activePositions = useMemo<Record<string, ArchPose>>(() => {
    if (isMixed) {
      const mixed: Record<string, ArchPose> = {}

      // Adult arches stay top/bottom. Pediatric arches sit in-between.
      const adultUpperYOffset = 2.25
      const adultLowerYOffset = -1.9
      const pedUpperYOffset = 0.2
      const pedLowerYOffset = -0.15

      for (const tooth of TEETH) {
        const base = ARCH_POSITIONS[tooth.fdi]
        if (!base) continue
        const yShift = tooth.arch === 'maxillary' ? adultUpperYOffset : adultLowerYOffset
        const xShift = USE_SPLIT_QUADRANT_EXPERIMENT
          ? (tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35)
          : 0
        mixed[tooth.fdi] = {
          position: [base.position[0] + xShift, base.position[1] + yShift, base.position[2]],
          rotation: base.rotation,
        }
      }

      for (const tooth of PEDIATRIC_TEETH) {
        const base = PEDIATRIC_ARCH_POSITIONS[tooth.fdi]
        if (!base) continue
        const yShift = tooth.arch === 'maxillary' ? pedUpperYOffset : pedLowerYOffset
        const xShift = USE_SPLIT_QUADRANT_EXPERIMENT
          ? (tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35)
          : 0
        mixed[tooth.fdi] = {
          position: [base.position[0] + xShift, base.position[1] + yShift, base.position[2]],
          rotation: base.rotation,
        }
      }
      return mixed
    }
    const baseline = isPediatricOnly ? PEDIATRIC_ARCH_POSITIONS : ARCH_POSITIONS
    if (!USE_SPLIT_QUADRANT_EXPERIMENT) return baseline

    const split: Record<string, ArchPose> = {}
    for (const tooth of activeTeeth) {
      const base = baseline[tooth.fdi]
      if (!base) continue
      const isUpper = tooth.arch === 'maxillary'
      const isLeft = tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left'
      split[tooth.fdi] = {
        position: [
            base.position[0] + (isLeft ? 0.5 : -0.5),
            base.position[1] + (isUpper ? 0.42 : -0.42),
          base.position[2],
        ],
        rotation: base.rotation,
      }
    }
    return split
  }, [USE_SPLIT_QUADRANT_EXPERIMENT, activeTeeth, isMixed, isPediatricOnly])
  const sceneScale = isPediatricOnly ? [0.85, 0.85, 0.85] as [number, number, number] : [1, 1, 1] as [number, number, number]

  const visibleTeeth = useMemo(
    () => activeTeeth.filter((tooth) => !visibleFdis || visibleFdis.includes(tooth.fdi)),
    [activeTeeth, visibleFdis]
  )
  const contentCenter = useMemo<[number, number, number]>(() => {
    if (visibleTeeth.length === 0) return [0, 0, 0]
    const sum = visibleTeeth.reduce<[number, number, number]>((acc, tooth) => {
      const pose = activePositions[tooth.fdi]
      if (!pose) return acc
      return [acc[0] + pose.position[0], acc[1] + pose.position[1], acc[2] + pose.position[2]]
    }, [0, 0, 0])
    return [sum[0] / visibleTeeth.length, sum[1] / visibleTeeth.length, sum[2] / visibleTeeth.length]
  }, [activePositions, visibleTeeth])
  // Keep the dentition stack slightly lower so it aligns with the split drag-handle midpoint.
  const frameVerticalOffset = -0.5
  const activeTooth = activeFdi ? activeTeeth.find(t => t.fdi === activeFdi) : null
  const guideSegments = useMemo(() => {
    if (!showGuides) return null
    if (isMixed) {
      // Vertical center + separators between the 4 mixed rows.
      return new Float32Array([
        0, 3.2, -2.6, 0, -3.2, -2.6,
        -5.2, 1.15, -2.6, 5.2, 1.15, -2.6,
        -5.2, -0.4, -2.6, 5.2, -0.4, -2.6,
        -5.2, -2.05, -2.6, 5.2, -2.05, -2.6,
      ])
    }
    return new Float32Array([
      0, 2.3, -2.6, 0, -2.3, -2.6,
      -5.2, 0, -2.6, 5.2, 0, -2.6,
    ])
  }, [showGuides, isMixed])

  return (
    <group scale={sceneScale} position={[-contentCenter[0], -contentCenter[1] + frameVerticalOffset, -contentCenter[2]]}>
      {guideSegments && (
        <lineSegments renderOrder={1}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[guideSegments, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#94a3b8" transparent opacity={0.35} />
        </lineSegments>
      )}
      {visibleTeeth.map((tooth) => {
        const isPrimaryTooth = ['5', '6', '7', '8'].includes(tooth.fdi[0])
        const findings = findingsByTooth[tooth.fdi] || []
        const treatmentHistoryTags = Array.from(new Set([
          ...(toothDiagnoses[tooth.fdi] ? Array.from(toothDiagnoses[tooth.fdi]!) : []),
          ...(implantTeeth.has(tooth.fdi) ? ['Implant'] : []),
        ]))
        return (
          <ArchTooth
            key={`${patientType}-${layoutMode}-${tooth.fdi}-${[...(toothDiagnoses[tooth.fdi] || [])].join(',')}-${implantTeeth.has(tooth.fdi)}`}
            tooth={tooth}
            archPose={activePositions[tooth.fdi]}
            toothScale={isMixed && isPrimaryTooth ? 0.85 : 1}
            diagnoses={toothDiagnoses[tooth.fdi]}
            findings={findings}
            treatmentHistoryTags={treatmentHistoryTags}
            isImplant={implantTeeth.has(tooth.fdi)}
            isHovered={effectiveHovered === tooth.fdi}
            isPinned={pinnedTooth === tooth.fdi}
            onHover={setHoveredTooth}
            onClick={disableSelection ? () => {} : onSelectTooth}
            onPin={setPinnedTooth}
          />
        )
      })}
      {showScopeHotspots && onSelectScope && (
        <>
          <ScopeHotspot label="UR" position={[-3.2, 1.2, -2.8]} onClick={() => onSelectScope('UR')} />
          <ScopeHotspot label="UL" position={[3.2, 1.2, -2.8]} onClick={() => onSelectScope('UL')} />
          <ScopeHotspot label="LR" position={[-3.2, -1.2, -2.8]} onClick={() => onSelectScope('LR')} />
          <ScopeHotspot label="LL" position={[3.2, -1.2, -2.8]} onClick={() => onSelectScope('LL')} />
          <ScopeHotspot label="Full" position={[0, 0, -3.2]} onClick={() => onSelectScope('FULL')} emphasized />
        </>
      )}
      {activeTooth && (
        <DentitionTooltip
          tooth={activeTooth}
          archPose={activePositions[activeTooth.fdi]}
          findings={findingsByTooth[activeTooth.fdi] || []}
          diagnoses={toothDiagnoses[activeTooth.fdi]}
          isImplant={implantTeeth.has(activeTooth.fdi)}
          allEntries={allEntries}
          toothNotes={toothNotes}
        />
      )}
    </group>
  )
}

function ScopeHotspot({
  label,
  position,
  onClick,
  emphasized = false,
}: {
  label: string
  position: [number, number, number]
  onClick: () => void
  emphasized?: boolean
}) {
  return (
    <Html position={position} transform occlude zIndexRange={[220, 80]}>
      <button
        type="button"
        onClick={onClick}
        style={{
          cursor: 'pointer',
          minWidth: emphasized ? 64 : 44,
          height: emphasized ? 30 : 28,
          borderRadius: emphasized ? 16 : 14,
          border: '1px solid rgba(255,255,255,0.42)',
          background: emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)',
          color: '#f8fafc',
          fontSize: emphasized ? 12 : 11,
          fontWeight: 700,
          padding: '0 12px',
          boxShadow: '0 4px 14px rgba(2, 6, 23, 0.22)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.background = emphasized ? 'rgba(15, 23, 42, 0.88)' : 'rgba(30, 41, 59, 0.78)'
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 6, 23, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.background = emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)'
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(2, 6, 23, 0.22)'
        }}
      >
        {label}
      </button>
    </Html>
  )
}

// ══════════════════════════════════════════════════════════════
// DentitionTooltip — camera-relative tooltip that stays fixed on
// screen regardless of tooth rotation. Only the leader line updates.
// ══════════════════════════════════════════════════════════════
function DentitionTooltip({
  tooth, archPose, findings, diagnoses, isImplant, allEntries, toothNotes,
}: {
  tooth: ToothDef
  archPose: ArchPose
  findings: Finding[]
  diagnoses: Set<string> | undefined
  isImplant: boolean
  allEntries?: ToothEntry[]
  toothNotes?: Record<string, string>
}) {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const connectorRef = useRef<HTMLDivElement | null>(null)
  const { camera, gl, size } = useThree()
  const violetAccent = {
    stroke: '#8B5CF6',
    badgeBg: '#8B5CF6',
    badgeText: '#ffffff',
  } as const

  // With the narrow side panel and wider 3D canvas, horizontal space on either
  // side of the arch is limited. Place tooltip ABOVE maxillary teeth and BELOW
  // mandibular teeth so it always lands in the whitespace outside the arch —
  // never behind a tooth.
  const isMax = tooth.arch === 'maxillary'
  // Anchor near the outer edge of the tooth rather than its center, then keep
  // a consistent visual gap in screen-space via dynamic transform.
  const tooltipAnchorWorld = useMemo(() => {
    if (!archPose) return new THREE.Vector3()
    return new THREE.Vector3(
      archPose.position[0],
      archPose.position[1] + (isMax ? 0.72 : -0.72),
      archPose.position[2],
    )
  }, [archPose, isMax])

  useFrame(() => {
    const el = tooltipRef.current
    if (!el) return
    const canvasRect = gl.domElement.getBoundingClientRect()
    const projected = tooltipAnchorWorld.clone().project(camera)
    // Hide if clipped behind camera/frustum.
    if (projected.z < -1 || projected.z > 1) {
      el.style.opacity = "0"
      return
    }
    el.style.opacity = "1"

    const anchorX = canvasRect.left + (projected.x * 0.5 + 0.5) * size.width
    const anchorY = canvasRect.top + (-projected.y * 0.5 + 0.5) * size.height
    const gapPx = 30
    const edgePad = 10
    const rect = el.getBoundingClientRect()

    // Prefer above for maxillary, below for mandibular; auto-flip if out of bounds.
    let placeTop = isMax
    const topY = anchorY - gapPx - rect.height
    const bottomY = anchorY + gapPx
    if (placeTop && topY < canvasRect.top + edgePad) placeTop = false
    if (!placeTop && bottomY + rect.height > canvasRect.bottom - edgePad) placeTop = true

    // Keep tooltip inside canvas horizontally, while staying close to anchor.
    const naturalLeft = anchorX - rect.width / 2
    const clampedLeft = Math.min(
      Math.max(naturalLeft, canvasRect.left + edgePad),
      canvasRect.right - edgePad - rect.width,
    )
    const dx = clampedLeft - naturalLeft

    el.style.transform = placeTop
      ? `translate(calc(-50% + ${dx}px), calc(-100% - ${gapPx}px))`
      : `translate(calc(-50% + ${dx}px), ${gapPx}px)`
    el.style.transformOrigin = placeTop ? "center bottom" : "center top"

    // Screen-space dashed connector:
    // - angle adapts with tooltip clamp/placement
    // - extends slightly behind the card for a "connected" look
    const connector = connectorRef.current
    if (connector) {
      const cardW = rect.width
      const cardH = rect.height
      const targetX = dx
      const targetY = placeTop ? (-gapPx - 12) : (gapPx + 12)
      const len = Math.hypot(targetX, targetY)
      const angle = Math.atan2(targetY, targetX)
      // Keep at least a minimal visible connector length.
      const width = Math.max(18, len)
      connector.style.width = `${width}px`
      connector.style.transform = `translateY(-50%) rotate(${angle}rad)`
    }
  })

  // Responsive sizing for smaller canvases.
  const isCompact = size.width < 980
  const isTiny = size.width < 760
  const cardMinW = isTiny ? 200 : (isCompact ? 220 : 240)
  const cardMaxW = isTiny ? 260 : (isCompact ? 290 : 320)
  const cardPadding = isTiny ? '8px 10px' : '10px 13px'
  const titleSize = isTiny ? 12 : 13
  const bodySize = isTiny ? 9 : 10
  const sectionPad = isTiny ? '6px 8px' : '7px 9px'

  // Derive data for full overview sections.
  const diagLabels: string[] = []
  if (diagnoses) { for (const d of diagnoses) diagLabels.push(d) }
  if (isImplant && !diagLabels.includes('Implant')) diagLabels.push('Implant')

  const toothEntries = useMemo(() => (allEntries ?? []).filter(e => e.toothFdi === tooth.fdi), [allEntries, tooth.fdi])
  const findingEntries = toothEntries.filter((e) => e.kind === 'finding')
  const procedureEntries = toothEntries.filter((e) => e.kind === 'procedure')
  const plannedEntries = toothEntries.filter((e) => e.kind === 'planned')
  const symptomEntries = toothEntries.filter((e) => e.kind === 'symptom')
  const noteText = toothNotes?.[tooth.fdi] ?? ''

  // Findings summary = legacy findings + entity-centric finding entries.
  const groupedFindings = useMemo(() => {
    const m = new Map<string, string[]>()
    const push = (zoneId: string, label: string) => {
      const list = m.get(zoneId) || []
      if (!list.includes(label)) list.push(label)
      m.set(zoneId, list)
    }
    for (const f of findings) push(f.zoneId, f.type)
    for (const entry of findingEntries) {
      const surfaces = entry.surfaces.length > 0 ? entry.surfaces : ['whole']
      for (const surface of surfaces) push(surface, entry.name)
    }
    return Array.from(m.entries())
  }, [findings, findingEntries])

  const treatmentHistory = [...diagLabels].filter(Boolean)
  const procedureSummary = [...procedureEntries, ...plannedEntries, ...symptomEntries]
  // Has any content across all 4 sections?
  const hasContent =
    treatmentHistory.length > 0 ||
    groupedFindings.length > 0 ||
    procedureSummary.length > 0 ||
    noteText.length > 0

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: isTiny ? '8px' : '9px', textTransform: 'uppercase', letterSpacing: '0.6px',
    color: '#cbd5e1', marginBottom: '4px', fontWeight: 600,
  }

  return (
    <>
      <Html
        position={[tooltipAnchorWorld.x, tooltipAnchorWorld.y, tooltipAnchorWorld.z]}
        style={{ pointerEvents: 'none' }}
        zIndexRange={[500, 300]}
      >
        <div
          ref={connectorRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 0,
            borderTop: '1px dashed rgba(148, 163, 184, 0.45)',
            transformOrigin: '0 50%',
            zIndex: 0,
          }}
        />
        <div
          ref={tooltipRef}
          style={{
            transform: isMax ? "translate(-50%, calc(-100% - 12px))" : "translate(-50%, 12px)",
            transformOrigin: isMax ? "center bottom" : "center top",
            background: 'rgba(0, 0, 0, 0.78)', color: '#fff',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            padding: cardPadding, borderRadius: '8px', fontSize: isTiny ? '11px' : '12px',
            borderLeft: `3px solid ${violetAccent.stroke}`,
            fontFamily: "'Inter', sans-serif",
            minWidth: `${cardMinW}px`, maxWidth: `${cardMaxW}px`, whiteSpace: 'normal',
            boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
            textAlign: 'left',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 120ms ease-out, opacity 120ms ease-out',
          }}
        >
            {/* Heading: T{fdi} · Full Name */}
            <div style={{
              fontWeight: 700, fontSize: `${titleSize}px`,
              paddingBottom: hasContent ? '8px' : 0,
              marginBottom: hasContent ? '10px' : 0,
              borderBottom: hasContent ? '1px solid rgba(255,255,255,0.1)' : 'none',
              display: 'flex', alignItems: 'center', gap: '7px', lineHeight: 1.3,
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                color: violetAccent.badgeText, background: violetAccent.badgeBg, borderRadius: '4px',
                padding: isTiny ? '1px 5px' : '1px 6px', fontSize: isTiny ? '11px' : '12px', fontWeight: 700, flexShrink: 0,
              }}>T{tooth.fdi}</span>
              <span style={{ fontWeight: 600, color: '#f1f5f9', flexShrink: 0 }}>{QUADRANT_LABELS[tooth.quadrant]} {tooth.name}</span>
            </div>

            {/* Section 1: Treatment History */}
            {treatmentHistory.length > 0 && (
              <div style={{
                marginBottom: (groupedFindings.length > 0 || procedureSummary.length > 0 || noteText) ? '8px' : 0,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
              }}>
                <div style={sectionHeadingStyle}>Treatment History</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {treatmentHistory.map(d => (
                    <span key={d} style={{
                      fontSize: `${bodySize}px`, fontWeight: 600, padding: isTiny ? '2px 6px' : '2px 8px', borderRadius: '10px',
                      background: 'rgba(148,163,184,0.3)', color: '#f1f5f9',
                    }}>{d}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Findings (surface findings) */}
            {groupedFindings.length > 0 && (
              <div style={{
                marginBottom: (procedureSummary.length > 0 || noteText) ? '8px' : 0,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
              }}>
                <div style={sectionHeadingStyle}>Findings</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {groupedFindings.map(([zid, types]) => {
                    const zc = ZONE_INFO[zid as keyof typeof ZONE_INFO]?.color || '#888'
                    const zl = zid === 'whole' ? 'Whole Tooth' : getZoneLabel(zid as any, tooth.arch, tooth.position)
                    return (
                      <div key={zid} style={{ fontSize: `${bodySize}px`, display: 'flex', gap: '8px', alignItems: 'baseline', lineHeight: 1.35 }}>
                        <span style={{
                          width: '7px', height: '7px', borderRadius: '50%', background: zc,
                          flexShrink: 0, marginTop: '3px',
                        }} />
                        <span style={{ fontWeight: 600, color: zc, minWidth: '56px' }}>{zl}</span>
                        <span style={{ color: '#e2e8f0' }}>{types.join(', ')}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Section 3: Procedures / Plan / Symptoms */}
            {procedureSummary.length > 0 && (
              <div style={{
                marginBottom: noteText ? '8px' : 0,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
              }}>
                <div style={sectionHeadingStyle}>Procedures</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {procedureSummary.map((entry) => (
                    <span
                      key={entry.id}
                      style={{
                        fontSize: `${bodySize}px`,
                        fontWeight: 600,
                        padding: isTiny ? '2px 6px' : '2px 8px',
                        borderRadius: '10px',
                        background: entry.kind === 'planned' ? 'rgba(59,130,246,0.22)' : entry.kind === 'symptom' ? 'rgba(236,72,153,0.22)' : 'rgba(148,163,184,0.3)',
                        color: '#f1f5f9',
                      }}
                    >
                      {entry.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Notes */}
            {noteText && (
              <div style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: sectionPad,
              }}>
                <div style={sectionHeadingStyle}>Notes</div>
                <div style={{ fontSize: `${bodySize}px`, color: '#e2e8f0', fontStyle: 'italic', lineHeight: 1.4 }}>
                  &ldquo;{noteText.length > (isTiny ? 64 : 80) ? noteText.slice(0, isTiny ? 64 : 80) + '…' : noteText}&rdquo;
                </div>
              </div>
            )}

            {/* Empty state */}
            {!hasContent && (
              <div style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '8px 0' }}>
                Click on the tooth to start adding details
              </div>
            )}
        </div>
      </Html>
    </>
  )
}
