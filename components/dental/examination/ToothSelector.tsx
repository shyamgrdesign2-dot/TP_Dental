"use client"

import type { ReactNode } from 'react'
import type { ToothDef, ViewMode, PatientType } from './types'
import { TEETH, PEDIATRIC_TEETH } from './types'

interface ToothSelectorProps {
  selectedTooth: ToothDef
  patientType?: PatientType
  onSelectTooth: (tooth: ToothDef) => void
  toothDiagnoses?: Record<string, Set<string>>
  viewMode?: ViewMode
  onBackToDentition?: () => void
  surfaceSelector?: ReactNode
}

export function ToothSelector({
  selectedTooth,
  patientType = 'adult',
  onSelectTooth,
  toothDiagnoses,
  viewMode,
  onBackToDentition,
  surfaceSelector,
}: ToothSelectorProps) {
  const activeTeeth = patientType === 'adult'
    ? TEETH
    : patientType === 'pediatric'
      ? PEDIATRIC_TEETH
      : [...TEETH, ...PEDIATRIC_TEETH]
  
  const upperRight = activeTeeth.filter(t => t.quadrant === 'upper-right').sort((a, b) => b.position - a.position)
  const upperLeft = activeTeeth.filter(t => t.quadrant === 'upper-left').sort((a, b) => a.position - b.position)
  const lowerLeft = activeTeeth.filter(t => t.quadrant === 'lower-left').sort((a, b) => a.position - b.position)
  const lowerRight = activeTeeth.filter(t => t.quadrant === 'lower-right').sort((a, b) => b.position - a.position)
  const adultTeeth = patientType === 'mixed' ? TEETH : []
  const pediatricTeeth = patientType === 'mixed' ? PEDIATRIC_TEETH : []

  const adultUpperRight = adultTeeth.filter(t => t.quadrant === 'upper-right').sort((a, b) => b.position - a.position)
  const adultUpperLeft = adultTeeth.filter(t => t.quadrant === 'upper-left').sort((a, b) => a.position - b.position)
  const adultLowerLeft = adultTeeth.filter(t => t.quadrant === 'lower-left').sort((a, b) => a.position - b.position)
  const adultLowerRight = adultTeeth.filter(t => t.quadrant === 'lower-right').sort((a, b) => b.position - a.position)
  const pedUpperRight = pediatricTeeth.filter(t => t.quadrant === 'upper-right').sort((a, b) => b.position - a.position)
  const pedUpperLeft = pediatricTeeth.filter(t => t.quadrant === 'upper-left').sort((a, b) => a.position - b.position)
  const pedLowerLeft = pediatricTeeth.filter(t => t.quadrant === 'lower-left').sort((a, b) => a.position - b.position)
  const pedLowerRight = pediatricTeeth.filter(t => t.quadrant === 'lower-right').sort((a, b) => b.position - a.position)

  return (
    <div className="tooth-selector">
      {surfaceSelector && (
        <div className="tooth-selector-surface">
          {surfaceSelector}
        </div>
      )}
      <div className="tooth-chart">
        {patientType !== 'mixed' ? (
          <>
            <div className="tooth-chart-row">
              <div className="quadrant-label">UR</div>
              <div className="tooth-quadrant">
                {upperRight.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="chart-midline" />
              <div className="tooth-quadrant">
                {upperLeft.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="quadrant-label">UL</div>
            </div>
            <div className="chart-horizontal-line" />
            <div className="tooth-chart-row">
              <div className="quadrant-label">LR</div>
              <div className="tooth-quadrant">
                {lowerRight.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="chart-midline" />
              <div className="tooth-quadrant">
                {lowerLeft.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="quadrant-label">LL</div>
            </div>
          </>
        ) : (
          <>
            {/* Adult upper arch */}
            <div className="tooth-chart-row">
              <div className="quadrant-label">UR</div>
              <div className="tooth-quadrant">
                {adultUpperRight.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="chart-midline" />
              <div className="tooth-quadrant">
                {adultUpperLeft.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="quadrant-label">UL</div>
            </div>
            <div className="chart-horizontal-line" />
            {/* Pediatric upper arch */}
            <div className="tooth-chart-row">
              <div className="quadrant-label">UR</div>
              <div className="tooth-quadrant">
                {pedUpperRight.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="chart-midline" />
              <div className="tooth-quadrant">
                {pedUpperLeft.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="quadrant-label">UL</div>
            </div>
            <div className="chart-horizontal-line" />
            {/* Pediatric lower arch */}
            <div className="tooth-chart-row">
              <div className="quadrant-label">LR</div>
              <div className="tooth-quadrant">
                {pedLowerRight.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="chart-midline" />
              <div className="tooth-quadrant">
                {pedLowerLeft.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="quadrant-label">LL</div>
            </div>
            <div className="chart-horizontal-line" />
            {/* Adult lower arch */}
            <div className="tooth-chart-row">
              <div className="quadrant-label">LR</div>
              <div className="tooth-quadrant">
                {adultLowerRight.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="chart-midline" />
              <div className="tooth-quadrant">
                {adultLowerLeft.map(t => (
                  <ToothPick key={t.fdi} tooth={t} selected={selectedTooth.fdi === t.fdi} onClick={onSelectTooth} diagnoses={toothDiagnoses?.[t.fdi]} />
                ))}
              </div>
              <div className="quadrant-label">LL</div>
            </div>
          </>
        )}
      </div>
      {/* "View All Teeth" button removed — replaced by mini dentition preview widget */}
    </div>
  )
}

function ToothPick({ tooth, selected, onClick, diagnoses }: {
  tooth: ToothDef
  selected: boolean
  onClick: (t: ToothDef) => void
  diagnoses?: Set<string>
}) {
  // Keep indicator color simple and consistent with the diagnosis state style.
  const diagColor = diagnoses?.size
    ? (diagnoses.has('Missing') ? '#ef4444' : '#8b5cf6')
    : null

  return (
    <button
      className={`tooth-pick ${selected ? 'active' : ''} ${diagnoses?.size ? 'has-diagnosis' : ''}`}
      onClick={() => onClick(tooth)}
      title={`${tooth.name} (${tooth.fdi})`}
    >
      {tooth.fdi}
      {diagColor && (
        <span className="tooth-pick-dot" style={{ background: diagColor }} />
      )}
    </button>
  )
}
