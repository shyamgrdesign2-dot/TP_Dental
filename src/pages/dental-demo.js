import React, { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import DemoOverlays from '../components/dental3d/DemoOverlays';

const DentalScene = lazy(() => import('../components/dental3d/DentalScene'));

const params = new URLSearchParams(window.location.search);
const RECORD_MODE = params.get('record') === '1';
const AUTO_PLAY = RECORD_MODE || params.get('autoplay') === '1';

export default function DentalDemoPage() {
  const timeRef = useRef(0);
  const [displayTime, setDisplayTime] = useState(0);
  const [tipData, setTipData] = useState(null);
  const [selectorFdi, setSelectorFdi] = useState(16);
  const [activePill, setActivePill] = useState('adult');
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [showControls, setShowControls] = useState(!RECORD_MODE);
  const rafRef = useRef(null);

  const ctxRef = useRef(null);
  const bufferRef = useRef(null);
  const sourceRef = useRef(null);
  const startedAtRef = useRef(0);
  const offsetRef = useRef(0);
  const autoPlayedRef = useRef(false);

  useEffect(() => {
    document.title = 'TatvaPractice 3D Dental Module — Demo';
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    fetch(process.env.PUBLIC_URL + '/mix.mp3')
      .then(r => r.arrayBuffer())
      .then(ab => ctx.decodeAudioData(ab))
      .then(decoded => {
        bufferRef.current = decoded;
        setAudioReady(true);
      })
      .catch(e => console.error('Audio decode error:', e));

    const onKey = (e) => {
      if (e.key === 'h' || e.key === 'H') setShowControls(p => !p);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      if (sourceRef.current) { try { sourceRef.current.stop(); } catch (_) {} }
      ctx.close();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const getCurrentTime = useCallback(() => {
    if (!ctxRef.current) return Math.min(58, offsetRef.current);
    return Math.min(58, offsetRef.current + (ctxRef.current.currentTime - startedAtRef.current));
  }, []);

  const tick = useCallback(() => {
    const t = getCurrentTime();
    timeRef.current = t;
    setDisplayTime(t);
    if (t < 58) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (sourceRef.current) { try { sourceRef.current.stop(); } catch (_) {} }
      sourceRef.current = null;
      offsetRef.current = 58;
      setPlaying(false);
    }
  }, [getCurrentTime]);

  const startSource = useCallback((fromOffset) => {
    const ctx = ctxRef.current;
    const buf = bufferRef.current;
    if (!ctx || !buf) return;
    const doStart = () => {
      if (sourceRef.current) { try { sourceRef.current.stop(); } catch (_) {} }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0, fromOffset);
      sourceRef.current = src;
      startedAtRef.current = ctx.currentTime;
      offsetRef.current = fromOffset;
    };
    if (ctx.state === 'suspended') {
      ctx.resume().then(doStart);
    } else {
      doStart();
    }
  }, []);

  const play = useCallback(() => {
    if (!audioReady) return;
    startSource(offsetRef.current);
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, audioReady, startSource]);

  const pause = useCallback(() => {
    const t = getCurrentTime();
    if (sourceRef.current) { try { sourceRef.current.stop(); } catch (_) {} }
    sourceRef.current = null;
    offsetRef.current = t;
    setPlaying(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [getCurrentTime]);

  const restart = useCallback(() => {
    offsetRef.current = 0;
    timeRef.current = 0;
    setDisplayTime(0);
    startSource(0);
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, startSource]);

  const seek = useCallback((v) => {
    const wasPlaying = !!sourceRef.current;
    if (sourceRef.current) { try { sourceRef.current.stop(); } catch (_) {} }
    sourceRef.current = null;
    offsetRef.current = v;
    timeRef.current = v;
    setDisplayTime(v);
    if (wasPlaying) {
      startSource(v);
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [startSource, tick]);

  useEffect(() => {
    if (AUTO_PLAY && audioReady && !autoPlayedRef.current) {
      autoPlayedRef.current = true;
      play();
    }
  }, [audioReady, play]);

  const onTipUpdate = useCallback((data) => setTipData(data), []);
  const onSelectorUpdate = useCallback((fdi) => setSelectorFdi(fdi), []);
  const onPillUpdate = useCallback((pill) => setActivePill(pill), []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
    <div className="demo-root" style={{ position: 'relative', width: 1920, height: 1080, overflow: 'hidden',
      transform: `scale(${Math.min(window.innerWidth / 1920, window.innerHeight / 1080)})`, transformOrigin: 'center center',
      background: 'radial-gradient(1200px 820px at 50% 42%,#15173a 0%,#0a0b1a 60%,#06070f 100%)' }}>

      <Suspense fallback={<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Loading 3D scene...</div>}>
        <DentalScene
          timeRef={timeRef}
          onTipUpdate={onTipUpdate}
          onSelectorUpdate={onSelectorUpdate}
          onPillUpdate={onPillUpdate}
        />
      </Suspense>

      <DemoOverlays
        time={displayTime}
        tipData={tipData}
        selectorFdi={selectorFdi}
        activePill={activePill}
      />

      {/* Transport controls — press H to toggle, hidden in ?record=1 mode */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 20,
        display: showControls ? 'flex' : 'none', gap: 12, alignItems: 'center', padding: '10px 24px', borderRadius: 16,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <button onClick={playing ? pause : play} style={btnStyle} disabled={!audioReady}>
          {!audioReady ? 'Loading...' : playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={restart} style={btnStyle} disabled={!audioReady}>{'⟲'} Restart</button>
        <span style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: 16, minWidth: 80 }}>
          {formatTime(displayTime)} / 0:58
        </span>
        <input type="range" min={0} max={58} step={0.1} value={displayTime}
          onChange={e => seek(parseFloat(e.target.value))}
          style={{ width: 300, accentColor: '#6C6BDE' }}
        />
      </div>
    </div>
    </div>
  );
}

const btnStyle = {
  padding: '8px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(75,74,213,0.3)', color: '#fff', fontWeight: 700, fontSize: 15,
  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
};

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
