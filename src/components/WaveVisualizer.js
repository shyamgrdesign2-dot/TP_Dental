import React, { useEffect, useRef, useCallback } from 'react';

const WIDTH = 300;
const HEIGHT = 60;

const opts = {
  smoothing: 0.85,
  fft: 8,
  minDecibels: -70,
  scale: 0,
  glow: 50,
  color1: [124, 58, 237],
  color2: [79, 70, 229],
  color3: [192, 38, 211],
  fillOpacity: 0.35,
  lineWidth: 0,
  blend: 'lighter',
  shift: 35,
  width: 50,
  amp: 0.4,
};

const shuffle = [1, 3, 0, 4, 2];

function VoiceWaveVisualizer({ isRecording, isPaused }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const freqsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const initializedRef = useRef(false);
  const containerRef = useRef(null);
  const streamRef = useRef(null);
  const isPausedRef = useRef(isPaused);

  const range = (i) => Array.from(Array(i).keys());

  const freq = (channel, i) => {
    const band = 2 * channel + shuffle[i] * 6;
    return freqsRef.current ? freqsRef.current[band] : 0;
  };

  const scale = (i) => {
    const x = Math.abs(2 - i);
    const s = 3 - x;
    return (s / 3) * opts.amp;
  };

  const path = (ctx, channel, canvasWidth) => {
    const color = opts[`color${channel + 1}`];

    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);
    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
    gradient.addColorStop(0.2, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opts.fillOpacity})`);
    gradient.addColorStop(0.8, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opts.fillOpacity})`);
    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

    ctx.fillStyle = gradient;
    ctx.shadowColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`;
    ctx.lineWidth = opts.lineWidth;
    ctx.shadowBlur = opts.glow;
    ctx.globalCompositeOperation = opts.blend;

    const m = HEIGHT / 2;
    const offset = (canvasWidth - 15 * opts.width) / 2;
    const x = range(15).map((i) => offset + channel * opts.shift + i * opts.width);
    const y = range(5).map((i) => Math.max(0, m - scale(i) * freq(channel, i)));
    const h = 2 * m;

    ctx.beginPath();
    ctx.moveTo(0, m);
    ctx.lineTo(x[0], m + 1);

    ctx.bezierCurveTo(x[1], m + 1, x[2], y[0], x[3], y[0]);
    ctx.bezierCurveTo(x[4], y[0], x[4], y[1], x[5], y[1]);
    ctx.bezierCurveTo(x[6], y[1], x[6], y[2], x[7], y[2]);
    ctx.bezierCurveTo(x[8], y[2], x[8], y[3], x[9], y[3]);
    ctx.bezierCurveTo(x[10], y[3], x[10], y[4], x[11], y[4]);

    ctx.bezierCurveTo(x[12], y[4], x[12], m, x[13], m);
    ctx.lineTo(canvasWidth, m + 1);
    ctx.lineTo(x[13], m - 1);

    ctx.bezierCurveTo(x[12], m, x[12], h - y[4], x[11], h - y[4]);
    ctx.bezierCurveTo(x[10], h - y[4], x[10], h - y[3], x[9], h - y[3]);
    ctx.bezierCurveTo(x[8], h - y[3], x[8], h - y[2], x[7], h - y[2]);
    ctx.bezierCurveTo(x[6], h - y[2], x[6], h - y[1], x[5], h - y[1]);
    ctx.bezierCurveTo(x[4], h - y[1], x[4], h - y[0], x[3], h - y[0]);
    ctx.bezierCurveTo(x[2], h - y[0], x[1], m, x[0], m);

    ctx.lineTo(0, m);
    ctx.fill();
  };

  const drawPausedLine = (ctx, canvasWidth) => {
    const m = HEIGHT / 2;
    const padding = 20;
    const startX = padding;
    const endX = canvasWidth - padding;
    const midX = canvasWidth / 2;

    const gradient = ctx.createLinearGradient(startX, m, endX, m);
    gradient.addColorStop(0, `rgba(${opts.color1[0]}, ${opts.color1[1]}, ${opts.color1[2]}, 0.6)`);
    gradient.addColorStop(0.5, `rgba(${opts.color2[0]}, ${opts.color2[1]}, ${opts.color2[2]}, 0.6)`);
    gradient.addColorStop(1, `rgba(${opts.color3[0]}, ${opts.color3[1]}, ${opts.color3[2]}, 0.6)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, m);
    ctx.quadraticCurveTo(midX, m - 3, endX, m);
    ctx.stroke();
  };

  // Update ref whenever isPaused changes
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const visualize = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const freqs = freqsRef.current;
    const container = containerRef.current;

    if (!canvas || !analyser || !freqs || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = container.offsetWidth || WIDTH;
    const canvasWidth = Math.max(containerWidth, 300);

    canvas.width = canvasWidth;
    canvas.height = HEIGHT;

    analyser.smoothingTimeConstant = opts.smoothing;
    analyser.fftSize = Math.pow(2, opts.fft);
    analyser.minDecibels = opts.minDecibels;
    analyser.maxDecibels = 0;
    
    // Get fresh frequency data
    analyser.getByteFrequencyData(freqs);

    ctx.clearRect(0, 0, canvasWidth, HEIGHT);

    // Use ref to get current pause state (always up-to-date)
    const currentlyPaused = isPausedRef.current;

    if (currentlyPaused) {
      drawPausedLine(ctx, canvasWidth);
      animationFrameRef.current = requestAnimationFrame(visualize);
      return;
    }

    // When not paused, check for audio and draw waves
    const hasAudio = freqs.some((value) => value > 0);

    if (!hasAudio) {
      // If no audio detected, show the paused line
      drawPausedLine(ctx, canvasWidth);
    } else {
      // Draw wave visualization when audio is present
      for (let channel = 0; channel < 3; channel++) {
        path(ctx, channel, canvasWidth);
      }
    }

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(visualize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startVisualizer = useCallback(async () => {
    if (initializedRef.current || !isRecording) return;

    if (!canvasRef.current) {
      console.error('Canvas not ready');
      return;
    }

    initializedRef.current = true;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const freqs = new Uint8Array(analyser.frequencyBinCount);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      freqsRef.current = freqs;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const input = audioContext.createMediaStreamSource(stream);
      input.connect(analyser);

      // Start visualization loop
      if (!animationFrameRef.current) {
        visualize();
      }
    } catch (err) {
      console.error('Error accessing microphone:', err);
      initializedRef.current = false;
    }
  }, [isRecording, visualize]);

  useEffect(() => {
    if (isRecording && !initializedRef.current) {
      const timer = setTimeout(() => {
        startVisualizer();
      }, 100);

      return () => clearTimeout(timer);
    } else if (!isRecording && initializedRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Stop media stream tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Close audio context only if it's not already closed
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch((err) => {
          console.error('Error closing audio context:', err);
        });
        audioContextRef.current = null;
      }
      
      analyserRef.current = null;
      freqsRef.current = null;
      initializedRef.current = false;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Stop media stream tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Close audio context only if it's not already closed
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch((err) => {
          console.error('Error closing audio context:', err);
        });
      }
    };
  }, [isRecording, startVisualizer]);

  useEffect(() => {
    if (isRecording && initializedRef.current && analyserRef.current) {
      // Resume audio context if it was suspended (browser autoplay policy)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch((err) => {
          console.error('Error resuming audio context:', err);
        });
      }

      // Ensure animation loop is running
      // Since visualize uses refs, it will always have the latest pause state
      if (!animationFrameRef.current) {
        visualize();
      }
    } else if (!isRecording && animationFrameRef.current) {
      // Stop animation when not recording
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [isRecording, visualize]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '300px',
        flex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '60px',
        }}
      />
    </div>
  );
}

export default VoiceWaveVisualizer;
export { VoiceWaveVisualizer };
