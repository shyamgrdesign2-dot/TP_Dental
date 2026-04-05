"use client"

import type { ToothDef, ViewMode } from './types'
import { TEETH, DIAGNOSIS_COLORS } from './types'

interface ToothSelectorProps {
  selectedTooth: ToothDef
  onSelectTooth: (tooth: ToothDef) => void
  toothDiagnoses?: Record<string, Set<string>>
  viewMode?: ViewMode
  onBackToDentition?: () => void
}

export function ToothSelector({ selectedTooth, onSelectTooth, toothDiagnoses, viewMode, onBackToDentition }: ToothSelectorProps) {
  const upperRight = TEETH.filter(t => t.quadrant === 'upper-right').sort((a, b) => b.position - a.position)
  const upperLeft = TEETH.filter(t => t.quadrant === 'upper-left').sort((a, b) => a.position - b.position)
  const lowerLeft = TEETH.filter(t => t.quadrant === 'lower-left').sort((a, b) => a.position - b.position)
  const lowerRight = TEETH.filter(t => t.quadrant === 'lower-right').sort((a, b) => b.position - a.position)

  return (
    <div className="tooth-selector">
      <div className="tooth-chart">
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
  // Get first diagnosis color for indicator dot
  let diagColor: string | null = null
  if (diagnoses && diagnoses.size > 0) {
    for (const diag of ['Crown', 'Bridge', 'Implant', 'RCT', 'Denture', 'Missing']) {
      if (diagnoses.has(diag)) {
        diagColor = DIAGNOSIS_COLORS[diag] || null
        break
      }
    }
  }

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
