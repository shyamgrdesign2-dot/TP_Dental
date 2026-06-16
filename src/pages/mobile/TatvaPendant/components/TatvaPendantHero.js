import React, { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import { useNeoConsultationContext } from '../../../../components/neo/NeoConsultationProvider';
import { useTatvaPendantData } from '../context/TatvaPendantContext';
import {
  computeCapturedTodaySeconds,
  formatCapturedDuration,
  formatLiveRecordingDuration,
  getLastRecordingStartedAt,
  NEO_WS_PHASE,
  rssiToLabel,
} from '../../../../utils/neoConsultationUtils';
import { getDeviceModelLabel } from '../utils/tpDisplayUtils';
import {
  HeroBatteryMediumIcon,
  HeroBluetoothIcon,
  HeroPauseFilledIcon,
  HeroTimerIcon,
  Microphone2,
  PendantBroadcastIcon,
  TpIcon,
} from './TpIcons';
import './TatvaPendantHero.scss';

const DEFAULT_DEVICE_NAME = 'Tatva Pendant';

function HeroWaveCanvas({ isLive, rms = 0 }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const centerY = height * 0.52;
      const liveBoost = isLive ? Math.min(rms / 3500, 1) : 0;
      const baseAmp = isLive ? 14 + liveBoost * 14 : 9;
      phaseRef.current += isLive ? 0.045 : 0.012;
      const phase = phaseRef.current;

      const layers = [
        { opacity: 0.28, ampScale: 1.15, phaseOffset: 0, color: [139, 127, 212] },
        { opacity: 0.42, ampScale: 1, phaseOffset: 0.6, color: [183, 169, 240] },
        { opacity: 0.58, ampScale: 0.82, phaseOffset: 1.2, color: [216, 201, 255] },
      ];

      layers.forEach((layer) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const t = x / width;
          const envelope = Math.pow(Math.sin(t * Math.PI), 0.85);
          const wave = Math.sin(t * 10 + phase + layer.phaseOffset) * 0.55
            + Math.sin(t * 18 - phase * 0.7 + layer.phaseOffset) * 0.25
            + Math.sin(t * 6 + phase * 0.4) * 0.2;
          const y = centerY + wave * baseAmp * layer.ampScale * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const [r, g, b] = layer.color;
        const gradient = ctx.createLinearGradient(0, centerY - baseAmp, width, centerY + baseAmp);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${layer.opacity})`);
        gradient.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${layer.opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isLive, rms]);

  return (
    <div className="tp-hero__waveform" aria-hidden>
      <canvas ref={canvasRef} className="tp-hero__wave-canvas" />
    </div>
  );
}

function TatvaPendantHero() {
  const neo = useNeoConsultationContext();
  const { consultationsResponse } = useTatvaPendantData();
  const [liveTick, setLiveTick] = useState(0);

  const isLive = neo?.isRecording || neo?.phase === NEO_WS_PHASE.RECORDING;
  const isConnected = neo?.isConnected;
  const isBusy = neo?.isProcessing || neo?.isTranscribingChunk;

  const deviceName = neo?.pairedDevice?.name || DEFAULT_DEVICE_NAME;
  const deviceModel = neo?.pairedDevice
    ? getDeviceModelLabel(neo.pairedDevice) || '—'
    : isConnected
      ? '—'
      : 'Not paired';

  const rssi = neo?.deviceTelemetry?.rssi ?? neo?.pairedDevice?.rssi;
  const bluetoothLabel = rssi != null
    ? rssiToLabel(rssi).toLowerCase()
    : isConnected
      ? 'connected'
      : '—';

  const batteryPct = neo?.batteryPct ?? neo?.deviceTelemetry?.batteryPercent ?? null;
  const batteryLabel = batteryPct != null ? `${batteryPct}%` : '…';

  const liveStartedAt = isLive
    ? neo?.recordingStartedAt || getLastRecordingStartedAt()
    : null;

  useEffect(() => {
    if (!isLive) return undefined;
    const id = setInterval(() => setLiveTick((tick) => tick + 1), 1000);
    return () => clearInterval(id);
  }, [isLive]);

  const capturedToday = useMemo(() => {
    const totalSeconds = computeCapturedTodaySeconds({
      consultations: consultationsResponse?.consultations || [],
      extraSeconds: neo?.todayCapturedExtraSeconds || 0,
      liveStartedAt,
      now: Date.now(),
    });
    return formatCapturedDuration(totalSeconds);
  }, [
    consultationsResponse,
    neo?.todayCapturedExtraSeconds,
    liveStartedAt,
    liveTick,
  ]);

  const liveSessionSeconds = useMemo(() => {
    if (!liveStartedAt) return 0;
    return Math.max(0, Math.floor((Date.now() - liveStartedAt) / 1000));
  }, [liveStartedAt, liveTick]);

  const heroDurationValue = isLive && liveStartedAt
    ? formatLiveRecordingDuration(liveSessionSeconds)
    : capturedToday;
  const heroDurationLabel = isLive && liveStartedAt ? 'this capture' : 'captured last';

  const capturingSince = useMemo(() => {
    if (!liveStartedAt) return null;
    return moment(liveStartedAt).format('hh:mm A');
  }, [liveStartedAt]);

  const statusPrimary = useMemo(() => {
    if (neo?.isProcessing) return 'Processing capture…';
    if (neo?.isTranscribingChunk) return 'Transcribing…';
    if (isLive) return null;
    if (isConnected) return 'Ready to capture';
    if (neo?.bridgeUnreachable) return 'Bridge offline';
    return 'Not connected';
  }, [neo?.isProcessing, neo?.isTranscribingChunk, isLive, isConnected, neo?.bridgeUnreachable]);

  const sinceLabel = useMemo(() => {
    if (isLive && capturingSince) return `since ${capturingSince}`;
    if (isConnected) return 'Device connected';
    if (neo?.bridgeUnreachable) return 'Start ws_server.py on :8081';
    return 'Pair in Settings';
  }, [isLive, capturingSince, isConnected, neo?.bridgeUnreachable]);

  const handleRecordToggle = () => {
    if (isBusy) return;

    if (neo?.isRecording) {
      neo.toggleRecording(false);
      return;
    }

    if (isConnected) {
      neo.toggleRecording(true);
      return;
    }

    neo.openPairing?.();
  };

  const buttonLabel = isBusy
    ? 'Processing…'
    : isLive
      ? 'Pause'
      : isConnected
        ? 'Record'
        : 'Connect';

  return (
    <section
      className={`tp-hero ${isLive ? 'tp-hero--live' : ''} ${isConnected ? 'tp-hero--connected' : ''}`}
    >
      <div className="tp-hero__blob tp-hero__blob--pink" aria-hidden />
      <div className="tp-hero__blob tp-hero__blob--blue" aria-hidden />
      <div className="tp-hero__blob tp-hero__blob--violet" aria-hidden />
      <div className="tp-hero__border-glow" aria-hidden />
      <div className="tp-hero__gloss" aria-hidden />
      <div className="tp-hero__sheen" aria-hidden />
      <div className="tp-hero__dots" aria-hidden />

      <div className="tp-hero__inner">
        <div className="tp-hero__top">
          <div className="tp-hero__device">
            <span className="tp-hero__device-icon">
              <PendantBroadcastIcon size={16} color="#ffffff" />
            </span>
            <div className="tp-hero__device-copy">
              <p className="tp-hero__device-name">{deviceName}</p>
              <p className="tp-hero__device-model">{deviceModel}</p>
            </div>
          </div>

          {isConnected && (
            <div className="tp-hero__indicators">
              <span className="tp-hero__indicator">
                <HeroBluetoothIcon size={13} />
                {bluetoothLabel}
              </span>
              <span className="tp-hero__indicator">
                <HeroBatteryMediumIcon size={15} />
                {batteryLabel}
              </span>
            </div>
          )}
        </div>

        <div className={`tp-hero__status-row ${isLive ? 'tp-hero__status-row--live' : ''}`}>
          {isLive ? (
            <>
              <span className="tp-hero__live-dot-wrap" aria-hidden>
                <span className="tp-hero__live-dot-ring" />
                <span className="tp-hero__live-dot" />
              </span>
              <span className="tp-hero__live-text">Capturing live</span>
              {capturingSince && (
                <span className="tp-hero__since">{`since ${capturingSince}`}</span>
              )}
            </>
          ) : (
            <>
              <span className="tp-hero__idle-status">{statusPrimary}</span>
              {!isConnected && !neo?.bridgeUnreachable ? (
                <button
                  type="button"
                  className="tp-hero__since tp-hero__since-btn"
                  onClick={() => neo?.openPairing?.()}
                >
                  Pair in Settings
                </button>
              ) : (
                <span className="tp-hero__since">{sinceLabel}</span>
              )}
            </>
          )}
        </div>

        <HeroWaveCanvas isLive={isLive} rms={neo?.rms} />

        <div className="tp-hero__bottom">
          <div className={`tp-hero__captured ${!isLive ? 'tp-hero__captured--idle' : ''}`}>
            {!isLive && (
              <span className="tp-hero__captured-icon" aria-hidden>
                <HeroTimerIcon size={16} color="rgba(255,255,255,0.72)" />
              </span>
            )}
            <div className="tp-hero__captured-copy">
              <p className="tp-hero__captured-value">{heroDurationValue}</p>
              <p className="tp-hero__captured-label">{heroDurationLabel}</p>
            </div>
          </div>

          <button
            type="button"
            className="tp-hero__action-btn"
            onClick={handleRecordToggle}
            disabled={isBusy || neo?.bridgeUnreachable}
          >
            {isLive ? (
              <HeroPauseFilledIcon size={15} color="#0f172a" />
            ) : (
              <TpIcon icon={Microphone2} size={15} color="#0f172a" />
            )}
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

export default TatvaPendantHero;
