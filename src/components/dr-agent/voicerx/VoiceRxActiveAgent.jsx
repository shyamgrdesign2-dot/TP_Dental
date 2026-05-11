import styles from "./VoiceRxActiveAgent.module.scss";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { playSubmitSound } from "./audio";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Mic,
  MicOff,
  WifiOff
} from "../atoms/icons/lucide";
import { Clock, Setting2 } from "iconsax-reactjs";
import {
  CaptionCarousel,
  VoiceTranscriptProcessingCard,
  hasTranscriptContent,
  transcriptToText
} from "./VoiceTranscriptProcessingCard";
import {
  DropdownMenu as TPDropdownMenu,
  DropdownMenuContent as TPDropdownMenuContent,
  DropdownMenuItem as TPDropdownMenuItem,
  DropdownMenuTrigger as TPDropdownMenuTrigger
} from "../molecules/DropdownMenu";
import { toast } from "./toast";
import { useRxPadSync } from "../rxpad/dr-agent/RxPadSyncContext";
import { VoiceRxSiriWaveform } from "./VoiceRxSiriWaveform";
import { VoiceRxMiniFab } from "./VoiceRxMiniFab";
import { useNetConnection } from "./use-net-connection";
import { playVoiceRxErrorSound, playVoiceRxStartSound } from "./audio";
import { ConfirmDialog as TPConfirmDialog } from "../molecules/ConfirmDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../atoms/Popover";

function formatElapsed(ms) {
  const s = Math.floor(ms / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function useRecordingTimer(active) {
  const [ms, setMs] = useState(0);
  const msRef = useRef(0);
  useEffect(() => { msRef.current = ms; }, [ms]);
  useEffect(() => {
    if (!active) return;
    const start = performance.now() - msRef.current;
    const iv = window.setInterval(() => setMs(performance.now() - start), 250);
    return () => window.clearInterval(iv);
  }, [active]);
  return ms;
}

function useMicStream(deviceId, enabled) {
  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const retry = useCallback(() => { setError(null); setRetryKey((k) => k + 1); }, []);

  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("Microphone not supported in this browser"); return;
    }
    let cancelled = false;
    let acquired = null;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          audio: deviceId ? { deviceId: { exact: deviceId } } : true
        });
        if (cancelled) { s.getTracks().forEach((t) => t.stop()); return; }
        acquired = s; setStream(s); setError(null);
        try {
          const all = await navigator.mediaDevices.enumerateDevices();
          if (!cancelled) setDevices(all.filter((d) => d.kind === "audioinput"));
        } catch { /* ignore */ }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Microphone access denied");
      }
    })();
    return () => { cancelled = true; acquired?.getTracks().forEach((t) => t.stop()); setStream(null); };
  }, [deviceId, enabled, retryKey]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return;
    const onChange = async () => {
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        setDevices(all.filter((d) => d.kind === "audioinput"));
      } catch { /* ignore */ }
      if (!deviceId && enabled) setRetryKey((k) => k + 1);
    };
    navigator.mediaDevices.addEventListener?.("devicechange", onChange);
    return () => navigator.mediaDevices.removeEventListener?.("devicechange", onChange);
  }, [deviceId, enabled]);

  return { stream, devices, error, retry };
}

function useBlobRecorder(stream, paused, enabled) {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const mimeRef = useRef("audio/webm");

  useEffect(() => {
    if (!stream || !enabled) return;
    if (typeof window === "undefined" || typeof window.MediaRecorder === "undefined") return;
    const supports = (t) => {
      try { return window.MediaRecorder.isTypeSupported && window.MediaRecorder.isTypeSupported(t); } catch { return false; }
    };
    const mime = supports("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" :
                 supports("audio/webm") ? "audio/webm" :
                 supports("audio/mp4") ? "audio/mp4" : "";
    let rec;
    try {
      rec = mime ? new window.MediaRecorder(stream, { mimeType: mime }) : new window.MediaRecorder(stream);
    } catch (e) {
      console.error("MediaRecorder init failed", e);
      return;
    }
    chunksRef.current = [];
    mimeRef.current = rec.mimeType || mime || "audio/webm";
    rec.ondataavailable = (ev) => { if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data); };
    try { rec.start(1000); } catch (e) { console.error("MediaRecorder start failed", e); return; }
    recorderRef.current = rec;
    return () => {
      try { if (rec.state !== "inactive") rec.stop(); } catch { /* ignore */ }
      recorderRef.current = null;
    };
  }, [stream, enabled]);

  useEffect(() => {
    const rec = recorderRef.current;
    if (!rec) return;
    try {
      if (paused && rec.state === "recording") rec.pause();
      else if (!paused && rec.state === "paused") rec.resume();
    } catch { /* ignore */ }
  }, [paused]);

  const getBlob = useCallback(() => {
    return new Promise((resolve) => {
      const rec = recorderRef.current;
      const buildBlob = () => {
        if (!chunksRef.current.length) return null;
        return new Blob(chunksRef.current, { type: mimeRef.current || "audio/webm" });
      };
      if (!rec || rec.state === "inactive") { resolve(buildBlob()); return; }
      const finalize = () => resolve(buildBlob());
      rec.addEventListener("stop", finalize, { once: true });
      try { rec.stop(); } catch { finalize(); }
    });
  }, []);

  return { getBlob };
}

function useActiveMic(stream, devices, selectedDeviceId) {
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const lastNotifiedRef = useRef(undefined);

  useEffect(() => {
    if (!stream) return;
    const track = stream.getAudioTracks()[0];
    if (!track) return;
    const id = (track.getSettings && track.getSettings().deviceId) || selectedDeviceId;
    setActiveDeviceId(id || undefined);
  }, [stream, selectedDeviceId]);

  const activeDevice = useMemo(() => {
    if (activeDeviceId) {
      const m = devices.find((d) => d.deviceId === activeDeviceId);
      if (m) return m;
    }
    return devices[0];
  }, [devices, activeDeviceId]);

  const activeLabel = activeDevice?.label || "System default mic";

  useEffect(() => {
    const id = activeDevice?.deviceId;
    if (!id || !activeDevice?.label) return;
    if (lastNotifiedRef.current === undefined) {
      lastNotifiedRef.current = id;
      return;
    }
    if (lastNotifiedRef.current !== id) {
      lastNotifiedRef.current = id;
      toast.success(`Microphone switched to ${activeDevice.label}`);
    }
  }, [activeDevice]);

  return { activeDevice, activeLabel };
}

function AnimatedTranscript({ text, paused, className }) {
  const tokens = useMemo(() => text ? text.split(/(\s+)/) : [], [text]);
  const prevVisibleCountRef = useRef(0);
  let visibleIndex = -1;
  const prevVisible = prevVisibleCountRef.current;

  const rendered = tokens.map((tok, i) => {
    const isSpace = /^\s+$/.test(tok);
    if (isSpace) return <React.Fragment key={i}>{tok}</React.Fragment>;
    visibleIndex += 1;
    const isNew = visibleIndex >= prevVisible;
    const stagger = Math.min((visibleIndex - prevVisible) * 30, 280);
    return (
      <span
        key={i}
        className="vrx-word"
        style={
          isNew ?
            { animation: `vrxWordReveal 600ms cubic-bezier(0.22,1,0.36,1) ${stagger}ms both` } :
            undefined
        }>
        {tok}
      </span>
    );
  });

  useEffect(() => { prevVisibleCountRef.current = visibleIndex + 1; });

  return (
    <p className={className}>
      {rendered}
      {!paused && <span className="vrx-caret" aria-hidden />}
    </p>
  );
}

export function VoiceRxActiveAgent({
  mode, transcript, submittedTranscript = "", processingTranscript = "", isAwaitingResponse, isHandoffExiting = false, onCancel, onSubmit, onCollapse, onExpand,
  isPanelVisible = true, onPauseChange,
  patientName
}) {
  const rootRef = useRef(null);
  const [manualMute, setManualMute] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [devicePopoverOpen, setDevicePopoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [processingPhase, setProcessingPhase] = useState("idle");
  useEffect(() => {
    if (!isAwaitingResponse) {
      setProcessingPhase("idle");
      return;
    }
    setProcessingPhase("submitting");
    const t = window.setTimeout(() => setProcessingPhase("processing"), 5000);
    return () => window.clearTimeout(t);
  }, [isAwaitingResponse]);

  const BOTTOM_EXIT_MS = 320;
  const [bottomLoaderActive, setBottomLoaderActive] = useState(false);
  useEffect(() => {
    if (processingPhase !== "processing") {
      setBottomLoaderActive(false);
      return;
    }
    const t = window.setTimeout(() => setBottomLoaderActive(true), BOTTOM_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [processingPhase]);
  const dockExiting = processingPhase === "processing" && !bottomLoaderActive;

  const { online } = useNetConnection();
  const networkPaused = !online;
  const paused = manualMute || networkPaused || isAwaitingResponse;

  const elapsedMs = useRecordingTimer(!paused);
  const elapsedLabel = formatElapsed(elapsedMs);
  const { stream, devices, error: micError, retry: retryMic } = useMicStream(selectedDeviceId, !isAwaitingResponse);
  const { activeDevice, activeLabel } = useActiveMic(stream, devices, selectedDeviceId);
  const { getBlob: getRecordedBlob } = useBlobRecorder(stream, paused, !isAwaitingResponse);
  const levelRef = useRef(0);

  const handleSubmitClick = useCallback(async () => {
    playSubmitSound();
    let audioBlob = null;
    try { audioBlob = await getRecordedBlob(); } catch (e) { console.error("Failed to capture audio blob", e); }
    onSubmit({ durationMs: elapsedMs, audioBlob });
  }, [getRecordedBlob, onSubmit, elapsedMs]);

  const { setMicUnavailable } = useRxPadSync();
  useEffect(() => {
    setMicUnavailable(!!micError, micError || null);
    return () => setMicUnavailable(false);
  }, [micError, setMicUnavailable]);

  useEffect(() => {
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => { t.enabled = !paused; });
  }, [stream, paused]);

  useEffect(() => { onPauseChange?.(paused); }, [paused, onPauseChange]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const update = () => {
      setIsCompactLayout(node.getBoundingClientRect().width < 340);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const transcriptRef = useRef(null);
  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); });
  }, [transcript]);

  // Submit enables when transcript has text OR when 2+ seconds of audio has been captured.
  // Real transcription happens server-side from the audio blob — live captions are cosmetic.
  const canSubmit =
    !isAwaitingResponse &&
    !networkPaused &&
    !micError &&
    (transcript.trim().length > 0 || elapsedMs >= 2000);

  const handleDeviceSelect = useCallback((id) => { setSelectedDeviceId(id); setDevicePopoverOpen(false); }, []);
  const handleCancelConfirm = useCallback(() => { setConfirmOpen(false); onCancel(); }, [onCancel]);
  const handleRequestCancel = useCallback(() => setConfirmOpen(true), []);

  const statusLabel = useMemo(() => {
    if (isAwaitingResponse) return "Processing";
    if (!online) return "Waiting for connection";
    if (micError) return "Mic unavailable";
    if (manualMute) return "Paused";
    return "Listening";
  }, [isAwaitingResponse, online, micError, manualMute]);

  const isListening = statusLabel === "Listening";

  const criticalBlock = useMemo(() => {
    if (!online) return {
      kind: "offline",
      icon: <WifiOff size={40} strokeWidth={2.2} absoluteStrokeWidth />,
      title: "You’re offline",
      description: "Recording is paused until you’re back online. Your transcript is safe — everything resumes automatically once the connection returns.",
      submitBlocked: true
    };
    if (micError) return {
      kind: "mic",
      icon: <MicOff size={40} strokeWidth={2.2} absoluteStrokeWidth />,
      title: "Microphone unavailable",
      description: "Please allow microphone access in your browser. Submit is paused until the mic is working again — your transcript so far is safe.",
      submitBlocked: true
    };
    return null;
  }, [online, micError]);

  const miniBanner = useMemo(() => {
    if (!online) return { tone: "offline", icon: <WifiOff size={12} strokeWidth={2.4} />, message: "Offline — recording on hold" };
    if (micError) return { tone: "error", icon: <AlertCircle size={12} strokeWidth={2.4} />, message: micError.length > 40 ? micError.slice(0, 38) + "…" : micError };
    return null;
  }, [online, micError]);

  useEffect(() => {
    if (criticalBlock) {
      setManualMute(true);
    }
  }, [criticalBlock]);

  const liveHasText = hasTranscriptContent(transcript);
  const submittedHasText = hasTranscriptContent(submittedTranscript);
  const processingHasText = hasTranscriptContent(processingTranscript);
  const rawEffectiveTranscript = processingHasText ? processingTranscript :
    (isAwaitingResponse && submittedHasText ? submittedTranscript : liveHasText ? transcript : "");

  const frozenTranscriptRef = useRef(null);
  if (criticalBlock) {
    if (frozenTranscriptRef.current === null) frozenTranscriptRef.current = rawEffectiveTranscript;
  } else if (frozenTranscriptRef.current !== null) {
    frozenTranscriptRef.current = null;
  }
  const effectiveTranscript = frozenTranscriptRef.current ?? rawEffectiveTranscript;
  const effectiveTranscriptText = transcriptToText(effectiveTranscript);
  const hasTranscript = hasTranscriptContent(effectiveTranscript);

  useEffect(() => {
    const root = typeof document !== "undefined" ? document.documentElement : null;
    if (!root) return;
    let raf = 0;
    let smoothed = 0;
    let lastLevelPublished = -1;
    const tick = () => {
      const target = paused ? 0 : levelRef.current;
      const rate = target > smoothed ? 0.55 : 0.22;
      smoothed += (target - smoothed) * rate;
      if (target < 0.005 && smoothed < 0.01) smoothed = 0;
      const shaped = Math.tanh(smoothed * 2.2) * 0.40;
      const clamped = Math.max(0, Math.min(0.40, shaped));
      const rounded = Math.round(clamped * 1000) / 1000;
      if (rounded !== lastLevelPublished) {
        root.style.setProperty("--vrx-live-level", rounded.toFixed(3));
        lastLevelPublished = rounded;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.style.setProperty("--vrx-live-level", "0");
    };
  }, [paused, levelRef]);

  useEffect(() => {
    playVoiceRxStartSound();
  }, []);

  const lastErrorToneRef = useRef(null);
  useEffect(() => {
    const errorKey = criticalBlock ? `${criticalBlock.kind}:${criticalBlock.title}` : null;
    if (!errorKey) {
      lastErrorToneRef.current = null;
      return;
    }
    if (lastErrorToneRef.current === errorKey) return;
    lastErrorToneRef.current = errorKey;
    playVoiceRxErrorSound();
  }, [criticalBlock]);

  return (
    <>
      <div
        ref={rootRef}
        className={[styles.root, !isPanelVisible && styles.invisible].filter(Boolean).join(" ")}
        aria-hidden={!isPanelVisible}>

        <div className={styles.bgTransparent} aria-hidden />

        <div
          className={[styles.ambientFooterWash, "pointer-events-none"].join(" ")}
          aria-hidden
          style={{ opacity: "calc(0.78 + var(--vrx-live-level, 0) * 0.35)" }} />

        {/* Top bar */}
        <div className={[
          styles.topBar,
          isCompactLayout ? styles.topBarCompact : styles.topBarNormal
        ].join(" ")}>
          <span className={["vrx-mode-heading pointer-events-auto", styles.modeHeadingChipIn].join(" ")}>
            <button
              type="button"
              onClick={handleRequestCancel}
              aria-label="Go back"
              className={styles.backBtn}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className={[styles.modeHeadingLabel, styles.modeHeadingLabelText].join(" ")}>
              {mode === "ambient_consultation" ? "Conversation Mode" : "Dictation Mode"}
            </span>
          </span>

          <button
            type="button"
            onClick={onCollapse}
            aria-label="Minimize agent"
            className={["vrx-agent-collapse-tag pointer-events-auto", styles.collapseChipIn].join(" ")}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 3v18" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 9l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className={styles.mainBody}>
          {bottomLoaderActive ? (
            <div className={[
              "vrx-transcript-zone-in",
              styles.processingZone,
              isCompactLayout ? styles.processingZoneCompact : styles.processingZoneNormal,
              isHandoffExiting && "vrx-shiner-handoff-exit"
            ].filter(Boolean).join(" ")}>
              <VoiceTranscriptProcessingCard
                mode={mode === "ambient_consultation" ? "ambient_consultation" : "dictation"}
                transcript={processingTranscript}
                transcriptPending={!hasTranscriptContent(processingTranscript)} />

              <div className={["vrx-shiner-loader", styles.shinerLoader, isHandoffExiting && "vrx-bottom-loader--exit"].filter(Boolean).join(" ")}>
                <CaptionCarousel />
                <div className={styles.progressTrack}>
                  <span
                    aria-hidden
                    className={["vrx-progress-fill", styles.progressFill].join(" ")} />
                  <span aria-hidden className="vrx-progress-sheen absolute inset-y-0 left-0 block w-[40%] rounded-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className={[
              styles.transcriptZone,
              isCompactLayout ? styles.transcriptZoneCompact : styles.transcriptZoneNormal,
              dockExiting && "vrx-transcript-zone--exit"
            ].filter(Boolean).join(" ")}>
              <div className={[styles.transcriptFadeTop, "pointer-events-none"].join(" ")} aria-hidden />
              <div className={[styles.transcriptFadeBottom, "pointer-events-none"].join(" ")} aria-hidden />

              {!criticalBlock || hasTranscript ? (
                <div
                  ref={transcriptRef}
                  className={[
                    "vrx-scroll",
                    styles.transcriptScrollBase,
                    criticalBlock && hasTranscript ? styles.transcriptBlurred : "",
                    isCompactLayout ? styles.transcriptScrollCompact : styles.transcriptScroll
                  ].filter(Boolean).join(" ")}>
                  {hasTranscript ? (
                      <AnimatedTranscript
                      text={effectiveTranscriptText}
                      paused={paused}
                      className={[
                        styles.transcriptText,
                        isCompactLayout ? styles.transcriptTextCompact : styles.transcriptTextNormal
                      ].join(" ")} />
                  ) : (
                    <div className={["flex flex-col items-center justify-center text-center", styles.placeholderIn].join(" ")}>
                      <p className={[styles.placeholderText, isCompactLayout ? styles.placeholderTextCompact : styles.placeholderTextNormal].join(" ")}>
                        Start speaking, you&rsquo;ll see the caption here
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              {criticalBlock && (
                <div
                  className={styles.criticalOverlay}
                  role="status"
                  aria-live="polite">
                  <span className={styles.emptyMark} aria-hidden>
                    <span className={styles.emptyHalo1} />
                    <span className={styles.emptyHalo2} />
                    <span className={styles.emptyIconCircle}>
                      {criticalBlock.icon}
                    </span>
                  </span>
                  <h3 className={styles.criticalTitle}>{criticalBlock.title}</h3>
                  <p className={[styles.criticalDesc, isCompactLayout ? styles.criticalDescCompact : styles.criticalDescNormal].join(" ")}>
                    {criticalBlock.description}
                  </p>
                  {criticalBlock.kind === "mic" && (
                    <button
                      type="button"
                      onClick={retryMic}
                      className={styles.retryMicBtn}>
                      <Mic size={14} strokeWidth={2.2} aria-hidden />
                      Allow microphone access
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bottom zone */}
          {bottomLoaderActive ? null : (
            <div className={["vrx-bottom-block", styles.bottomBlock, dockExiting && "vrx-bottom-block--exit"].filter(Boolean).join(" ")}>
              {!criticalBlock ? (
                <div
                  className={styles.waveformContainer}
                  style={{
                    "--vrx-waveform-margin-x": isCompactLayout ? "-16px" : "-22px",
                    "--vrx-waveform-margin-top": isCompactLayout ? "20px" : "28px",
                    "--vrx-waveform-margin-bottom": isCompactLayout ? "10px" : "14px",
                    "--vrx-waveform-width": isCompactLayout ? "calc(100% + 32px)" : "calc(100% + 44px)"
                  }}>
                  <VoiceRxSiriWaveform
                    stream={stream}
                    paused={paused}
                    levelRef={levelRef}
                    className={[
                      "relative px-0",
                      styles.waveformOpacity,
                      isCompactLayout ? styles.waveformCompact : styles.waveformNormal
                    ].join(" ")} />
                </div>
              ) : (
                <div className={styles.errorSpacer} aria-hidden />
              )}

              {/* CTAs */}
              <div className={[
                styles.ctaRow,
                isCompactLayout ? styles.ctaRowCompact : styles.ctaRowNormal
              ].join(" ")}>
                <button
                  type="button"
                  onClick={handleRequestCancel}
                  aria-label="End voice consultation"
                  className="vrx-lg-btn vrx-close-btn group relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] transition-transform active:scale-[0.94]">
                  <span className="vrx-lg-surface" aria-hidden />
                  <span className="vrx-lg-sheen" aria-hidden />
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" className="relative text-[#DC2626] transition-colors">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <span className="vrx-cta-divider" aria-hidden />

                <div className={[
                  "vrx-lg-btn relative flex h-[42px] items-stretch overflow-hidden rounded-[12px] transition-opacity",
                  (criticalBlock || isAwaitingResponse) ? styles.micSegmentDimmed : "",
                  criticalBlock ? styles.micSegmentNoPointer : "",
                  manualMute ? "vrx-mic-muted" : ""
                ].filter(Boolean).join(" ")}>
                  <span className="vrx-lg-surface" aria-hidden />
                  <span className="vrx-lg-sheen" aria-hidden />

                  <button
                    type="button"
                    onClick={() => setManualMute((v) => !v)}
                    disabled={networkPaused || isAwaitingResponse}
                    aria-label={manualMute ? "Unmute microphone" : "Mute microphone"}
                    aria-pressed={manualMute}
                    className={[
                      styles.micBtn,
                      manualMute ? styles.micBtnMuted : styles.micBtnNormal
                    ].join(" ")}>
                    <span className={styles.micIconWrap}>
                      {manualMute ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M16.4201 6.41965V7.57965L9.14008 14.8596C8.18008 13.9896 7.58008 12.7096 7.58008 11.3396V6.41965C7.58008 4.35965 8.98008 2.64965 10.8801 2.15965C11.0701 2.10965 11.2501 2.26965 11.2501 2.45965V3.99965C11.2501 4.40965 11.5901 4.74965 12.0001 4.74965C12.4101 4.74965 12.7501 4.40965 12.7501 3.99965V2.45965C12.7501 2.26965 12.9301 2.10965 13.1201 2.15965C15.0201 2.64965 16.4201 4.35965 16.4201 6.41965Z" />
                          <path d="M19.81 9.81012V11.4001C19.81 15.4701 16.68 18.8201 12.7 19.1701V21.3001C12.7 21.6901 12.39 22.0001 12 22.0001C11.61 22.0001 11.3 21.6901 11.3 21.3001V19.1701C10.21 19.0701 9.18001 18.7501 8.26001 18.2401L9.29001 17.2101C10.11 17.5901 11.03 17.8101 12 17.8101C15.54 17.8101 18.42 14.9301 18.42 11.4001V9.81012C18.42 9.43012 18.73 9.12012 19.12 9.12012C19.5 9.12012 19.81 9.43012 19.81 9.81012Z" />
                          <path d="M16.42 10.0801V11.5301C16.42 14.1101 14.2 16.1801 11.56 15.9301C11.28 15.9001 11 15.8501 10.74 15.7601L16.42 10.0801Z" />
                          <path d="M21.7701 2.22988C21.4701 1.92988 20.9801 1.92988 20.6801 2.22988L7.23012 15.6799C6.20012 14.5499 5.58012 13.0499 5.58012 11.3999V9.80988C5.58012 9.42988 5.27012 9.11988 4.88012 9.11988C4.50012 9.11988 4.19012 9.42988 4.19012 9.80988V11.3999C4.19012 13.4299 4.97012 15.2799 6.24012 16.6699L2.22012 20.6899C1.92012 20.9899 1.92012 21.4799 2.22012 21.7799C2.38012 21.9199 2.57012 21.9999 2.77012 21.9999C2.97012 21.9999 3.16012 21.9199 3.31012 21.7699L21.7701 3.30988C22.0801 3.00988 22.0801 2.52988 21.7701 2.22988Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M19.12 9.12c-.39 0-.7.31-.7.7v1.58c0 3.54-2.88 6.42-6.42 6.42s-6.42-2.88-6.42-6.42V9.81c0-.39-.31-.7-.7-.7-.39 0-.7.31-.7.7v1.58c0 4.07 3.13 7.42 7.12 7.78v2.13c0 .39.31.7.7.7.39 0 .7-.31.7-.7v-2.13c3.98-.35 7.12-3.71 7.12-7.78V9.81a.707.707 0 0 0-.7-.69Z" />
                          <path d="M12 2c-2.44 0-4.42 1.98-4.42 4.42v5.12c0 2.44 1.98 4.42 4.42 4.42s4.42-1.98 4.42-4.42V6.42C16.42 3.98 14.44 2 12 2Zm1.31 6.95c-.07.26-.3.43-.56.43-.05 0-.1-.01-.15-.02-.39-.11-.8-.11-1.19 0-.32.09-.63-.1-.71-.41-.09-.31.1-.63.41-.71.59-.16 1.21-.16 1.8 0 .3.08.48.4.4.71Zm.53-1.94c-.09.24-.31.38-.55.38-.07 0-.14-.01-.2-.03-.69-.26-1.47-.26-2.17 0-.3.11-.63-.05-.74-.35-.11-.3.05-.63.35-.74.97-.35 2.03-.35 3 0 .3.11.46.44.31.74Z" />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div className="vrx-lg-divider" aria-hidden />

                  <Popover open={devicePopoverOpen} onOpenChange={setDevicePopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        disabled={!!criticalBlock || isAwaitingResponse}
                        aria-label="Choose microphone"
                        className={[
                          styles.devicePickerBtn,
                          manualMute ? styles.devicePickerMuted : styles.devicePickerNormal
                        ].join(" ")}>
                        <ChevronDown
                          size={16}
                          strokeWidth={2.5}
                          className={devicePopoverOpen ? styles.chevronOpen : styles.chevronClosed}
                          aria-hidden />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="center" side="top" sideOffset={8}
                      data-voice-allow
                      className={styles.devicePopoverContent}>
                      <div className={styles.devicePopoverHeader}>Microphone</div>
                      {devices.length === 0 ? (
                        <div className={styles.devicePopoverEmpty}>{micError ? micError : "No input devices detected"}</div>
                      ) : (
                        devices.map((d, i) => {
                          const isSelected = activeDevice?.deviceId === d.deviceId || (selectedDeviceId ? selectedDeviceId === d.deviceId : i === 0);
                          return (
                            <button key={d.deviceId || i} type="button" onClick={() => handleDeviceSelect(d.deviceId)}
                              className={[styles.deviceItem, isSelected ? styles.deviceItemSelected : styles.deviceItemNormal].join(" ")}>
                              <span className={styles.deviceItemLabel}>{d.label || `Microphone (${(d.deviceId || "default").slice(0, 6)})`}</span>
                              {isSelected && <Check size={14} className={styles.deviceItemCheck} />}
                            </button>
                          );
                        })
                      )}
                    </PopoverContent>
                  </Popover>
                </div>

                <span className="vrx-cta-divider" aria-hidden />

                {isAwaitingResponse ? (
                  <div
                    role="status"
                    aria-label="Processing consultation"
                    className={[styles.processingLoader, "relative flex h-[42px] items-center justify-center gap-[8px] rounded-[12px]"].join(" ")}>
                    <span aria-hidden className={styles.processingSpinner} />
                    <span className={styles.processingLabel}>Processing</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitClick}
                    disabled={!canSubmit}
                    aria-label="Submit consultation"
                    style={{ paddingLeft: 18, paddingRight: 22 }}
                    className={[
                      "vrx-submit-hero group relative flex h-[42px] items-center gap-[8px] overflow-hidden rounded-[12px] text-white transition-transform",
                      canSubmit ? styles.submitEnabled : "vrx-submit-dim cursor-not-allowed",
                      criticalBlock ? styles.submitCritical : ""
                    ].filter(Boolean).join(" ")}>
                    <span className="vrx-submit-gradient absolute inset-0 rounded-[inherit]" aria-hidden />
                    <span className={[styles.submitTopSheen, "pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-[inherit]"].join(" ")} aria-hidden />
                    {canSubmit && (
                      <span aria-hidden className="vrx-submit-sheen pointer-events-none absolute inset-y-0 left-0 z-0 w-[40%]" />
                    )}
                    <span className="relative z-[1] flex items-center gap-[8px]">
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M20.46 6.17969L8.82003 17.8197L3.53003 12.5297" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-semibold tracking-[0.2px] text-[14px]">Submit</span>
                    </span>
                  </button>
                )}
              </div>

              {/* Status indicator */}
              <div className={styles.statusRow}>
                <div
                  className={[
                    "vrx-status-card relative inline-flex items-center gap-[8px] rounded-t-[12px] rounded-b-none bg-white/60 pl-[12px] pr-[14px] pt-[7px] pb-[10px] backdrop-blur-[10px] transition-all duration-200",
                    criticalBlock ? "vrx-status-card--error" : manualMute ? "vrx-status-card--paused" : ""
                  ].filter(Boolean).join(" ")}
                  role="status"
                  aria-live="polite">
                  {criticalBlock ? (
                    <span className="inline-flex h-[14px] w-[14px] items-center justify-center text-red-500">
                      <AlertCircle size={14} strokeWidth={2.4} />
                    </span>
                  ) : isListening ? (
                    <span className="relative inline-flex h-[10px] w-[10px] items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-rose-400" />
                      <span className={["absolute inset-0 rounded-full bg-rose-400/55", styles.recRing].join(" ")} />
                    </span>
                  ) : manualMute ? (
                    <span className="inline-flex h-[10px] w-[10px] items-center justify-center text-amber-500/80">
                      <svg width={7} height={9} viewBox="0 0 8 10" fill="none" aria-hidden>
                        <rect x="0" y="0" width="3" height="10" rx="1" fill="currentColor" />
                        <rect x="5" y="0" width="3" height="10" rx="1" fill="currentColor" />
                      </svg>
                    </span>
                  ) : (
                    <span className={styles.statusDot} />
                  )}

                  <span className={[styles.statusText, criticalBlock ? styles.statusTextError : styles.statusTextNormal].join(" ")}>
                    {statusLabel}
                    {!criticalBlock && (isListening || manualMute) && elapsedMs > 0 && (
                      <span className={styles.elapsedInStatus}>({elapsedLabel})</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <TPConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Close this voice consultation?"
          warning="Are you sure you want to close this voice Rx? If you close it, no data will be stored."
          primaryLabel="Keep recording"
          onPrimary={() => setConfirmOpen(false)}
          secondaryLabel="Discard & Go Back"
          secondaryTone="destructive"
          onSecondary={handleCancelConfirm} />
      </div>

      {/* Portaled mini controller when panel is hidden */}
      {mounted && !isPanelVisible &&
        createPortal(
          <VoiceRxMiniFab
            stream={stream} paused={paused} levelRef={levelRef} elapsedLabel={elapsedLabel}
            statusLabel={statusLabel} manualMute={manualMute} isAwaitingResponse={isAwaitingResponse}
            canSubmit={canSubmit} banner={miniBanner}
            onToggleMute={() => setManualMute((v) => !v)}
            onSubmit={handleSubmitClick}
            onExpand={onExpand ?? (() => {})}
            onRequestCancel={handleRequestCancel} />,
          document.body
        )}
    </>
  );
}
