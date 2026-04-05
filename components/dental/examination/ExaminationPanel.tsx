"use client"

import type { ZoneId, Finding, ToothDef } from './types'
import { ZONE_INFO, ALL_ZONES, DIAGNOSES, TOOTH_DIAGNOSES, getZoneLabel } from './types'

interface ExaminationPanelProps {
  selectedZone: ZoneId | null
  findings: Finding[]
  onAddFinding: (zoneId: ZoneId, type: string) => void
  onRemoveFinding: (id: string) => void
  onUpdateNotes: (zoneId: ZoneId, notes: string) => void
  zoneNotes: Record<string, string>
  tooth: ToothDef
  isImplant: boolean
  onToggleImplant: () => void
  toothDiagnoses: Set<string>
  onToggleToothDiagnosis: (diagnosis: string) => void
  toothNotes: string
  onUpdateToothNotes: (notes: string) => void
}

export function ExaminationPanel({
  selectedZone, findings, onAddFinding, onRemoveFinding, onUpdateNotes, zoneNotes, tooth,
  isImplant, onToggleImplant, toothDiagnoses, onToggleToothDiagnosis, toothNotes, onUpdateToothNotes,
}: ExaminationPanelProps) {
  const zoneFindings = selectedZone ? findings.filter((f) => f.zoneId === selectedZone) : []
  const activeDiagnoses = new Set(zoneFindings.map((f) => f.type))
  const zone = selectedZone ? ZONE_INFO[selectedZone] : null
  const zoneLabel = selectedZone ? getZoneLabel(selectedZone, tooth.arch, tooth.position) : ''

  const availableZones = isImplant ? ALL_ZONES.filter(z => z !== 'cervical' && z !== 'root') : ALL_ZONES
  const zonesWithData = availableZones.filter(
    (z) => findings.some((f) => f.zoneId === z) || (zoneNotes[z] && zoneNotes[z].trim())
  )

  const handleToothDiagnosisClick = (diagnosis: string) => {
    if (diagnosis === 'Implant') {
      onToggleImplant()
    } else {
      onToggleToothDiagnosis(diagnosis)
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h1>Tooth Examination</h1>
        <p>#{tooth.fdi} — Select diagnoses or tap zones for surface findings</p>
      </div>

      {/* ── Tooth-Level Diagnosis ── */}
      <div className="tooth-diagnosis-section">
        <div className="diagnosis-label">Tooth Diagnosis</div>
        <div className="diagnosis-chips">
          {TOOTH_DIAGNOSES.map((diagnosis) => {
            const isActive = diagnosis === 'Implant' ? isImplant : toothDiagnoses.has(diagnosis)
            return (
              <button
                key={diagnosis}
                className={`chip ${isActive ? 'active' : ''}`}
                style={isActive ? { background: '#4a6fa5', borderColor: '#4a6fa5' } : undefined}
                onClick={() => handleToothDiagnosisClick(diagnosis)}
              >
                {diagnosis}
              </button>
            )
          })}
        </div>
        <textarea
          className="notes-area tooth-notes"
          placeholder="General notes for this tooth..."
          value={toothNotes}
          onChange={(e) => onUpdateToothNotes(e.target.value)}
        />
      </div>

      {/* ── Zone Examination ── */}
      <div className="zone-diagnosis-section">
        <div className="section-divider" />
        {toothDiagnoses.has('Missing') ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8 2 6 5 6 9c0 3 1 5 2 7s2 4 2 6h4c0-2 1-4 2-6s2-4 2-7c0-4-2-7-6-7z" />
              <line x1="4" y1="4" x2="20" y2="20" />
            </svg>
            <p>Missing tooth — no surfaces to examine.<br />Surface findings are disabled.</p>
          </div>
        ) : !selectedZone ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8 2 6 5 6 9c0 3 1 5 2 7s2 4 2 6h4c0-2 1-4 2-6h4c0-2 1-4 2-6s2-4 2-7c0-4-2-7-6-7z" />
              <path d="M9 22h6" /><path d="M10 2c0 0-1 3 0 5" />
            </svg>
            <p>Click on the tooth or use the zone<br />navigator to add surface findings</p>
          </div>
        ) : (
          <div className="findings-form visible">
            <h3>
              <span className="dot" style={{ background: zone!.color }} />
              {zoneLabel} Surface
            </h3>

            <div className="diagnosis-label">Surface Diagnosis</div>
            <div className="diagnosis-chips">
              {DIAGNOSES.map((diagnosis) => {
                const isActive = activeDiagnoses.has(diagnosis)
                const finding = zoneFindings.find((f) => f.type === diagnosis)
                return (
                  <button
                    key={diagnosis}
                    className={`chip ${isActive ? 'active' : ''}`}
                    style={isActive ? { background: zone!.color, borderColor: zone!.color } : undefined}
                    onClick={() => {
                      if (isActive && finding) onRemoveFinding(finding.id)
                      else onAddFinding(selectedZone, diagnosis)
                    }}
                  >
                    {diagnosis}
                  </button>
                )
              })}
            </div>

            <div className="notes-label">Surface Notes</div>
            <textarea
              className="notes-area"
              placeholder={`Enter findings for the ${zoneLabel} surface...`}
              value={zoneNotes[selectedZone] || ''}
              onChange={(e) => onUpdateNotes(selectedZone, e.target.value)}
            />
          </div>
        )}
      </div>

      {zonesWithData.length > 0 && (
        <div className="summary">
          <h4>Examination Summary</h4>
          {zonesWithData.map((z) => {
            const zf = findings.filter((f) => f.zoneId === z)
            const notes = zoneNotes[z] || ''
            return (
              <div key={z} className="summary-item" style={{ borderLeftColor: ZONE_INFO[z].color }}>
                <div className="zone-name">{getZoneLabel(z, tooth.arch, tooth.position)}</div>
                {zf.length > 0 && (
                  <div className="zone-diagnoses">
                    {zf.map((f) => <span key={f.id}>{f.type}</span>)}
                  </div>
                )}
                {notes.trim() && <div className="zone-notes">{notes.trim()}</div>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
