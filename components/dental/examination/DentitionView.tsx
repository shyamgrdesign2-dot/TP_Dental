"use client"

import { memo, useMemo, useRef, useState, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, Html, Center } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { TEETH, PEDIATRIC_TEETH, ARCH_POSITIONS, PEDIATRIC_ARCH_POSITIONS, ZONE_INFO, getZoneLabel, QUADRANT_LABELS, type ToothDef, type Finding, type ToothEntry, type PatientType, type ArchPose } from './types'
import {
  cloneSceneWithUniqueMaterials,
  injectShader,
  ImplantScrew,
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
  const [shaderReady, setShaderReady] = useState(false)

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
    setShaderReady(false)
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

      // Collect materials and inject the identical shader
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
        // Force immediate recompilation so we don't show partially-updated tooth colors.
        mat.needsUpdate = true
      }

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
      setShaderReady(true)
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
  }, [clonedScene, tooth, isImplant, isMissing, isCrown, isRCT, isBridge, isDenture])

  // Hover glow via useFrame — no React re-renders
  const hoverRef = useRef(false)
  hoverRef.current = isHovered

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.traverse((obj) => {
      const m = obj as THREE.Mesh
      if (m.isMesh && m.material && !Array.isArray(m.material)) {
        const mat = m.material as THREE.MeshStandardMaterial
        // Skip metallic implant materials — only glow the tooth itself
        if (mat.metalness > 0.5) return
        if (hoverRef.current) {
          mat.emissiveIntensity = Math.min(mat.emissiveIntensity + 0.08, 0.35)
          mat.emissive.set('#4a9eff')
        } else {
          mat.emissiveIntensity = Math.max(mat.emissiveIntensity - 0.06, 0)
          if (mat.emissiveIntensity < 0.01) mat.emissive.set('#000000')
        }
      }
    })
  })

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
            visible={shaderReady}
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
  const tooltipGroupRef = useRef<THREE.Group>(null!)
  const lineRef = useRef<any>(null)
  const { camera } = useThree()

  // With the narrow side panel and wider 3D canvas, horizontal space on either
  // side of the arch is limited. Place tooltip ABOVE maxillary teeth and BELOW
  // mandibular teeth so it always lands in the whitespace outside the arch —
  // never behind a tooth.
  const isMax = tooth.arch === 'maxillary'
  const toothOnScreenRight = tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left'
  // Small horizontal nudge toward the tooth's side so the leader line stays short
  const offsetX = toothOnScreenRight ? 1.1 : -1.1
  // Keep tooltip closer to tooth so it stays inside the visible canvas area.
  const offsetY = isMax ? 1.18 : -1.18
  const offsetZ = -8.2
  // Anchor tooltip horizontally on the tooth's side; keep it below/above vertically
  const tooltipTransform = "translate(-50%, " + (isMax ? "0%" : "-100%") + ")"
  const tooltipOrigin = isMax ? "center top" : "center bottom"

  const toothWorldPos = useMemo(() => {
    if (!archPose) return new THREE.Vector3()
    return new THREE.Vector3(archPose.position[0], archPose.position[1], archPose.position[2])
  }, [archPose])

  useFrame(() => {
    if (!tooltipGroupRef.current) return
    // Place tooltip at a fixed offset in CAMERA space — so it stays put on
    // screen even as the user rotates the camera around the dentition.
    const localPos = new THREE.Vector3(offsetX, offsetY, offsetZ)
    localPos.applyMatrix4(camera.matrixWorld)
    tooltipGroupRef.current.position.copy(localPos)

    // Update the leader line endpoints: tooth center → tooltip anchor
    if (lineRef.current?.geometry) {
      const geo = lineRef.current.geometry
      const pts = geo.attributes.position
      pts.setXYZ(0, toothWorldPos.x, toothWorldPos.y, toothWorldPos.z)
      pts.setXYZ(1, localPos.x, localPos.y, localPos.z)
      pts.needsUpdate = true
      geo.computeBoundingSphere()
      // Recompute line distances for dashed rendering
      if (lineRef.current.computeLineDistances) lineRef.current.computeLineDistances()
    }
  })

  // Group findings by zone — one row per surface with all its diagnoses comma-separated
  const grouped = useMemo(() => {
    const m = new Map<string, string[]>()
    for (const f of findings) {
      const list = m.get(f.zoneId) || []
      if (!list.includes(f.type)) list.push(f.type)
      m.set(f.zoneId, list)
    }
    return Array.from(m.entries())
  }, [findings])

  // Derive data for 4-section tooltip
  const diagLabels: string[] = []
  if (diagnoses) { for (const d of diagnoses) diagLabels.push(d) }
  if (isImplant && !diagLabels.includes('Implant')) diagLabels.push('Implant')

  const toothEntries = useMemo(() => (allEntries ?? []).filter(e => e.toothFdi === tooth.fdi), [allEntries, tooth.fdi])
  const procedures = toothEntries.filter(e => e.kind === 'procedure')
  const planned = toothEntries.filter(e => e.kind === 'planned')
  const noteText = toothNotes?.[tooth.fdi] ?? ''

  // Treatment History = diagnoses + procedures
  const treatmentHistory = [...diagLabels, ...procedures.map(p => p.name)].filter(Boolean)
  // Has any content across all 4 sections?
  const hasContent = treatmentHistory.length > 0 || grouped.length > 0 || planned.length > 0 || noteText.length > 0

  const sectionHeadingStyle: React.CSSProperties = {
    fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.6px',
    color: '#cbd5e1', marginBottom: '4px', fontWeight: 600,
  }

  return (
    <>
      {/* Leader line: updates endpoints every frame */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 0, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#64748b" transparent opacity={0.6} />
      </line>

      <group ref={tooltipGroupRef}>
        <Html
          style={{ pointerEvents: 'none' }}
          zIndexRange={[500, 300]}
        >
          <div style={{
            transform: tooltipTransform,
            transformOrigin: tooltipOrigin,
            background: 'rgba(15, 23, 42, 0.88)', color: '#fff',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            padding: hasContent ? '12px 14px' : '10px 13px', borderRadius: '10px', fontSize: '12px',
            fontFamily: "'Inter', sans-serif",
            minWidth: '240px', maxWidth: '320px', whiteSpace: 'normal',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
            textAlign: 'left',
          }}>
            {/* Heading: T{fdi} · Full Name */}
            <div style={{
              fontWeight: 700, fontSize: '13px',
              paddingBottom: hasContent ? '8px' : 0,
              marginBottom: hasContent ? '10px' : 0,
              borderBottom: hasContent ? '1px solid rgba(255,255,255,0.1)' : 'none',
              display: 'flex', alignItems: 'center', gap: '7px', lineHeight: 1.3,
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                color: '#475569', background: '#f1f5f9', borderRadius: '4px',
                padding: '1px 6px', fontSize: '12px', fontWeight: 700, flexShrink: 0,
              }}>T{tooth.fdi}</span>
              <span style={{ fontWeight: 600, color: '#f1f5f9', flexShrink: 0 }}>{QUADRANT_LABELS[tooth.quadrant]} {tooth.name}</span>
            </div>

            {/* Section 1: Treatment History */}
            {treatmentHistory.length > 0 && (
              <div style={{
                marginBottom: (grouped.length > 0 || planned.length > 0 || noteText) ? '8px' : 0,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '7px 9px',
              }}>
                <div style={sectionHeadingStyle}>Treatment History</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {treatmentHistory.map(d => (
                    <span key={d} style={{
                      fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px',
                      background: 'rgba(148,163,184,0.3)', color: '#f1f5f9',
                    }}>{d}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Findings (surface findings) */}
            {grouped.length > 0 && (
              <div style={{
                marginBottom: (planned.length > 0 || noteText) ? '8px' : 0,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '7px 9px',
              }}>
                <div style={sectionHeadingStyle}>Findings</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {grouped.map(([zid, types]) => {
                    const zc = ZONE_INFO[zid as keyof typeof ZONE_INFO]?.color || '#888'
                    const zl = getZoneLabel(zid as any, tooth.arch, tooth.position)
                    return (
                      <div key={zid} style={{ fontSize: '10px', display: 'flex', gap: '8px', alignItems: 'baseline', lineHeight: 1.35 }}>
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

            {/* Section 3: Procedures */}
            {planned.length > 0 && (
              <div style={{
                marginBottom: noteText ? '8px' : 0,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '7px 9px',
              }}>
                <div style={sectionHeadingStyle}>Procedures</div>
                <div style={{ fontSize: '10px', color: '#e2e8f0', lineHeight: 1.4 }}>
                  {planned.map(p => p.name).join(', ')}
                </div>
              </div>
            )}

            {/* Section 4: Notes */}
            {noteText && (
              <div style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '7px 9px',
              }}>
                <div style={sectionHeadingStyle}>Notes</div>
                <div style={{ fontSize: '10px', color: '#e2e8f0', fontStyle: 'italic', lineHeight: 1.4 }}>
                  &ldquo;{noteText.length > 80 ? noteText.slice(0, 80) + '…' : noteText}&rdquo;
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
      </group>
    </>
  )
}
