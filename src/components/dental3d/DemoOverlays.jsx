import React from 'react';
import { S, TOOTH_NAMES, UPPER_FDI, LOWER_FDI } from './constants';
import './demo-overlays.css';

function getPhase(t) {
  if (t < S.arch) return 'intro';
  if (t < S.archZoom) return 'arch';
  if (t < S.surface) return 'zoom';
  if (t < S.sel) return 'surface';
  if (t < S.mod) return 'selector';
  if (t < S.print) return 'module';
  if (t < S.hist) return 'print';
  if (t < S.outro) return 'history';
  return 'outro';
}

export default function DemoOverlays({ time, tipData, selectorFdi, activePill }) {
  const phase = getPhase(time);

  const ov = (p) => ({ display: phase === p ? 'block' : 'none' });
  const cursorOpacity = (time >= S.archZoom - 0.8 && time <= S.archZoom + 0.6) ? 1 : 0;

  return (
    <>
      <div className="gridlines" />
      <div className="vignette" />

      {/* INTRO */}
      <div className="ov" style={ov('intro')}>
        <div className="stage"><div style={{ textAlign: 'center' }}>
          <div className="h-small">The world&apos;s first</div>
          <div className="h-big">3D Interactive<br/>Dental Module</div>
          <div className="by">by <span>TatvaPractice</span></div>
        </div></div>
      </div>

      {/* ARCH */}
      <div className="ov" style={ov('arch')}>
        <div className="vlabel">The whole mouth, in 3D</div>
        <div className="pills">
          <span className={`pill ${activePill === 'adult' ? 'active' : ''}`}>Adult</span>
          <span className={`pill ${activePill === 'pedia' ? 'active' : ''}`}>Pediatric</span>
          <span className={`pill ${activePill === 'mixed' ? 'active' : ''}`}>Mixed</span>
        </div>
        <div className="caption">Consult on a <b>true-to-life model</b> — adult, pediatric or mixed.</div>
      </div>

      {/* CURSOR */}
      <svg style={{ position: 'absolute', width: 32, height: 32, opacity: cursorOpacity, zIndex: 10, left: '62%', top: '48%',
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))', pointerEvents: 'none', transition: 'opacity 0.3s' }}
        viewBox="0 0 24 24">
        <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.53.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#fff" stroke="#1e293b" strokeWidth="1"/>
      </svg>

      {/* SURFACE */}
      <div className="ov" style={ov('surface')}>
        <div className="vlabel">Select any surface</div>
        <div className="caption">The tooth rotates to face it — every finding lands <b>exactly where it belongs</b>.</div>
      </div>

      {/* TIP */}
      {tipData && (
        <div className="tip-box" style={{ left: tipData.x, top: tipData.y, opacity: tipData.opacity,
          borderLeft: `3px solid ${tipData.color}` }}>
          <span className="tip-dot" style={{ background: tipData.color }} />
          <span>{tipData.label}</span>
        </div>
      )}

      {/* SELECTOR */}
      <div className="ov" style={ov('selector')}>
        <div className="tooth-header">
          {TOOTH_NAMES[selectorFdi] || 'Upper Right First Molar'} <span className="fdi">T{selectorFdi || 16}</span>
        </div>
        <SelectorGrid activeFdi={selectorFdi || 16} />
        <div className="caption">Navigate between teeth instantly — <b>the 3D model updates live</b>.</div>
      </div>

      {/* MODULE */}
      <div className="ov" style={ov('module')}>
        <div className="vlabel">The chart reacts instantly</div>
        <div className="caption">Past procedures, findings &amp; treatment — <b>perfectly in sync</b>.</div>
        <ModulePanel time={time} />
      </div>

      {/* PRINT */}
      <div className="ov" style={ov('print')}>
        <div className="vlabel">Print anytime</div>
        <div className="caption">Print a <b>clean dental chart</b> or the full history, anytime.</div>
        <PrintSidebar />
        <PrintChart />
      </div>

      {/* HISTORY */}
      <div className="ov" style={ov('history')}>
        <div className="stage"><div style={{ textAlign: 'center', maxWidth: 1400 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>A living 3D history</div>
          <div className="big-heading">Next visit, every record<br/>is still here.</div>
        </div></div>
      </div>

      {/* OUTRO */}
      <div className="ov" style={ov('outro')}>
        <div className="stage"><div style={{ textAlign: 'center' }}>
          <div className="outro-tag">The operatory, reimagined.</div>
          <div className="outro-url">tatvapractice.com</div>
        </div></div>
      </div>
    </>
  );
}

function SelectorGrid({ activeFdi }) {
  return (
    <div className="sel-card">
      <div className="grid-wrap">
        <div className="grid-row">
          <div className="grid-quad">
            {UPPER_FDI.slice(0, 8).map(f => (
              <div key={f} className={`cell ${f === activeFdi ? 'active' : ''}`}>{f}</div>
            ))}
          </div>
          <div className="grid-quad">
            {UPPER_FDI.slice(8).map(f => (
              <div key={f} className={`cell ${f === activeFdi ? 'active' : ''}`}>{f}</div>
            ))}
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-quad">
            {LOWER_FDI.slice(0, 8).map(f => (
              <div key={f} className={`cell ${f === activeFdi ? 'active' : ''}`}>{f}</div>
            ))}
          </div>
          <div className="grid-quad">
            {LOWER_FDI.slice(8).map(f => (
              <div key={f} className={`cell ${f === activeFdi ? 'active' : ''}`}>{f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModulePanel({ time }) {
  const mt = time - S.mod;
  const showPP = mt >= 1.5;
  const showFI1 = mt >= 2.5;
  const showFI2 = mt >= 4.0;
  const showPR = mt >= 5.5;

  return (
    <div className="module-panel">
      <div className="panel-header">
        <div className="tooth-icon">&#x1F9B7;</div>
        <span className="tooth-label">Upper Left First Molar</span>
        <span className="fdi-badge">T26</span>
      </div>
      <div className="panel-body">
        <div className="sec">
          <div className="sec-head">
            <div className="sec-icon pp">&#x1F4CB;</div>
            <span className="sec-title">Past Procedures</span>
            <span className="sec-count">(1)</span>
            <div className="sec-grow" />
            <span className="sec-chevron">&#x25BE;</span>
          </div>
          <div className="tbl">
            <div className="tbl-head">
              <span className="col-name">NAME</span><span className="col-surf">SURFACES</span>
              <span className="col-since">WHEN</span><span className="col-note">NOTE</span>
            </div>
            <div className="tbl-row" style={{ opacity: showPP ? 1 : 0, transition: 'opacity 0.4s' }}>
              <span className="col-name">Filling</span>
              <span className="col-surf"><span className="surf-chip occ">O</span></span>
              <span className="col-since">3 months</span>
              <span className="col-note">Composite</span>
            </div>
          </div>
        </div>
        <div className="sec">
          <div className="sec-head">
            <div className="sec-icon fi">&#x1F50D;</div>
            <span className="sec-title">Findings</span>
            <span className="sec-count">(2)</span>
            <div className="sec-grow" />
            <span className="sec-chevron">&#x25BE;</span>
          </div>
          <div className="tbl">
            <div className="tbl-head">
              <span className="col-name">NAME</span><span className="col-surf">SURFACES</span>
              <span className="col-since">SINCE</span><span className="col-note">NOTE</span>
            </div>
            <div className="tbl-row" style={{ opacity: showFI1 ? 1 : 0, transition: 'opacity 0.4s' }}>
              <span className="col-name">Cavity/Caries</span>
              <span className="col-surf"><span className="surf-chip occ">O</span><span className="surf-chip buc">B</span></span>
              <span className="col-since">5 days</span>
              <span className="col-note">Monitor</span>
            </div>
            <div className="tbl-row" style={{ opacity: showFI2 ? 1 : 0, transition: 'opacity 0.4s' }}>
              <span className="col-name">Sensitivity</span>
              <span className="col-surf"><span className="surf-chip wt">WT</span></span>
              <span className="col-since">2 weeks</span>
              <span className="col-note">Cold stimulus</span>
            </div>
          </div>
          <div className="search-bar"><div className="search-input">&#x1F50D; Search &amp; Add Examination</div></div>
          <div className="quick-chips">
            <span className="qchip">Cavity/Caries</span><span className="qchip">Fracture</span>
            <span className="qchip">Sensitivity</span><span className="qchip">Plaque</span><span className="qchip">Calculus</span>
          </div>
        </div>
        <div className="sec">
          <div className="sec-head">
            <div className="sec-icon pr">&#x1F527;</div>
            <span className="sec-title">Procedures</span>
            <span className="sec-count">(1)</span>
            <div className="sec-grow" />
            <span className="sec-chevron">&#x25BE;</span>
          </div>
          <div className="tbl">
            <div className="tbl-head">
              <span className="col-name">NAME</span><span className="col-surf">SURFACES</span>
              <span className="col-since">STATUS</span><span className="col-note">NOTE</span>
            </div>
            <div className="tbl-row" style={{ opacity: showPR ? 1 : 0, transition: 'opacity 0.4s' }}>
              <span className="col-name">Crown</span>
              <span className="col-surf"><span className="surf-chip wt">WT</span></span>
              <span className="col-since" style={{ color: '#7c3aed' }}>Planned</span>
              <span className="col-note">PFM recommended</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintSidebar() {
  return (
    <div className="print-sidebar">
      <div className="print-card">
        <div className="print-card-head">&#x1F5A8;&#xFE0F; Print Dental Chart</div>
        <div className="print-opt">
          <div className="print-ic">&#x1F9B7;</div>
          <div><div className="t">Plain dental chart</div><div className="d">Blank odontogram — adult, pedia or mixed</div></div>
        </div>
        <div className="print-opt">
          <div className="print-ic">&#x1F4CB;</div>
          <div><div className="t">Historical dental chart</div><div className="d">With every recorded finding &amp; procedure</div></div>
        </div>
        <div className="print-opt">
          <div className="print-ic">&#x1F4CA;</div>
          <div><div className="t">Full examination report</div><div className="d">Oral + dental findings in one document</div></div>
        </div>
      </div>
    </div>
  );
}

const HEIGHTS = {
  18:52,17:50,16:54,15:42,14:44,13:48,12:38,11:40,21:40,22:38,23:48,24:44,25:42,26:54,27:50,28:52,
  48:48,47:46,46:50,45:40,44:42,43:44,42:36,41:34,31:34,32:36,33:44,34:42,35:40,36:50,37:46,38:48
};

function PrintChart() {
  return (
    <div className="print-sheet">
      <div className="chart-header">Adult Dental Chart <span className="badge">Patient: John Doe</span></div>
      <div className="tooth-grid">
        <PrintRow teeth={UPPER_FDI} isUpper />
        <div className="arch-divider" />
        <PrintRow teeth={LOWER_FDI} isUpper={false} />
      </div>
    </div>
  );
}

function PrintRow({ teeth, isUpper }) {
  return (
    <div className="arch-row">
      <div className="arch-half">
        {teeth.slice(0, 8).map(fdi => <ToothCol key={fdi} fdi={fdi} isUpper={isUpper} />)}
      </div>
      <div className="arch-half">
        {teeth.slice(8).map(fdi => <ToothCol key={fdi} fdi={fdi} isUpper={isUpper} />)}
      </div>
    </div>
  );
}

function ToothCol({ fdi, isUpper }) {
  const h = HEIGHTS[fdi] || 40;
  const img = (
    <div className={`tooth-img ${isUpper ? 'upper' : ''}`}>
      <div className="t-shape" style={{ height: h }} />
    </div>
  );
  const surfIcon = (
    <div className="surf-icon-cell">
      <svg viewBox="0 0 36 44" width="36" height="44">
        <rect x="8" y="1" width="20" height="10" rx="4" fill="none" stroke="#94a3b8" strokeWidth="1.2"/>
        <circle cx="18" cy="22" r="10" fill="none" stroke="#94a3b8" strokeWidth="1.2"/>
        <path d="M18 12v20M8 22h20" stroke="#94a3b8" strokeWidth="0.8" opacity="0.5"/>
        <rect x="8" y="34" width="20" height="8" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1.2"/>
      </svg>
    </div>
  );
  const fdiLabel = <div className="tooth-fdi">{fdi}</div>;

  return (
    <div className="tooth-col">
      {isUpper ? <>{img}{fdiLabel}{surfIcon}</> : <>{surfIcon}{fdiLabel}{img}</>}
    </div>
  );
}
