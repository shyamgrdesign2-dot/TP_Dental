"use client";
// Print Dental Chart button + runner. Rendering is delegated to RxPreviewDocument
// so the printed sheet looks IDENTICAL to the on-screen Rx Preview drawer.
// Plain mode prints a blank odontogram on the letterhead; Historical mode prints
// the full Rx (clinical sections + tooth records + oral records + filled chart).

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TPTooltip, TPCheckbox } from "@/components/tp-ui";
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons";
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument";
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer";

// Print stylesheet: hide everything else and push each <article> from
// RxPreviewDocument onto its own A4 page so the printout matches the on-screen
// Rx Preview drawer 1:1.
const PRINT_STYLE = `
@media print {
  body > *:not(.dcp-print-root) { display: none !important; }
  .dcp-print-root { position: static !important; opacity: 1 !important; z-index: auto !important; width: 100% !important; pointer-events: auto !important; left: auto !important; top: auto !important; }
  .dcp-print-root > div { max-width: 100% !important; gap: 0 !important; }
  .dcp-print-root article { box-shadow: none !important; border-radius: 0 !important; aspect-ratio: auto !important; height: auto !important; min-height: 0 !important; break-after: page !important; page-break-after: always !important; overflow: visible !important; }
  .dcp-print-root article:last-child { break-after: auto !important; page-break-after: avoid !important; }
  @page { size: A4 portrait; margin: 10mm; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}`;

// Empty Rx snapshot shape — used by the "plain" mode so the printed page has
// only the dental chart (no historical/clinical sections) but still matches the
// Preview Rx letterhead + patient + footer pattern exactly.
function emptySnapshot(patientId) {
  return {
    patientId,
    updatedAt: new Date().toISOString(),
    symptoms: [], examinations: [], diagnoses: [], labInvestigations: [],
    medications: [], advice: [],
    vitals: [], labResults: [],
    dentalExamination: [],
  };
}

// Renders the Rx-preview document off-screen at A4 width and fires the system
// print dialog. The printed output mirrors the Preview Rx drawer; "historical"
// includes all dental + oral history sections above the chart, "plain" prints
// just the chart on the letterhead.
// Empty chart used by "plain" mode → blank odontogram + no oral section.
const BLANK_CHART = { updatedAt: 0, entries: [], toothDiagnoses: {}, findingsByTooth: {}, oralEntries: [], oralNotes: "" };

function PrintRunner({ patientId, mode, includePatient, onDone }) {
  useEffect(() => {
    const after = () => onDone();
    window.addEventListener("afterprint", after);
    // Open the system print dialog as soon as the off-screen replica paints.
    // The 32 WebP teeth (1.1 MB → 81 KB) decode in <100 ms on modern hardware,
    // and the browser is allowed to keep decoding while the dialog is open —
    // the printed page only finalises when the user actually hits Print, by
    // which time everything has settled.
    //
    // PLAIN mode = no clinical sections + blank chart, ready instantly.
    // HISTORICAL mode = small extra wait so the pagination measurement pass
    // settles before print captures the layout.
    const delay = mode === "historical" ? 400 : 80;
    const t = setTimeout(() => { try { window.print(); } catch {} }, delay);
    const fallback = setTimeout(onDone, 60000);
    return () => { clearTimeout(t); clearTimeout(fallback); window.removeEventListener("afterprint", after); };
  }, [onDone, mode]);
  // Historical: full Rx snapshot (clinical sections + dental + oral via chart store).
  // Plain: empty snapshot + blank chart override → only the letterhead + patient + odontogram.
  const isPlain = mode !== "historical";
  const snapshot = isPlain
    ? emptySnapshot(patientId)
    : (getComposedRxPreviewSnapshot(patientId) ?? emptySnapshot(patientId));
  const settings = isPlain
    ? { view: "list", showDentalChart: true, chartOverride: BLANK_CHART, hideOral: true }
    : { view: "list", showDentalChart: true };
  void includePatient;
  return createPortal(
    <div className="dcp-print-root" style={{ position: "fixed", left: 0, top: 0, width: 760, opacity: 0, pointerEvents: "none", zIndex: -1, background: "#fff" }}>
      <style>{PRINT_STYLE}</style>
      <RxPreviewDocument snapshot={snapshot} settings={settings} />
    </div>,
    document.body
  );
}

// Returns true if the patient has any chart data worth printing in "historical"
// mode — per-tooth diagnoses, treatment history entries, oral entries, or oral
// notes. Reads the same `dental.exam.chart.<patientId>` store the chart uses.
// Exported so the Print Settings drawer + Preview Settings gear popover can
// gate the "Include past dental & oral history" toggle off the same check.
export function hasHistoricalData(patientId) {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(`dental.exam.chart.${patientId || "apt-1"}`);
    if (!raw) return false;
    const c = JSON.parse(raw) || {};
    if (Array.isArray(c.oralEntries) && c.oralEntries.length > 0) return true;
    if (typeof c.oralNotes === "string" && c.oralNotes.trim().length > 0) return true;
    if (Array.isArray(c.entries) && c.entries.length > 0) return true;
    if (c.toothDiagnoses && Object.keys(c.toothDiagnoses).length > 0) return true;
    if (c.findingsByTooth && Object.keys(c.findingsByTooth).length > 0) return true;
    if (c.treatmentHistoryByTooth && Object.keys(c.treatmentHistoryByTooth).length > 0) return true;
    return false;
  } catch { return false; }
}

export function DentalChartPrintButton({ patientId }) {
  const [open, setOpen] = useState(false);
  const [includePatient, setIncludePatient] = useState(true);
  const [printReq, setPrintReq] = useState(null);
  // Re-evaluate every time the dropdown opens so we reflect the latest chart
  // state without subscribing to a store change channel.
  const [historicalAvailable, setHistoricalAvailable] = useState(false);
  const rootRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    setHistoricalAvailable(hasHistoricalData(patientId));
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, patientId]);

  const choose = (mode) => {
    if (mode === "historical" && !historicalAvailable) return; // no-op when disabled
    setOpen(false);
    setPrintReq({ mode, includePatient });
  };
  // A print-option row — icon + title + sub + chevron, all on the even font
  // scale (14 / 12). Hover bg is the standard slate-100 tint used in app menus.
  // `disabled` greys the row + suppresses hover, and the entire row is wrapped
  // in a tooltip so doctors learn WHY the option is unavailable.
  const item = (icon, label, sub, mode, opts = {}) => {
    const { disabled = false, disabledReason = "" } = opts;
    const btn = (
      <button type="button" onClick={() => choose(mode)} disabled={disabled} style={{ display: "flex", width: "100%", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px", border: "none", background: "transparent", cursor: disabled ? "not-allowed" : "pointer", borderRadius: 10, opacity: disabled ? 0.5 : 1 }}
        onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = "rgba(100,116,139,0.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
        <span style={{ display: "inline-flex", height: 36, width: 36, alignItems: "center", justifyContent: "center", borderRadius: 8, background: "rgba(75,74,213,0.10)", flexShrink: 0 }}>
          <TPMedicalIcon name={icon} variant="bulk" size={18} color="var(--tp-blue-500)" />
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", fontFamily: "Inter, sans-serif" }}>{label}</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: "#64748b", fontFamily: "Inter, sans-serif", lineHeight: 1.4 }}>{sub}</span>
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "#94a3b8" }} aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
    if (disabled && disabledReason) {
      // span wrapper required so the tooltip still fires on a disabled <button>
      return (
        <TPTooltip title={disabledReason} arrow placement="left">
          <span style={{ display: "block", width: "100%" }}>{btn}</span>
        </TPTooltip>
      );
    }
    return btn;
  };

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      {open && (
        <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: 0, width: 320, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 16px 40px rgba(2,6,23,0.20)", padding: 8, zIndex: 40, fontFamily: "Inter, sans-serif" }}>
          <div style={{ padding: "4px 10px 8px", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Print</div>
          {item("tooth", "Plain dental chart", "Blank odontogram template", "plain")}
          {item("clipboard-activity", "Historical dental chart", "With recorded findings & history", "historical", { disabled: !historicalAvailable, disabledReason: "There is no historical data to print for this patient." })}
          <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 6px 8px 10px", marginTop: 4, borderTop: "1px solid #f1f5f9", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#475569" }}>
            <TPCheckbox size="small" checked={includePatient} onChange={(e) => setIncludePatient(e.target.checked)} sx={{ padding: 0, marginRight: "4px" }} />
            <span style={{ flex: 1 }}>Include patient information</span>
          </label>
        </div>
      )}
      <TPTooltip title="Print dental chart" arrow placement="top">
        <button type="button" aria-label="Print dental chart" onClick={() => setOpen((o) => !o)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, border: "none", background: "transparent", color: "#334155", cursor: "pointer" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9V3.5C6 3.22 6.22 3 6.5 3h11c.28 0 .5.22.5.5V9M6 18H4.5C3.67 18 3 17.33 3 16.5v-5C3 10.67 3.67 10 4.5 10h15c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5H18M7 15h10v5.5c0 .28-.22.5-.5.5h-9a.5.5 0 0 1-.5-.5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </TPTooltip>
      {printReq && (
        <PrintRunner patientId={patientId} mode={printReq.mode} includePatient={printReq.includePatient} onDone={() => setPrintReq(null)} />
      )}
    </div>
  );
}
