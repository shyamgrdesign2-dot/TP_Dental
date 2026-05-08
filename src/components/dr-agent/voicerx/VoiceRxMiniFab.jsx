import React, { useEffect, useId, useLayoutEffect, useRef } from "react";
import styles from "./VoiceRxMiniFab.module.scss";

/** Reference FAB path — 430×115 viewBox, organic dome with indents for mic/submit. */
const FAB_PATH =
  "M395.24 23.6125C381.35 31.5666 366.81 41.5232 360.83 55.4195C352.63 74.3548 341.13 86.7689 319.47 86.769H110.53C88.87 86.7689 77.37 74.3548 69.17 55.4195C63.19 41.5232 48.62 31.5666 34.73 23.6125L28.43 20H401.32L395.24 23.6125Z";

function TickIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M20.46 6.17969L8.82003 17.8197L3.53003 12.5297"
        stroke="#10B981"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  );
}

function VoiceMicIcon({ size = 24, color = "#000000", muted = false }) {
  if (muted) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M16.4201 6.41965V7.57965L9.14008 14.8596C8.18008 13.9896 7.58008 12.7096 7.58008 11.3396V6.41965C7.58008 4.35965 8.98008 2.64965 10.8801 2.15965C11.0701 2.10965 11.2501 2.26965 11.2501 2.45965V3.99965C11.2501 4.40965 11.5901 4.74965 12.0001 4.74965C12.4101 4.74965 12.7501 4.40965 12.7501 3.99965V2.45965C12.7501 2.26965 12.9301 2.10965 13.1201 2.15965C15.0201 2.64965 16.4201 4.35965 16.4201 6.41965Z" />
        <path d="M19.81 9.81012V11.4001C19.81 15.4701 16.68 18.8201 12.7 19.1701V21.3001C12.7 21.6901 12.39 22.0001 12 22.0001C11.61 22.0001 11.3 21.6901 11.3 21.3001V19.1701C10.21 19.0701 9.18001 18.7501 8.26001 18.2401L9.29001 17.2101C10.11 17.5901 11.03 17.8101 12 17.8101C15.54 17.8101 18.42 14.9301 18.42 11.4001V9.81012C18.42 9.43012 18.73 9.12012 19.12 9.12012C19.5 9.12012 19.81 9.43012 19.81 9.81012Z" />
        <path d="M16.42 10.0801V11.5301C16.42 14.1101 14.2 16.1801 11.56 15.9301C11.28 15.9001 11 15.8501 10.74 15.7601L16.42 10.0801Z" />
        <path d="M21.7701 2.22988C21.4701 1.92988 20.9801 1.92988 20.6801 2.22988L7.23012 15.6799C6.20012 14.5499 5.58012 13.0499 5.58012 11.3999V9.80988C5.58012 9.42988 5.27012 9.11988 4.88012 9.11988C4.50012 9.11988 4.19012 9.42988 4.19012 9.80988V11.3999C4.19012 13.4299 4.97012 15.2799 6.24012 16.6699L2.22012 20.6899C1.92012 20.9899 1.92012 21.4799 2.22012 21.7799C2.38012 21.9199 2.57012 21.9999 2.77012 21.9999C2.97012 21.9999 3.16012 21.9199 3.31012 21.7699L21.7701 3.30988C22.0801 3.00988 22.0801 2.52988 21.7701 2.22988Z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M19.12 9.12c-.39 0-.7.31-.7.7v1.58c0 3.54-2.88 6.42-6.42 6.42s-6.42-2.88-6.42-6.42V9.81c0-.39-.31-.7-.7-.7-.39 0-.7.31-.7.7v1.58c0 4.07 3.13 7.42 7.12 7.78v2.13c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-2.13c3.98-.35 7.12-3.71 7.12-7.78V9.81a.707.707 0 0 0-.7-.69Z" />
      <path d="M12 2c-2.44 0-4.42 1.98-4.42 4.42v5.12c0 2.44 1.98 4.42 4.42 4.42s4.42-1.98 4.42-4.42V6.42C16.42 3.98 14.44 2 12 2Zm1.31 6.95c-.07.26-.3.43-.56.43-.05 0-.1-.01-.15-.02-.39-.11-.8-.11-1.19 0-.32.09-.63-.1-.71-.41-.09-.31.1-.63.41-.71.59-.16 1.21-.16 1.8 0 .3.08.48.4.4.71Zm.53-1.94c-.09.24-.31.38-.55.38-.07 0-.14-.01-.2-.03-.69-.26-1.47-.26-2.17 0-.3.11-.63-.05-.74-.35-.11-.3.05-.63.35-.74.97-.35 2.03-.35 3 0 .3.11.46.44.31.74Z" />
    </svg>
  );
}

function LiveWaveform({
  stream,
  active,
  height = 28,
  barColor = "#FFFFFF",
  barWidth = 4,
  barGap = 2,
  barHeight = 6,
  fadeEdges = true,
  targetBarCount
}) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioContextRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      sizeRef.current = { w: rect.width, h: rect.height };
    };
    updateSize();
    const obs = new ResizeObserver(updateSize);
    obs.observe(canvas);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!stream) {
      analyserRef.current = null;
      sourceRef.current = null;
      if (audioContextRef.current) { void audioContextRef.current.close(); audioContextRef.current = null; }
      return;
    }
    try {
      const ctx = new window.AudioContext();
      const analyser = ctx.createAnalyser();
      const src = ctx.createMediaStreamSource(stream);
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.76;
      src.connect(analyser);
      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = src;
      return () => {
        src.disconnect(); analyser.disconnect();
        analyserRef.current = null; sourceRef.current = null;
        void ctx.close();
        if (audioContextRef.current === ctx) audioContextRef.current = null;
      };
    } catch { /* ignore */ }
  }, [stream]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataArray = new Uint8Array(128);

    const draw = () => {
      const context = canvas.getContext("2d");
      if (!context) return;
      const dpr = window.devicePixelRatio || 1;
      const { w: cssW, h: cssH } = sizeRef.current;
      if (cssW <= 0 || cssH <= 0) {
        frameRef.current = window.requestAnimationFrame(draw);
        return;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, cssW, cssH);

      const centerY = cssH / 2;
      const span = barWidth + barGap;
      const autoBarCount = Math.max(1, Math.floor((cssW + barGap) / span));
      const barCount = targetBarCount ?
        Math.max(1, Math.min(targetBarCount, autoBarCount)) :
        autoBarCount;
      const totalW = barCount * span - barGap;
      const offsetX = (cssW - totalW) / 2;
      const analyser = analyserRef.current;

      let levels = [];
      if (active && analyser) {
        analyser.getByteFrequencyData(dataArray);
        levels = Array.from({ length: barCount }, (_, i) => {
          const dist = barCount > 1 ? Math.abs(i - (barCount - 1) / 2) / ((barCount - 1) / 2) : 0;
          const centerBias = 1 - dist;
          const sampleIdx = Math.min(
            dataArray.length - 1,
            Math.floor((0.04 + dist * 0.32) * dataArray.length)
          );
          const raw = dataArray[sampleIdx] / 255;
          return Math.min(1, raw * (0.72 + centerBias * 0.42));
        });
      } else {
        const t = performance.now() / 1000;
        levels = Array.from({ length: barCount }, (_, i) => {
          const baseWave = (Math.sin(t * 2.3 + i * 0.55) + 1) / 2;
          return 0.04 + baseWave * 0.05;
        });
      }

      levels.forEach((level, i) => {
        const dist = barCount > 1 ? Math.abs(i - (barCount - 1) / 2) / ((barCount - 1) / 2) : 0;
        const centerBias = 1 - dist;
        const alpha = fadeEdges ? 1 - dist * 0.42 : 1;
        const minH = Math.max(barHeight, cssH * 0.14);
        const barH = Math.max(minH, level * cssH * 0.56 + centerBias * cssH * 0.03);
        const x = offsetX + i * span;
        const y = centerY - barH / 2;
        context.globalAlpha = alpha;
        context.fillStyle = barColor;
        context.beginPath();
        context.roundRect(x, y, barWidth, barH, barWidth / 2);
        context.fill();
      });
      context.globalAlpha = 1;
      frameRef.current = window.requestAnimationFrame(draw);
    };
    draw();
    return () => { if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, barColor, barGap, barHeight, barWidth, fadeEdges]);

  return <canvas ref={canvasRef} aria-hidden className={styles.waveCanvas} />;
}

export function VoiceRxMiniFab({
  stream,
  paused,
  elapsedLabel,
  statusLabel,
  manualMute,
  isAwaitingResponse,
  canSubmit,
  onToggleMute,
  onSubmit,
  onExpand
}) {
  const uid = useId();
  const shadowId = `${uid}-shadow`;
  const shellId = `${uid}-shell`;

  return (
    <div
      className={["pointer-events-auto", styles.outer].join(" ")}
      data-voice-allow
      role="button"
      tabIndex={0}
      aria-label="Expand voice consultation"
      onClick={onExpand}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onExpand(); }}>

      <div className={["position-absolute", styles.inner].join(" ")}>
        <svg
          aria-hidden
          className={styles.svg}
          viewBox="0 0 430 115"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet">

          <defs>
            <filter
              height="114.769"
              id={shadowId}
              width="430"
              x="0"
              y="0"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="12" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.175838 0 0 0 0 0.173404 0 0 0 0 0.173404 0 0 0 0.42 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
            </filter>
            <linearGradient id={shellId} x1="28.43" x2="401.32" y1="53" y2="53" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#D565EA" />
              <stop offset="0.5" stopColor="#673AAC" />
              <stop offset="1" stopColor="#1A1994" />
            </linearGradient>
          </defs>

          <g filter={`url(#${shadowId})`}>
            <path d={FAB_PATH} fill={`url(#${shellId})`} />
          </g>
        </svg>

        <div className={styles.contentWrapper}>
          <div className={["vrx-fab-content", styles.fabContent].join(" ")}>
            {/* Mic surface */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
              disabled={isAwaitingResponse}
              aria-label={manualMute ? "Unmute microphone" : "Mute microphone"}
              aria-pressed={manualMute}
              className={[
                "vrx-fab-surface pointer-events-auto",
                styles.surface,
                styles.micBtn
              ].join(" ")}
              data-muted={manualMute ? "true" : "false"}>
              <span className={styles.iconUnrotate}>
                <VoiceMicIcon size={30} color={manualMute ? "#FFFFFF" : "#F59E0B"} muted={manualMute} />
              </span>
            </button>

            {/* Center stack */}
            <div className={styles.centerStack}>
              <div className={styles.waveRow}>
                <div className={styles.waveContainer}>
                  <LiveWaveform
                    stream={stream}
                    active={!paused && !!stream}
                    height={24}
                    barColor="#FFFFFF"
                    barWidth={2}
                    barGap={1}
                    barHeight={5}
                    fadeEdges
                    targetBarCount={15} />
                </div>
                <span className={styles.elapsedLabel}>{elapsedLabel}</span>
              </div>

              <div className={styles.labelRow}>
                <span className={styles.statusLabel}>
                  {statusLabel === "Listening" ? "I'm listening" : statusLabel}
                </span>
                {!paused && (
                  <span aria-hidden className={styles.dotsRow}>
                    <span className="vrx-fab-dot" />
                    <span className="vrx-fab-dot" />
                    <span className="vrx-fab-dot" />
                  </span>
                )}
              </div>
            </div>

            {/* Submit surface */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSubmit(); }}
              disabled={!canSubmit}
              aria-label="Submit consultation"
              className={[
                "vrx-fab-surface pointer-events-auto",
                styles.surface,
                styles.submitBtn,
                !canSubmit ? styles.submitDisabled : ""
              ].join(" ")}>
              {isAwaitingResponse ? (
                <span className={styles.spinner} aria-hidden />
              ) : (
                <span className={styles.iconUnrotate}>
                  <TickIcon size={28} />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
