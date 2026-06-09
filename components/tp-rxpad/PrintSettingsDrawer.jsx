"use client";
// Slide-in Print Settings panel for the End-Visit Rx preview. Modelled on
// TP_Master's print-settings (Inline / List View / Table variants), re-built for
// this project's client-side RxPreviewDocument. Changes update the live preview
// instantly via the `settings` state held by EndVisitPage.
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseCircle, TextalignJustifycenter, RowVertical, Grid1 } from "iconsax-reactjs";
import { hasHistoricalData } from "@/components/dental/examination/DentalChartPrint";

const VIEWS = [
  { id: "list", label: "List View", desc: "Each item on its own bulleted line", icon: RowVertical },
  { id: "inline", label: "Inline", desc: "Items joined compactly on one line", icon: TextalignJustifycenter },
  { id: "table", label: "Table", desc: "Items laid out in a table grid", icon: Grid1 },
];

// How the per-tooth dental examination section is organised on the print.
// "tooth" (default) keeps the existing per-tooth heading layout; "type"
// pivots it so the heading is the category (Past Procedures / Findings /
// Procedures / Overall Teeth Notes) with the teeth that have that kind
// listed underneath. Single source of truth so the on-screen preview and
// the printed page always match.
const GROUP_BY_OPTIONS = [
  { id: "type",  label: "By Type",  desc: "Each kind is a heading (Past Procedures, Findings, Procedures, Notes) with the teeth listed underneath." },
  { id: "tooth", label: "By Tooth", desc: "Each tooth is a heading with its findings, past & planned procedures, and notes underneath." },
];

export function PrintSettingsDrawer({ open, settings, onChange, onClose, patientId }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open || typeof document === "undefined") return null;
  const view = settings?.view || "list";
  // Default to "type" — most doctors prefer kind-first scanning on the
  // printed Rx. The toggle below flips back to "tooth" instantly.
  const groupBy = settings?.groupBy === "tooth" ? "tooth" : "type";
  const showChart = settings?.showDentalChart !== false;
  const includeHistorical = settings?.includeHistorical === true;
  // Gate the Include-past toggle off the same data check the Print Dental
  // Chart dropdown uses, so a patient with no chart data sees a disabled
  // toggle (with a tooltip) on every print/preview surface.
  const historyAvailable = hasHistoricalData(patientId);
  // TP blue is the brand colour for clickable/selected/CTA across the app —
  // resolves to #4B4AD5 in CSS. Used everywhere here in place of the older violet.
  const BLUE = "var(--tp-blue-500)";
  const BLUE_BG = "rgba(75,74,213,0.08)";
  const Toggle = ({ on, onClick, disabled }) => (
    <span onClick={(e) => { e.preventDefault(); if (!disabled) onClick(); }}
      style={{ position: "relative", width: 40, height: 22, borderRadius: 999, background: on ? BLUE : "#cbd5e1", transition: "background 0.15s", flexShrink: 0, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </span>
  );
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.35)" }} />
      <aside style={{ position: "absolute", top: 0, right: 0, height: "100%", width: 360, maxWidth: "92vw", background: "#fff", boxShadow: "-12px 0 40px rgba(2,6,23,0.22)", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>Print Settings</h2>
          <button type="button" onClick={onClose} aria-label="Close" style={{ border: "none", background: "transparent", cursor: "pointer", color: "#64748b", display: "inline-flex" }}>
            <CloseCircle size={22} variant="Linear" />
          </button>
        </div>

        <div style={{ padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Layout</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VIEWS.map((v) => {
                const active = view === v.id;
                const Icon = v.icon;
                return (
                  <button key={v.id} type="button" onClick={() => onChange({ ...settings, view: v.id })}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, cursor: "pointer", textAlign: "left", background: active ? BLUE_BG : "#fff", border: `1.5px solid ${active ? BLUE : "#e2e8f0"}` }}>
                    <span style={{ display: "inline-flex", color: active ? BLUE : "#64748b" }}><Icon size={20} variant={active ? "Bold" : "Linear"} /></span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: active ? BLUE : "#334155" }}>{v.label}</span>
                      <span style={{ display: "block", fontSize: 12, color: "#94a3b8", marginTop: 1 }}>{v.desc}</span>
                    </span>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${active ? BLUE : "#cbd5e1"}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      {active ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: BLUE }} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Group dental examination by</div>
            {/* Clean radio row — no card, no boxed segmented control. Two
                small radio circles + labels inline, with the description
                text below picking up the active option's copy. Lighter than
                the segmented tabs (which read as toolbar-y / dated) and
                lighter than the original radio cards (which ate too much
                vertical space for a binary toggle). */}
            <div role="radiogroup" aria-label="Group dental examination by"
              style={{ display: "flex", gap: 22, padding: "2px 2px 0" }}>
              {GROUP_BY_OPTIONS.map((g) => {
                const active = groupBy === g.id;
                return (
                  <button key={g.id} type="button" role="radio" aria-checked={active}
                    onClick={() => onChange({ ...settings, groupBy: g.id })}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 0", background: "transparent", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                    <span aria-hidden style={{ width: 16, height: 16, borderRadius: "50%", border: `1.75px solid ${active ? BLUE : "#cbd5e1"}`, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.15s" }}>
                      {active ? <span style={{ width: 7, height: 7, borderRadius: "50%", background: BLUE }} /> : null}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: active ? "#334155" : "#64748b" }}>{g.label}</span>
                  </button>
                );
              })}
            </div>
            <p style={{ margin: "8px 4px 0", fontSize: 12, color: "#94a3b8", lineHeight: 1.4, fontFamily: "Inter, sans-serif" }}>
              {GROUP_BY_OPTIONS.find((g) => g.id === groupBy)?.desc}
            </p>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Sections</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0", cursor: "pointer" }}>
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#334155" }}>Show dental chart</span>
                  <span style={{ display: "block", fontSize: 12, color: "#94a3b8", marginTop: 1 }}>Include the odontogram in the printout</span>
                </span>
                <Toggle on={showChart} onClick={() => onChange({ ...settings, showDentalChart: !showChart })} />
              </label>
              <label
                title={historyAvailable ? undefined : "There is no past dental or oral history for this patient."}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0", cursor: historyAvailable ? "pointer" : "not-allowed", opacity: historyAvailable ? 1 : 0.55 }}>
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#334155" }}>Include past dental &amp; oral history</span>
                  <span style={{ display: "block", fontSize: 12, color: "#94a3b8", marginTop: 1, lineHeight: 1.4 }}>{historyAvailable
                    ? "Adds tooth records and oral examination entries from previous visits. Each tooth shows the date it was last updated."
                    : "There is no past dental or oral history for this patient."}</span>
                </span>
                <Toggle disabled={!historyAvailable} on={includeHistorical && historyAvailable} onClick={() => onChange({ ...settings, includeHistorical: !includeHistorical })} />
              </label>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", padding: "14px 20px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: BLUE, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Done</button>
        </div>
      </aside>
    </div>,
    document.body
  );
}
