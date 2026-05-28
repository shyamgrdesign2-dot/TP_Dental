"use client";
// Slide-in Print Settings panel for the End-Visit Rx preview. Modelled on
// TP_Master's print-settings (Inline / List View / Table variants), re-built for
// this project's client-side RxPreviewDocument. Changes update the live preview
// instantly via the `settings` state held by EndVisitPage.
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseCircle, TextalignJustifycenter, RowVertical, Grid1 } from "iconsax-reactjs";

const VIEWS = [
  { id: "list", label: "List View", desc: "Each item on its own bulleted line", icon: RowVertical },
  { id: "inline", label: "Inline", desc: "Items joined compactly on one line", icon: TextalignJustifycenter },
  { id: "table", label: "Table", desc: "Items laid out in a table grid", icon: Grid1 },
];

export function PrintSettingsDrawer({ open, settings, onChange, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open || typeof document === "undefined") return null;
  const view = settings?.view || "list";
  const showChart = settings?.showDentalChart !== false;
  const includeHistorical = settings?.includeHistorical === true;
  // TP blue is the brand colour for clickable/selected/CTA across the app —
  // resolves to #4B4AD5 in CSS. Used everywhere here in place of the older violet.
  const BLUE = "var(--tp-blue-500)";
  const BLUE_BG = "rgba(75,74,213,0.08)";
  const Toggle = ({ on, onClick }) => (
    <span onClick={(e) => { e.preventDefault(); onClick(); }}
      style={{ position: "relative", width: 40, height: 22, borderRadius: 999, background: on ? BLUE : "#cbd5e1", transition: "background 0.15s", flexShrink: 0, cursor: "pointer" }}>
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
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>Sections</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0", cursor: "pointer" }}>
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#334155" }}>Show dental chart</span>
                  <span style={{ display: "block", fontSize: 12, color: "#94a3b8", marginTop: 1 }}>Include the odontogram in the printout</span>
                </span>
                <Toggle on={showChart} onClick={() => onChange({ ...settings, showDentalChart: !showChart })} />
              </label>
              <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0", cursor: "pointer" }}>
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#334155" }}>Include past visits</span>
                  <span style={{ display: "block", fontSize: 12, color: "#94a3b8", marginTop: 1, lineHeight: 1.4 }}>Adds dental and oral history from previous visits to this consultation.</span>
                </span>
                <Toggle on={includeHistorical} onClick={() => onChange({ ...settings, includeHistorical: !includeHistorical })} />
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
