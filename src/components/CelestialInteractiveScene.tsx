import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, RefreshCw, Wand2, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface RippleParticle {
  id: number;
  x: number;
  y: number;
  radius: number;
  alpha: number;
  color: string;
}

interface CelestialInteractiveSceneProps {
  onContinue: () => void;
  onPrev: () => void;
}

export default function CelestialInteractiveScene({ onContinue }: CelestialInteractiveSceneProps) {
  const [rotation, setRotation] = useState({ x: 20, y: -15 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [mode, setMode] = useState<'radiance' | 'starlight'>('radiance');
  const [interactionCount, setInteractionCount] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<RippleParticle[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const triggerRipple = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const colors = ['#fae8b2', '#e6c887', '#7cd3cf', '#ffffff', '#ffd275'];
    for (let i = 0; i < 7; i++) {
      ripplesRef.current.push({
        id: Math.random(),
        x: x + (Math.random() * 24 - 12),
        y: y + (Math.random() * 24 - 12),
        radius: 2.5 + Math.random() * 6,
        alpha: 0.95,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setInteractionCount((prev) => prev + 1);

    const freqs = [329.63, 392.0, 440.0, 523.25, 659.25, 783.99];
    const pickedFreq = freqs[Math.floor(Math.random() * freqs.length)];
    audioEngine.playTone(pickedFreq, 1.2, 0.025);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const p = ripplesRef.current[i];
        p.alpha -= 0.02;
        p.radius += 0.9;
        if (p.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    triggerRipple(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteracting || !lastPosRef.current) return;
    const deltaX = e.clientX - lastPosRef.current.x;
    const deltaY = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-50, Math.min(50, prev.x - deltaY * 0.45)),
      y: Math.max(-65, Math.min(65, prev.y + deltaX * 0.45))
    }));

    if (Math.random() > 0.4) {
      triggerRipple(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInteracting(false);
    lastPosRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const resetRotation = () => {
    setRotation({ x: 20, y: -15 });
    audioEngine.playStarSparkle();
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] flex flex-col items-center justify-between px-6 pt-16 pb-16 select-none overflow-hidden">
      {/* Background Environment: Astrological Coordinate Circles */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full border border-[#1b4352]/30" />
        <div className="absolute w-[360px] sm:w-[580px] h-[360px] sm:h-[580px] rounded-full border border-dashed border-[#e6c887]/15" />
      </div>

      {/* Scene Header */}
      <div className="max-w-2xl mx-auto text-center shrink-0 z-20">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#e6c887] font-medium block mb-1">
          {birthdayConfig.celestialScene.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#faeed1] font-normal tracking-tight">
          {birthdayConfig.celestialScene.headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#9ec0cc] font-light max-w-md mx-auto mt-1 leading-relaxed">
          {birthdayConfig.celestialScene.description}
        </p>
      </div>

      {/* Substantial Desktop Celestial Centerpiece */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[540px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing touch-none my-auto z-10"
        style={{ perspective: '1200px' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

        {/* Dynamic Multi-layered Ambient Glow */}
        <div
          className={`absolute w-72 sm:w-[420px] h-72 sm:h-[420px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            mode === 'radiance'
              ? 'bg-radial from-[#1e5868]/60 via-[#103540]/30 to-transparent'
              : 'bg-radial from-[#d4af37]/35 via-[#194b59]/25 to-transparent'
          }`}
        />

        {/* 3D Celestial Astrolabe Centerpiece */}
        <div
          className="relative w-[280px] sm:w-[400px] lg:w-[440px] h-[280px] sm:h-[400px] lg:h-[440px] flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {/* Ring 1 - Grand Outer Gold Ring with Cardinal Stars */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#e6c887]/60 shadow-[0_0_35px_rgba(230,200,135,0.35)] animate-spin"
            style={{
              animationDuration: mode === 'starlight' ? '22s' : '44s',
              transform: 'rotateZ(15deg) rotateX(68deg)'
            }}
          >
            {/* North, South, East, West Star Beacons */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#faeed1] shadow-[0_0_16px_#faeed1]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#e6c887] shadow-[0_0_12px_#e6c887]" />
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#faeed1]" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#faeed1]" />
          </div>

          {/* Ring 2 - Concentric Mid Teal Celestial Orbit */}
          <div
            className="absolute inset-6 sm:inset-9 rounded-full border border-[#7cd3cf]/55 shadow-[0_0_30px_rgba(124,211,207,0.3)] animate-spin"
            style={{
              animationDuration: '32s',
              animationDirection: 'reverse',
              transform: 'rotateZ(-28deg) rotateY(62deg)'
            }}
          >
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#7cd3cf] shadow-[0_0_14px_#7cd3cf]" />
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#faeed1]" />
          </div>

          {/* Ring 3 - Equatorial Dashed Latitude Ring */}
          <div
            className="absolute inset-12 sm:inset-18 rounded-full border-2 border-dashed border-[#fae8b2]/75 animate-spin shadow-[0_0_20px_rgba(250,232,178,0.25)]"
            style={{
              animationDuration: '20s',
              transform: 'rotateZ(48deg) rotateX(45deg)'
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#faeed1]" />
          </div>

          {/* Ring 4 - Deep Indigo Axis Ring */}
          <div
            className="absolute inset-20 sm:inset-28 rounded-full border border-[#e6c887]/40 animate-spin"
            style={{
              animationDuration: '14s',
              animationDirection: 'reverse',
              transform: 'rotateZ(-55deg) rotateY(35deg)'
            }}
          />

          {/* Central Luminous Core ("Keti's Star") */}
          <div className="relative w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-gradient-to-tr from-[#0a232c] via-[#1a4a58] to-[#e6c887] p-1.5 shadow-[0_0_60px_rgba(230,200,135,0.65)] flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-full bg-[#071922] flex flex-col items-center justify-center border-2 border-[#e6c887]/80">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#faeed1] tracking-wide">
                K
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#e6c887] font-medium mt-0.5">
                Radiance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact, Refined Bottom Toolbar */}
      <div className="shrink-0 flex items-center justify-between w-full max-w-xl mx-auto gap-4 z-20">
        {/* Mode Toggles */}
        <div className="flex items-center gap-1.5 p-1 bg-[#091e26]/90 border border-[#173e4d] rounded-2xl text-xs backdrop-blur-md">
          <button
            onClick={() => {
              setMode('radiance');
              audioEngine.playStarSparkle();
            }}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'radiance'
                ? 'bg-[#143d4c] text-[#faeed1] font-medium shadow-sm'
                : 'text-[#8ab0be] hover:text-[#faeed1]'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#e6c887]" />
            <span>Radiance</span>
          </button>
          <button
            onClick={() => {
              setMode('starlight');
              audioEngine.playTone(659.25, 1.5, 0.04);
            }}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'starlight'
                ? 'bg-[#143d4c] text-[#faeed1] font-medium shadow-sm'
                : 'text-[#8ab0be] hover:text-[#faeed1]'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-[#7cd3cf]" />
            <span>Orbit</span>
          </button>
          <button
            onClick={resetRotation}
            type="button"
            className="p-1.5 text-[#8ab0be] hover:text-[#faeed1] rounded-xl transition-colors cursor-pointer"
            title="Reset position"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Action Button to Next Scene */}
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_25px_rgba(230,200,135,0.45)] cursor-pointer active:scale-95 shadow-md"
        >
          <span>View Portraits</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#061217]" />
        </button>
      </div>
    </section>
  );
}
