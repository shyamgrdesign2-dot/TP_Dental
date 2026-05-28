/**
 * Single source of truth for tooth-level diagnosis compatibility.
 *
 * Clinical mental model:
 *   - Missing / Denture / Bridge stand alone — nothing else coexists.
 *   - Implant replaces a tooth → compatible only with Crown (implant-supported crown).
 *   - RCT is endodontic treatment → compatible only with Crown (post-endo crown).
 *   - Crown sits on an implant OR on a root-treated tooth.
 *
 * Chips are NEVER disabled in the UI. Clicking a diagnosis auto-removes any
 * currently-set diagnosis that is not in its allow-list. This mirrors how a
 * dentist mentally re-classifies the same tooth.
 */
const COMPATIBLE: Record<string, string[]> = {
  Missing: [],
  Denture: [],
  Bridge: [],
  Implant: ["Crown"],
  RCT: ["Crown"],
  Crown: ["Implant", "RCT"],
}

// "Past Procedures" is a HISTORY log: a tooth can legitimately carry several
// procedures (e.g. RCT + Crown + Bridge) over time, so they accumulate. The
// only exclusivity is a terminal diagnosis (Missing / Extraction) — the tooth is
// gone, so it stands alone and clicking it wipes everything else; conversely,
// adding any real procedure clears a terminal diagnosis.
const TERMINAL = new Set(["Missing", "Extraction"])
export function applyDiagnosisSelection(current: Set<string>, clicked: string): Set<string> {
  const next = new Set(current)
  // Toggle-off: clicking an already-active diagnosis removes it.
  if (next.has(clicked)) {
    next.delete(clicked)
    return next
  }
  if (TERMINAL.has(clicked)) {
    // Terminal stands alone — replaces every other record.
    return new Set([clicked])
  }
  // A real procedure: drop any terminal diagnosis, keep all other procedures.
  for (const d of Array.from(next)) {
    if (TERMINAL.has(d)) next.delete(d)
  }
  next.add(clicked)
  return next
}

/** For introspection / testing. */
export function isCompatible(a: string, b: string): boolean {
  if (a === b) return false
  return (COMPATIBLE[a] ?? []).includes(b) || (COMPATIBLE[b] ?? []).includes(a)
}

// Teeth that are gone (Missing / Extraction) can't receive treatments that act
// on the natural crown/root. Those chips are DISABLED rather than silently
// auto-reclassifying — you must clear Missing/Extraction first.
const ABSENT = new Set(["Missing", "Extraction"])
const NATURAL_TOOTH_TREATMENTS = ["RCT", "Crown"]

// "Terminal" diagnoses describe a tooth that is gone (Missing / Extraction).
// They stand alone — applying one means every other record on that tooth
// (diagnoses, findings, procedures, notes) no longer makes sense and is wiped.
// This is why we never need pairwise conflict rules for the N treatment types:
// the only rule is "a terminal diagnosis is incompatible with everything else."
export const TERMINAL_DIAGNOSES = ABSENT
export function isTerminalDiagnosis(d: string): boolean {
  return ABSENT.has(d)
}
/** Diagnoses that should be disabled in the UI given the current set. */
export function getDisabledDiagnoses(current: Set<string>): Set<string> {
  const disabled = new Set<string>()
  const hasAbsent = Array.from(current).some((d) => ABSENT.has(d))
  if (hasAbsent) NATURAL_TOOTH_TREATMENTS.forEach((t) => disabled.add(t))
  return disabled
}
