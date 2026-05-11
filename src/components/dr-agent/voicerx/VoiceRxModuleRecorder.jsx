import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, MicOff, WifiOff, Mic, AlertCircle } from "../atoms/icons/lucide";
import { VoiceRxSiriWaveform } from "./VoiceRxSiriWaveform";
import { useNetConnection } from "./use-net-connection";
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/Popover";
import { ConfirmDialog as TPConfirmDialog } from "../molecules/ConfirmDialog";
import { useRxPadSync } from "../rxpad/dr-agent/RxPadSyncContext";
import { playVoiceRxErrorSound, playVoiceRxStartSound } from "./audio";
import styles from "./VoiceRxModuleRecorder.module.scss";

function AnimatedTranscriptPreview({ text, className }) {
  const tokens = useMemo(() => text ? text.split(/(\s+)/) : [], [text]);
  const prevVisibleCountRef = useRef(0);
  let visibleIndex = -1;
  const prevVisible = prevVisibleCountRef.current;

  const rendered = tokens.map((token, index) => {
    if (/^\s+$/.test(token)) return <span key={index}>{token}</span>;
    visibleIndex += 1;
    const isNew = visibleIndex >= prevVisible;
    const stagger = Math.min((visibleIndex - prevVisible) * 26, 220);
    return (
      <span
        key={index}
        className="vrx-word"
        style={isNew ? { "--vrx-stagger": `${stagger}ms` } : undefined}
        data-word-new={isNew ? "true" : undefined}>
        {token}
      </span>
    );
  });

  useEffect(() => {
    prevVisibleCountRef.current = visibleIndex + 1;
  });

  return <p className={className}>{rendered}</p>;
}

function formatElapsed(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function VoiceRxModuleRecorder({
  sectionLabel,
  showSectionInStatus = true,
  onCancel,
  onSubmit,
  transcript: scriptedTranscript,
  radiusClassName = "rounded-b-[16px]",
  variant = "row",
  fillHeight = false
}) {
  const [manualMute, setManualMute] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isCompactLayout, setIsCompactLayout] = useState(variant === "stack");
  const [isUltraCompact, setIsUltraCompact] = useState(false);
  const [devicePopoverOpen, setDevicePopoverOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(undefined);
  const [stream, setStream] = useState(null);
  const [micError, setMicError] = useState(null);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [micRetryKey, setMicRetryKey] = useState(0);
  const startRef = useRef(Date.now());
  const containerRef = useRef(null);
  const levelRef = useRef(0);
  const net = useNetConnection();
  const { setActiveVoiceModule } = useRxPadSync();

  useEffect(() => {
    setActiveVoiceModule(sectionLabel);
    return () => setActiveVoiceModule(null);
  }, [sectionLabel, setActiveVoiceModule]);

  useEffect(() => {
    playVoiceRxStartSound();
  }, []);

  useEffect(() => {
    if (variant === "stack") {
      setIsCompactLayout(true);
      setIsUltraCompact(false);
      return;
    }
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const update = () => {
      const w = node.getBoundingClientRect().width;
      setIsCompactLayout(w < 620);
      setIsUltraCompact(w < 500);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [variant]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const tick = () => {
      const node = containerRef.current;
      if (node) {
        const v = Math.max(0, Math.min(1, levelRef.current || 0));
        node.style.setProperty("--vrx-blob-level", v.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMicError("Microphone not supported in this browser");
      return;
    }
    let cancelled = false;
    let acquired = null;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          audio: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true
        });
        if (cancelled) { s.getTracks().forEach((t) => t.stop()); return; }
        acquired = s;
        setStream(s);
        setMicError(null);
        try {
          const all = await navigator.mediaDevices.enumerateDevices();
          if (!cancelled) {
            setDevices(
              all.filter((d) => d.kind === "audioinput").map((d) => ({
                deviceId: d.deviceId,
                label: d.label || `Microphone (${(d.deviceId || "default").slice(0, 6)})`
              }))
            );
          }
        } catch { /* ignore */ }
      } catch (e) {
        if (!cancelled) setMicError(e instanceof Error ? e.message : "Microphone access denied");
      }
    })();
    return () => {
      cancelled = true;
      acquired?.getTracks().forEach((t) => t.stop());
      setStream(null);
    };
  }, [selectedDeviceId, micRetryKey]);

  useEffect(() => {
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => { t.enabled = !manualMute; });
  }, [manualMute, stream]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) return;
    const recog = new SR();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "en-US";
    recog.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + " ";
      setLiveTranscript(text.trim());
    };
    recog.onerror = () => { /* swallow transient no-speech */ };
    recog.onend = () => { try { recog.start(); } catch { /* ignore */ } };
    try { recog.start(); } catch { /* ignore */ }
    return () => { recog.onend = null; try { recog.stop(); } catch { /* ignore */ } };
  }, []);

  const networkPaused = !net.online || net.slowConnection;
  const hasMicError = Boolean(micError);
  const criticalBlock = hasMicError || networkPaused;
  const isPaused = manualMute || criticalBlock;
  const isListening = !isPaused;

  useEffect(() => {
    if (isPaused) return;
    const tick = () => setElapsedMs(Date.now() - startRef.current);
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) startRef.current = Date.now() - elapsedMs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const displayTranscript = scriptedTranscript && scriptedTranscript.length > 0 ?
    scriptedTranscript : liveTranscript;
  const hasTranscript = displayTranscript.trim().length > 0;
  const transcriptScrollRef = useRef(null);
  const compactControls = variant === "stack" || isCompactLayout;
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const mimeTypeRef = useRef("audio/webm");

  useEffect(() => {
    if (!stream || typeof window === "undefined" || typeof window.MediaRecorder === "undefined") return;
    const supports = (type) => {
      try { return window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(type); } catch { return false; }
    };
    const mimeType = supports("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" :
      supports("audio/webm") ? "audio/webm" :
        supports("audio/mp4") ? "audio/mp4" : "";
    let recorder;
    try {
      recorder = mimeType ? new window.MediaRecorder(stream, { mimeType }) : new window.MediaRecorder(stream);
    } catch (error) {
      console.error("MediaRecorder init failed", error);
      return;
    }
    chunksRef.current = [];
    mimeTypeRef.current = recorder.mimeType || mimeType || "audio/webm";
    recorder.ondataavailable = (event) => {
      if (event.data?.size) chunksRef.current.push(event.data);
    };
    try {
      recorder.start(1000);
      mediaRecorderRef.current = recorder;
    } catch (error) {
      console.error("MediaRecorder start failed", error);
    }
    return () => {
      try {
        if (recorder.state !== "inactive") recorder.stop();
      } catch { /* ignore */ }
      mediaRecorderRef.current = null;
    };
  }, [stream]);

  useEffect(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    try {
      if (isPaused && recorder.state === "recording") recorder.pause();
      if (!isPaused && recorder.state === "paused") recorder.resume();
    } catch { /* ignore */ }
  }, [isPaused]);

  const getRecordedBlob = () => new Promise((resolve) => {
    const recorder = mediaRecorderRef.current;
    const buildBlob = () => {
      if (!chunksRef.current.length) return null;
      return new Blob(chunksRef.current, { type: mimeTypeRef.current || "audio/webm" });
    };
    if (!recorder || recorder.state === "inactive") {
      resolve(buildBlob());
      return;
    }
    const finalize = () => resolve(buildBlob());
    recorder.addEventListener("stop", finalize, { once: true });
    try { recorder.stop(); } catch { finalize(); }
  });

  useEffect(() => {
    const node = transcriptScrollRef.current;
    if (!node) return;
    requestAnimationFrame(() => { node.scrollTo({ top: node.scrollHeight, behavior: "smooth" }); });
  }, [displayTranscript]);

  const block = useMemo(() => {
    if (!net.online) return {
      kind: "offline",
      icon: <WifiOff size={32} strokeWidth={2.2} absoluteStrokeWidth />,
      title: "You're offline",
      description: "Recording is paused until you're back online. Your transcript so far is safe — it resumes automatically.",
      canRetry: false
    };
    if (net.slowConnection) return {
      kind: "slow",
      icon: <AlertCircle size={32} strokeWidth={2.2} absoluteStrokeWidth />,
      title: "Connection unstable",
      description: "We've paused recording because the connection is slow. It will resume automatically when the network stabilises.",
      canRetry: false
    };
    if (hasMicError) return {
      kind: "mic",
      icon: <MicOff size={32} strokeWidth={2.2} absoluteStrokeWidth />,
      title: "Microphone unavailable",
      description: micError || "Allow microphone access in your browser to start dictation. Your transcript so far stays safe.",
      canRetry: true
    };
    return null;
  }, [net.online, net.slowConnection, hasMicError, micError]);

  const lastErrorToneRef = useRef(null);
  useEffect(() => {
    const errorKey = block ? `${block.kind}:${block.title}` : null;
    if (!errorKey) { lastErrorToneRef.current = null; return; }
    if (lastErrorToneRef.current === errorKey) return;
    lastErrorToneRef.current = errorKey;
    playVoiceRxErrorSound();
  }, [block]);

  const statusLabel = hasMicError ? "Mic error" :
    !net.online ? "Offline" :
      net.slowConnection ? "On hold" :
        manualMute ? "Paused" : "Listening";

  // ── Shared render pieces ──────────────────────────────────────────────────
  const waveStrip = (
    <div className={[
      styles.waveStripWrap,
      variant === "stack" ? styles.waveStripStack :
        isUltraCompact ? styles.waveStripUltra :
          compactControls ? styles.waveStripCompact : styles.waveStripNormal
    ].join(" ")}>
      <VoiceRxSiriWaveform
        className="absolute inset-0 h-full w-full"
        stream={stream}
        paused={isPaused}
        levelRef={levelRef} />
      {isPaused ? <div className={styles.waveStripPausedOverlay} /> : null}
    </div>
  );

  const transcriptBlock = block ? (
    variant === "stack" ? (
      <div className={styles.errorStackWrap} role="status" aria-live="polite">
        <div aria-hidden className={[styles.errorHaloOuter, styles.errorHaloOuterStack].join(" ")}>
          <span className={[styles.errorHaloInner, styles.errorHaloInnerStack].join(" ")} />
          <span className={styles.errorIcon}>{block.icon}</span>
        </div>
        <h3 className={styles.errorTitleStack}>{block.title}</h3>
        <p className={styles.errorDescStack}>{block.description}</p>
        {block.canRetry ? (
          <button
            type="button"
            onClick={() => setMicRetryKey((k) => k + 1)}
            className={[styles.retryBtn].join(" ")}>
            <Mic size={13} strokeWidth={2.2} aria-hidden />
            Allow microphone access
          </button>
        ) : null}
      </div>
    ) : (
      <div className={styles.errorRowWrap} role="status" aria-live="polite">
        <div aria-hidden className={[styles.errorHaloOuter, styles.errorHaloOuterRow].join(" ")}>
          <span className={[styles.errorHaloInner, styles.errorHaloInnerRow].join(" ")} />
          <span className={styles.errorIconRow}>{block.icon}</span>
        </div>
        <h3 className={styles.errorTitleRow}>{block.title}</h3>
        {block.canRetry ? (
          <button
            type="button"
            onClick={() => setMicRetryKey((k) => k + 1)}
            className={[styles.retryBtnRow].join(" ")}>
            <Mic size={11} strokeWidth={2.2} aria-hidden />
            Allow microphone access
          </button>
        ) : (
          <p className={styles.errorDescRow}>{block.description}</p>
        )}
      </div>
    )
  ) : (
    <div className={styles.transcriptWrap}>
      <div
        ref={transcriptScrollRef}
        className={[
          styles.transcriptScroll,
          variant === "stack" ? styles.transcriptScrollStack : styles.transcriptScrollRow
        ].join(" ")}>
        {hasTranscript ? (
          <AnimatedTranscriptPreview
            text={displayTranscript}
            className={[
              styles.transcriptText,
              variant === "stack" ? styles.transcriptTextStack : styles.transcriptTextRow
            ].join(" ")} />
        ) : (
          <p className={[
            styles.transcriptPlaceholder,
            variant === "stack" ? styles.transcriptPlaceholderStack : styles.transcriptPlaceholderRow
          ].join(" ")}>
            Start speaking, you&apos;ll see the caption here
          </p>
        )}
      </div>
    </div>
  );

  const ctaRow = (
    <div className={[
      styles.ctaRow,
      isUltraCompact ? styles.ctaRowUltra : compactControls ? styles.ctaRowCompact : styles.ctaRowNormal
    ].join(" ")}>
      {/* Close */}
      <button
        type="button"
        onClick={() => setConfirmCloseOpen(true)}
        aria-label="Cancel dictation"
        className={[
          "vrx-lg-btn vrx-close-btn group relative flex shrink-0 items-center justify-center rounded-[12px] transition-transform active:scale-[0.94]",
          isUltraCompact ? styles.ctaBtnUltra : compactControls ? styles.ctaBtnCompact : styles.ctaBtnNormal
        ].join(" ")}>
        <span className="vrx-lg-surface" aria-hidden />
        <span className="vrx-lg-sheen" aria-hidden />
        <svg
          width={isUltraCompact ? 18 : compactControls ? 20 : 24}
          height={isUltraCompact ? 18 : compactControls ? 20 : 24}
          viewBox="0 0 24 24" fill="none" className="relative text-[#DC2626] transition-colors">
          <path d="M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className={[
        "vrx-cta-divider",
        compactControls ? styles.ctaDividerCompact : "",
        isUltraCompact ? styles.ctaDividerUltra : ""
      ].filter(Boolean).join(" ")} aria-hidden />

      {/* Segmented mic */}
      <div className={[
        "vrx-lg-btn relative flex items-stretch overflow-hidden rounded-[12px] transition-opacity",
        isUltraCompact ? styles.ctaBtnUltra : compactControls ? styles.ctaBtnCompact : styles.ctaBtnNormal,
        manualMute ? "vrx-mic-muted" : "",
        criticalBlock ? styles.micSegmentCritical : ""
      ].filter(Boolean).join(" ")}>
        <span className="vrx-lg-surface" aria-hidden />
        <span className="vrx-lg-sheen" aria-hidden />
        <button
          type="button"
          onClick={() => setManualMute((v) => !v)}
          disabled={criticalBlock}
          className={[
            styles.micToggleBtn,
            isUltraCompact ? styles.micToggleBtnUltra : compactControls ? styles.micToggleBtnCompact : styles.micToggleBtnNormal,
            manualMute ? styles.micToggleMuted : styles.micToggleNormal
          ].join(" ")}
          aria-label={manualMute ? "Unmute microphone" : "Mute microphone"}
          aria-pressed={manualMute}>
          <span className={styles.micIconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path opacity="0.4" d="M19.12 9.12c-.39 0-.7.31-.7.7v1.58c0 3.54-2.88 6.42-6.42 6.42s-6.42-2.88-6.42-6.42V9.81c0-.39-.31-.7-.7-.7-.39 0-.7.31-.7.7v1.58c0 4.07 3.13 7.42 7.12 7.78v2.13c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-2.13c3.98-.35 7.12-3.71 7.12-7.78V9.81a.707.707 0 0 0-.7-.69Z" />
              <path d="M12 2c-2.44 0-4.42 1.98-4.42 4.42v5.12c0 2.44 1.98 4.42 4.42 4.42s4.42-1.98 4.42-4.42V6.42C16.42 3.98 14.44 2 12 2Zm1.31 6.95c-.07.26-.3.43-.56.43-.05 0-.1-.01-.15-.02-.39-.11-.8-.11-1.19 0-.32.09-.63-.1-.71-.41-.09-.31.1-.63.41-.71.59-.16 1.21-.16 1.8 0 .3.08.48.4.4.71Zm.53-1.94c-.09.24-.31.38-.55.38-.07 0-.14-.01-.2-.03-.69-.26-1.47-.26-2.17 0-.3.11-.63-.05-.74-.35-.11-.3.05-.63.35-.74.97-.35 2.03-.35 3 0 .3.11.46.44.31.74Z" />
            </svg>
            {manualMute && (
              <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <line x1="3.5" y1="16.5" x2="16.5" y2="3.5" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="3.5" y1="16.5" x2="16.5" y2="3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>
        <div className="vrx-lg-divider" aria-hidden />
        <Popover open={devicePopoverOpen} onOpenChange={setDevicePopoverOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={criticalBlock}
              className={[
                styles.devicePickerBtn,
                compactControls ? styles.devicePickerCompact : styles.devicePickerNormal,
                manualMute ? styles.devicePickerMuted : styles.devicePickerDefault
              ].join(" ")}
              aria-label="Choose microphone">
              <ChevronDown
                size={compactControls ? 14 : 16}
                strokeWidth={2.5}
                className={devicePopoverOpen ? styles.chevronOpen : styles.chevronClosed} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="center" side="top" sideOffset={10}
            data-voice-allow
            className={styles.devicePopoverContent}>
            <div className={styles.devicePopoverHeader}>Microphone</div>
            {devices.length === 0 ? (
              <div className={styles.devicePopoverEmpty}>{micError ? micError : "No input devices detected"}</div>
            ) : (
              devices.map((d, i) => {
                const isSelected = selectedDeviceId ? selectedDeviceId === d.deviceId : i === 0;
                return (
                  <button
                    key={d.deviceId || i}
                    type="button"
                    onClick={() => { setSelectedDeviceId(d.deviceId); setDevicePopoverOpen(false); }}
                    className={[
                      styles.deviceItem,
                      isSelected ? styles.deviceItemSelected : styles.deviceItemNormal
                    ].join(" ")}>
                    <span className={styles.deviceItemLabel}>{d.label}</span>
                    {isSelected && <Check size={14} className={styles.deviceItemCheck} />}
                  </button>
                );
              })
            )}
          </PopoverContent>
        </Popover>
      </div>

      <span className={[
        "vrx-cta-divider",
        compactControls ? styles.ctaDividerCompact : "",
        isUltraCompact ? styles.ctaDividerUltra : ""
      ].filter(Boolean).join(" ")} aria-hidden />

      {/* Submit */}
      <button
        type="button"
        onClick={async () => {
          const audioBlob = await getRecordedBlob();
          onSubmit({ transcript: displayTranscript, durationMs: elapsedMs, audioBlob });
        }}
        disabled={criticalBlock || !hasTranscript}
        aria-label="Submit dictation"
        className={[
          "vrx-submit-hero group relative flex items-center overflow-hidden rounded-[12px] text-white transition-transform",
          isUltraCompact ? styles.submitBtnUltra : compactControls ? styles.submitBtnCompact : styles.submitBtnNormal,
          !criticalBlock && hasTranscript ? styles.submitEnabled : criticalBlock ? "vrx-submit-dim cursor-not-allowed opacity-40" : "vrx-submit-dim cursor-not-allowed"
        ].filter(Boolean).join(" ")}>
        <span className="vrx-submit-gradient absolute inset-0 rounded-[inherit]" aria-hidden />
        <span className={[styles.submitTopSheen, "pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-[inherit]"].join(" ")} aria-hidden />
        {!criticalBlock && hasTranscript && (
          <span aria-hidden className="vrx-submit-sheen pointer-events-none absolute inset-y-0 left-0 z-0 w-[40%]" />
        )}
        <span className={[isUltraCompact ? styles.submitIconRowUltra : styles.submitIconRow].join(" ")}>
          <svg
            width={isUltraCompact ? 18 : compactControls ? 20 : 24}
            height={isUltraCompact ? 18 : compactControls ? 20 : 24}
            viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20.46 6.17969L8.82003 17.8197L3.53003 12.5297" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={[
            "font-semibold tracking-[0.2px]",
            isUltraCompact ? styles.submitLabelUltra : compactControls ? styles.submitLabelCompact : styles.submitLabelNormal
          ].join(" ")}>Submit</span>
        </span>
      </button>
    </div>
  );

  return (
    <div
      ref={containerRef}
      data-voice-allow
      className={[
        styles.recorderRoot,
        fillHeight ? styles.recorderFillHeight : "",
        radiusClassName,
        variant === "stack" ? styles.recorderBgStack : styles.recorderBg
      ].filter(Boolean).join(" ")}>

      {variant === "stack" ? (
        <>
          <div aria-hidden className={[styles.blobWrapperStack, "pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden flex justify-center"].join(" ")}>
            <div className={["tp-voice-blob tp-voice-blob--reactive h-[120px] w-[280px]", styles.blobMargin].join(" ")} />
          </div>
          <div className={[styles.stackContent, fillHeight ? styles.stackContentFill : ""].join(" ")}>
            <div className={styles.stackTranscriptArea}>
              <div className={styles.stackTranscriptInner}>{transcriptBlock}</div>
            </div>
            <div className={styles.stackWaveArea}>{waveStrip}</div>
            <div className={styles.stackCtaArea}>{ctaRow}</div>
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden flex justify-center",
              isUltraCompact ? styles.blobWrapperRowUltra : styles.blobWrapperRow
            ].join(" ")}>
            <div className={[
              "tp-voice-blob tp-voice-blob--reactive",
              isUltraCompact ? "h-[88px] w-[200px]" : "h-[104px] w-[240px]",
              styles.blobMargin
            ].join(" ")} />
          </div>
          <div className={[
            styles.rowContent,
            isUltraCompact ? styles.rowContentUltra : styles.rowContentNormal
          ].join(" ")}>
            <div className={styles.rowTranscriptCol}>{transcriptBlock}</div>
            <div aria-hidden className={styles.rowDivider} />
            <div className={styles.rowActionsCol}>
              {waveStrip}
              {ctaRow}
            </div>
          </div>
        </>
      )}

      {/* Status pill */}
      <div className={styles.statusPillRow}>
        <div
          className={[
            "vrx-status-card relative inline-flex items-center gap-[6px] rounded-t-[10px] rounded-b-none bg-white/60 pl-[10px] pr-[12px] pt-[4px] pb-[5px] backdrop-blur-[10px] transition-all duration-200",
            hasMicError || !net.online || net.slowConnection ? "vrx-status-card--error" : manualMute ? "vrx-status-card--paused" : ""
          ].filter(Boolean).join(" ")}
          role={hasMicError ? "alert" : "status"}
          aria-live="polite">
          {criticalBlock ? (
            <span className={styles.statusIconError} aria-hidden>
              <AlertCircle size={14} strokeWidth={2.4} />
            </span>
          ) : isListening ? (
            <span className={styles.statusIconListening}>
              <span className="absolute inset-0 rounded-full bg-rose-400" />
              <span className={[styles.recRingAnim, "absolute inset-0 rounded-full bg-rose-400/55"].join(" ")} />
            </span>
          ) : manualMute ? (
            <span className={styles.statusIconPaused}>
              <svg width={7} height={9} viewBox="0 0 8 10" fill="none" aria-hidden>
                <rect x="0" y="0" width="3" height="10" rx="1" fill="currentColor" />
                <rect x="5" y="0" width="3" height="10" rx="1" fill="currentColor" />
              </svg>
            </span>
          ) : (
            <span className={styles.statusDot} />
          )}

          <span className={[
            styles.statusText,
            criticalBlock ? styles.statusTextError : styles.statusTextNormal
          ].join(" ")}>
            {statusLabel}
            {!criticalBlock && showSectionInStatus && sectionLabel ? (
              <span className={styles.statusSection}>· {sectionLabel}</span>
            ) : null}
            {!criticalBlock && (isListening || manualMute) && elapsedMs > 0 && (
              <span className={styles.statusElapsed}>({formatElapsed(elapsedMs)})</span>
            )}
          </span>
        </div>
      </div>

      <TPConfirmDialog
        open={confirmCloseOpen}
        onOpenChange={setConfirmCloseOpen}
        title="Close this voice consultation?"
        warning="Are you sure you want to close this voice Rx? If you close it, no data will be stored."
        primaryLabel="Keep recording"
        onPrimary={() => setConfirmCloseOpen(false)}
        secondaryLabel="Close and discard"
        secondaryTone="destructive"
        onSecondary={() => { setConfirmCloseOpen(false); onCancel(); }} />
    </div>
  );
}
