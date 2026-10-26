import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, RotateCcw, PartyPopper } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';
import { launchCelebrationConfetti } from '../utils/confetti';

interface BirthdayCakeSceneProps {
  onReplay: () => void;
  onPrev?: () => void;
}

export default function BirthdayCakeScene({ onReplay }: BirthdayCakeSceneProps) {
  const cakeConfig = birthdayConfig.cake;
  const candleCount = cakeConfig.candleCount || 5;

  const [litCandles, setLitCandles] = useState<boolean[]>(
    Array(candleCount).fill(false)
  );
  const [hasBlownCandles, setHasBlownCandles] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const allLit = litCandles.every(Boolean);

  const handleLightCandle = (index: number) => {
    if (litCandles[index]) return;

    setLitCandles((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    audioEngine.playCandleLitSound(index);

    const updated = [...litCandles];
    updated[index] = true;
    if (updated.every(Boolean)) {
      audioEngine.playStarSparkle();
    }
  };

  const handleLightAll = () => {
    setLitCandles(Array(candleCount).fill(true));
    audioEngine.playCelebrationChimes();
  };

  const handleBlowCandles = () => {
    setHasBlownCandles(true);
    setCelebrationActive(true);
    setLitCandles(Array(candleCount).fill(false));
    audioEngine.playCelebrationChimes();

    if (canvasRef.current) {
      launchCelebrationConfetti(canvasRef.current, 5000);
    }
  };

  const handleTriggerConfettiAgain = () => {
    if (canvasRef.current) {
      launchCelebrationConfetti(canvasRef.current, 4000);
    }
    audioEngine.playStarSparkle();
  };

  const handleRelight = () => {
    setHasBlownCandles(false);
    setCelebrationActive(false);
    setLitCandles(Array(candleCount).fill(false));
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] pt-16 pb-16 px-6 z-10 flex flex-col items-center justify-between select-none overflow-y-auto scrollbar-thin">
      {/* Canvas Confetti Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Atmospheric Ambient Warmth */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className={`w-[600px] sm:w-[900px] h-[500px] sm:h-[750px] rounded-full blur-3xl transition-all duration-1000 ${
            allLit || celebrationActive
              ? 'bg-radial from-[#e6c887]/25 via-[#1a4a58]/20 to-transparent'
              : 'bg-radial from-[#123947]/25 via-[#071922]/12 to-transparent'
          }`}
        />
      </div>

      {/* Scene Header */}
      <div className="max-w-2xl mx-auto text-center shrink-0 z-20">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#e6c887] font-medium block mb-1">
          {cakeConfig.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#faeed1] font-normal tracking-tight">
          {cakeConfig.headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#9ec0cc] font-light max-w-md mx-auto mt-1 leading-relaxed">
          {hasBlownCandles
            ? 'Your secret wish has ascended into the starlight.'
            : cakeConfig.subheadline}
        </p>
      </div>

      {/* Substantial Cake Centerpiece Stage */}
      <div className="relative flex-1 w-full max-w-lg mx-auto flex flex-col items-center justify-end pb-4 my-auto min-h-0 z-10">
        {/* CANDLES ROW */}
        <div className="relative z-20 flex items-end justify-center gap-5 sm:gap-7 mb-[-6px]">
          {litCandles.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => handleLightCandle(idx)}
              className="group relative flex flex-col items-center cursor-pointer select-none"
              title={isLit ? 'Lit candle' : 'Tap to light candle'}
            >
              {/* Flame */}
              <div className="h-10 sm:h-12 flex items-end justify-center">
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      className="animate-flame relative"
                    >
                      <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full bg-gradient-to-t from-[#fa982a] via-[#fcd34d] to-[#faeed1] blur-[1px]" />
                      <div className="absolute inset-x-1 bottom-0.5 top-2 rounded-full bg-white blur-[0.5px]" />
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#faeed1]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isLit && !hasBlownCandles && (
                  <div className="w-1 h-3.5 bg-[#4d7280] rounded-t-sm group-hover:bg-[#e6c887] transition-colors" />
                )}

                {hasBlownCandles && !isLit && (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -25 }}
                    transition={{ duration: 1.6 }}
                    className="w-1.5 h-7 bg-gradient-to-t from-gray-400 to-transparent blur-[1px]"
                  />
                )}
              </div>

              {/* Candle Body */}
              <div className="w-4 sm:w-5 h-16 sm:h-20 rounded-t-lg bg-gradient-to-r from-[#d4af37] via-[#faeed1] to-[#c59e2a] shadow-lg border-t border-white/50 flex flex-col justify-between py-1.5 items-center">
                <div className="w-full h-0.5 bg-[#b58c22]/40" />
                <div className="w-full h-0.5 bg-[#b58c22]/40" />
                <div className="w-full h-0.5 bg-[#b58c22]/40" />
              </div>
            </div>
          ))}
        </div>

        {/* CAKE TIERS */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Top Tier */}
          <div className="relative w-56 sm:w-68 h-20 sm:h-24 bg-gradient-to-b from-[#133c4a] via-[#0d2a34] to-[#091f28] rounded-t-3xl border-t-2 border-x border-[#e6c887]/70 shadow-xl flex items-start justify-center pt-2.5">
            <div className="absolute top-0 left-0 right-0 h-3.5 flex justify-around overflow-hidden px-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-4.5 h-3.5 rounded-b-full bg-[#faeed1]/95 shadow-sm" />
              ))}
            </div>
            <span className="font-serif text-sm italic text-[#faeed1] mt-3.5 tracking-widest uppercase font-medium">
              Grace & Radiance
            </span>
          </div>

          {/* Bottom Tier */}
          <div className="relative w-76 sm:w-92 h-24 sm:h-28 bg-gradient-to-b from-[#164454] via-[#0f303b] to-[#0a212a] rounded-t-3xl border-t-2 border-x border-[#e6c887]/70 shadow-2xl flex items-start justify-center pt-3">
            <div className="absolute top-0 left-0 right-0 h-4 flex justify-around overflow-hidden px-2">
              {[...Array(13)].map((_, i) => (
                <div key={i} className="w-5 h-4 rounded-b-full bg-[#e6c887] shadow-sm" />
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2.5 text-sm text-[#faeed1] font-serif">
              <Sparkles className="w-4 h-4 text-[#e6c887]" />
              <span className="tracking-[0.2em] uppercase font-medium">Happy Birthday Keti</span>
              <Sparkles className="w-4 h-4 text-[#e6c887]" />
            </div>
          </div>

          {/* Cake Stand Base */}
          <div className="w-84 sm:w-[410px] h-4.5 bg-gradient-to-r from-[#b58c22] via-[#faeed1] to-[#b58c22] rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.8)]" />
          <div className="w-32 sm:w-40 h-7 bg-gradient-to-b from-[#b58c22] to-[#7a5c12] rounded-b-2xl shadow-md" />
        </div>
      </div>

      {/* Bottom Controls / Grand Finale Actions */}
      <div className="shrink-0 flex flex-col items-center gap-4 w-full max-w-xl mx-auto z-20 pb-2">
        {!allLit && !hasBlownCandles && (
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#9ec0cc]">
              {litCandles.filter(Boolean).length} of {candleCount} candles glowing
            </span>
            <button
              onClick={handleLightAll}
              type="button"
              className="px-5 py-2.5 bg-[#0c2834] hover:bg-[#143c4d] border border-[#1b4859] text-xs font-medium text-[#faeed1] rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Flame className="w-4 h-4 text-[#e6c887]" />
              <span>Light All Candles</span>
            </button>
          </div>
        )}

        {allLit && !hasBlownCandles && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <button
              onClick={handleBlowCandles}
              type="button"
              className="px-9 py-4 bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] text-[#061217] font-semibold text-sm tracking-wide rounded-2xl shadow-[0_0_40px_rgba(230,200,135,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-[#061217]" />
              <span>Make a Secret Wish & Blow the Candles</span>
            </button>
            <span className="text-xs text-[#faeed1]/90 italic font-serif">
              Close your eyes and picture your brightest dream for the year ahead.
            </span>
          </motion.div>
        )}

        {/* CELEBRATION MODAL BANNER */}
        {celebrationActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 sm:p-8 bg-gradient-to-b from-[#0a2733] to-[#071922] border-2 border-[#e6c887]/80 rounded-3xl shadow-2xl max-w-lg text-center"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#e6c887] font-medium block mb-1">
              Celebrate & Rejoice
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#faeed1] font-normal mb-2">
              {cakeConfig.celebrationTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#faeed1]/90 font-serif italic mb-2">
              “{cakeConfig.celebrationSubtitle}”
            </p>
            <p className="text-xs text-[#9ec0cc] font-light leading-relaxed mb-6">
              {cakeConfig.celebrationBlessing}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleTriggerConfettiAgain}
                type="button"
                className="px-5 py-2.5 bg-[#e6c887] hover:bg-[#fae8b2] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-md"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Shower Stardust</span>
              </button>

              <button
                onClick={handleRelight}
                type="button"
                className="px-4 py-2.5 bg-[#09222c] hover:bg-[#123644] border border-[#1b4859] text-xs font-medium text-[#faeed1] rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 text-[#e6c887]" />
                <span>Relight</span>
              </button>

              <button
                onClick={onReplay}
                type="button"
                className="px-4 py-2.5 bg-[#09222c] hover:bg-[#123644] border border-[#1b4859] text-xs font-medium text-[#faeed1] rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#7cd3cf]" />
                <span>Replay Journey</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
