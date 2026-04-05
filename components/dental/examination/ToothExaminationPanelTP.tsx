"use client"

/**
 * ToothExaminationPanelTP — TP-native rewrite of the original ExaminationPanel.
 * Preserves full functionality:
 *   • Tooth-level diagnosis chips (Implant, Missing, RCT, Crown, Bridge, Denture)
 *   • Zone selector + surface diagnosis chips (Caries, Crack, Fracture, etc.)
 *   • Tooth notes + per-zone notes
 *   • Surface findings summary grouped by zone
 * Styled with TP design tokens — no more .panel/.chip legacy CSS.
 */

import React from "react"
import type { ZoneId, Finding, ToothDef } from "./types"
import { ZONE_INFO, ALL_ZONES, DIAGNOSES, TOOTH_DIAGNOSES, getZoneLabel } from "./types"
import { Trash } from "iconsax-reactjs"

interface Props {
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

export function ToothExaminationPanelTP({
  selectedZone, findings, onAddFinding, onRemoveFinding, onUpdateNotes, zoneNotes, tooth,
  isImplant, onToggleImplant, toothDiagnoses, onToggleToothDiagnosis, toothNotes, onUpdateToothNotes,
}: Props) {
  const zoneFindings = selectedZone ? findings.filter((f) => f.zoneId === selectedZone) : []
  const activeSurfaceDiags = new Set(zoneFindings.map((f) => f.type))
  const zone = selectedZone ? ZONE_INFO[selectedZone] : null
  const zoneLabel = selectedZone ? getZoneLabel(selectedZone, tooth.arch, tooth.position) : ""
  const isMissing = toothDiagnoses.has("Missing")

  const availableZones = isImplant ? ALL_ZONES.filter((z) => z !== "cervical" && z !== "root") : ALL_ZONES
  const zonesWithData = availableZones.filter(
    (z) => findings.some((f) => f.zoneId === z) || (zoneNotes[z] && zoneNotes[z].trim())
  )

  const handleToothDiagnosisClick = (d: string) => {
    if (d === "Implant") onToggleImplant()
    else onToggleToothDiagnosis(d)
  }

  return (
    <div className="rounded-[10px] border border-tp-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-tp-slate-100 bg-gradient-to-r from-tp-blue-50/60 to-white px-[12px] py-[10px]">
        <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.6px] text-tp-blue-700">
          Tooth Examination
        </p>
        <p className="mt-[1px] font-sans text-[11px] text-tp-slate-500">
          #{tooth.fdi} · Pick diagnoses or tap a surface for findings
        </p>
      </header>

      {/* Tooth-level diagnosis chips */}
      <section className="border-b border-tp-slate-100 px-[12px] py-[10px]">
        <p className="mb-[6px] font-sans text-[10px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">
          Primary Diagnosis
        </p>
        <div className="flex flex-wrap gap-[5px]">
          {TOOTH_DIAGNOSES.map((d) => {
            const active = d === "Implant" ? isImplant : toothDiagnoses.has(d)
            return (
              <button
                key={d}
                type="button"
                onClick={() => handleToothDiagnosisClick(d)}
                className={`inline-flex h-[26px] items-center rounded-[14px] border px-[10px] font-sans text-[11px] font-semibold transition-colors ${
                  active
                    ? "border-transparent bg-tp-blue-500 text-white shadow-sm"
                    : "border-tp-slate-200 bg-white text-tp-slate-700 hover:border-tp-blue-400 hover:text-tp-blue-700"
                }`}
              >
                {d}
              </button>
            )
          })}
        </div>
        <textarea
          value={toothNotes}
          onChange={(e) => onUpdateToothNotes(e.target.value)}
          placeholder="General notes for this tooth…"
          className="mt-[8px] h-[48px] w-full resize-none rounded-[6px] border border-tp-slate-200 bg-tp-slate-50 px-[10px] py-[7px] font-sans text-[11px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:bg-white focus:outline-none"
        />
      </section>

      {/* Zone (surface) examination */}
      {isMissing ? (
        <section className="px-[12px] py-[20px] text-center">
          <p className="font-sans text-[11px] font-semibold text-tp-slate-600">Missing tooth</p>
          <p className="mt-[2px] font-sans text-[10px] text-tp-slate-400">
            Surface findings are disabled for missing teeth.
          </p>
        </section>
      ) : !selectedZone ? (
        <section className="px-[12px] py-[14px] text-center">
          <p className="font-sans text-[11px] font-semibold text-tp-slate-600">
            Tap a surface on the 3D tooth
          </p>
          <p className="mt-[2px] font-sans text-[10px] text-tp-slate-400">
            Occlusal / Buccal / Lingual / Mesial / Distal / Cervical / Root
          </p>
        </section>
      ) : (
        <section className="border-b border-tp-slate-100 px-[12px] py-[10px]">
          <div className="mb-[6px] flex items-center gap-[6px]">
            <span className="h-[8px] w-[8px] rounded-full" style={{ background: zone!.color }} />
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: zone!.color }}>
              {zoneLabel} · Surface Findings
            </p>
          </div>
          <div className="flex flex-wrap gap-[5px]">
            {DIAGNOSES.map((d) => {
              const active = activeSurfaceDiags.has(d)
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    if (active) {
                      const f = zoneFindings.find((zf) => zf.type === d)
                      if (f) onRemoveFinding(f.id)
                    } else {
                      onAddFinding(selectedZone, d)
                    }
                  }}
                  className={`inline-flex h-[24px] items-center rounded-[12px] border px-[8px] font-sans text-[10px] font-medium transition-colors ${
                    active
                      ? "border-transparent text-white shadow-sm"
                      : "border-tp-slate-200 bg-white text-tp-slate-600 hover:border-tp-blue-400"
                  }`}
                  style={active ? { background: zone!.color } : undefined}
                >
                  {d}
                </button>
              )
            })}
          </div>
          <textarea
            value={zoneNotes[selectedZone] ?? ""}
            onChange={(e) => onUpdateNotes(selectedZone, e.target.value)}
            placeholder={`Notes for ${zoneLabel.toLowerCase()} surface…`}
            className="mt-[8px] h-[44px] w-full resize-none rounded-[6px] border border-tp-slate-200 bg-tp-slate-50 px-[10px] py-[7px] font-sans text-[11px] text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:bg-white focus:outline-none"
          />
        </section>
      )}

      {/* Summary of all surface findings for this tooth */}
      {zonesWithData.length > 0 && (
        <section className="px-[12px] py-[10px]">
          <p className="mb-[6px] font-sans text-[10px] font-semibold uppercase tracking-[0.5px] text-tp-slate-500">
            Surfaces recorded
          </p>
          <ul className="flex flex-col gap-[4px]">
            {zonesWithData.map((z) => {
              const zc = ZONE_INFO[z]?.color ?? "#888"
              const zl = getZoneLabel(z, tooth.arch, tooth.position)
              const types = Array.from(new Set(findings.filter((f) => f.zoneId === z).map((f) => f.type)))
              const note = zoneNotes[z]?.trim()
              return (
                <li key={z} className="group rounded-[6px] border border-tp-slate-100 bg-tp-slate-50/60 px-[8px] py-[6px]">
                  <div className="flex items-center gap-[6px]">
                    <span className="h-[6px] w-[6px] rounded-full flex-shrink-0" style={{ background: zc }} />
                    <span className="font-sans text-[11px] font-semibold" style={{ color: zc }}>{zl}</span>
                    {types.length > 0 && (
                      <span className="font-sans text-[10px] text-tp-slate-600">· {types.join(", ")}</span>
                    )}
                  </div>
                  {note && (
                    <p className="mt-[2px] pl-[12px] font-sans text-[10px] italic text-tp-slate-500 leading-[14px]">
                      &ldquo;{note}&rdquo;
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
