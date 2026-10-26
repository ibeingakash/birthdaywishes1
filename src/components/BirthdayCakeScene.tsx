import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, RotateCcw, PartyPopper, Heart } from 'lucide-react';
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
    <section className="relative w-full h-[100svh] min-h-[640px] pt-14 pb-8 px-4 sm:px-6 z-10 flex flex-col items-center justify-between select-none overflow-hidden bg-gradient-to-b from-[#240a14] via-[#1a060e] to-[#0f0307]">
      {/* Canvas Confetti Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Ambient Bokeh & Candle Glow Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central warm candlelight bloom */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000 ${
            allLit || celebrationActive
              ? 'w-[680px] sm:w-[960px] h-[520px] sm:h-[720px] bg-radial from-[#ffd285]/25 via-[#e2697b]/20 to-transparent'
              : 'w-[500px] sm:w-[700px] h-[400px] sm:h-[550px] bg-radial from-[#e07185]/15 via-[#7a182b]/20 to-transparent'
          }`}
        />

        {/* Soft floating bokeh circles */}
        <div className="absolute top-12 left-[12%] w-24 h-24 rounded-full bg-[#fce5a3]/10 blur-xl animate-pulse" />
        <div className="absolute top-28 right-[15%] w-32 h-32 rounded-full bg-[#fa9ba9]/10 blur-2xl" />
        <div className="absolute bottom-36 left-[8%] w-28 h-28 rounded-full bg-[#f4b669]/10 blur-xl" />
        <div className="absolute bottom-32 right-[10%] w-36 h-36 rounded-full bg-[#e67586]/10 blur-2xl animate-pulse" />

        {/* Scrapbook corner flourishes / bunting ribbons */}
        <svg
          className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 opacity-25 pointer-events-none text-[#d4af37]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M0,0 Q50,15 100,0" strokeDasharray="3 3" />
          <path d="M0,20 Q40,30 80,0" strokeDasharray="3 3" />
          <circle cx="15" cy="18" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="50" cy="22" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="75" cy="12" r="2" fill="currentColor" opacity="0.6" />
        </svg>

        <svg
          className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 opacity-25 pointer-events-none text-[#d4af37] scale-x-[-1]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <path d="M0,0 Q50,15 100,0" strokeDasharray="3 3" />
          <path d="M0,20 Q40,30 80,0" strokeDasharray="3 3" />
          <circle cx="15" cy="18" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="50" cy="22" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="75" cy="12" r="2" fill="currentColor" opacity="0.6" />
        </svg>
      </div>

      {/* Scene Header */}
      <div className="max-w-2xl mx-auto text-center shrink-0 z-20 pt-1 sm:pt-2">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="w-6 h-px bg-[#d4af37]/60" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#e8b26e] font-medium font-sans">
            {cakeConfig.eyebrow}
          </span>
          <span className="w-6 h-px bg-[#d4af37]/60" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#fff8ec] font-normal tracking-tight drop-shadow-md">
          {cakeConfig.headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#f5d0d4] font-light max-w-md mx-auto mt-1 leading-relaxed">
          {hasBlownCandles
            ? 'Your secret wish has ascended into the starlight.'
            : cakeConfig.subheadline}
        </p>
      </div>

      {/* Hero Cake & Styled Birthday Setting Stage */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-end pb-3 my-auto min-h-0 z-10">
        {/* FLANKING SURROUNDINGS: Gifts, florals, votives */}
        <div className="absolute bottom-2 inset-x-0 w-full flex items-end justify-between px-2 sm:px-6 pointer-events-none z-10">
          {/* Left Arrangement: Gift boxes, rose bouquet & votive candle */}
          <div className="hidden sm:flex flex-col items-start gap-1">
            <div className="flex items-end gap-2.5">
              {/* Stacked wrapped gift boxes */}
              <div className="relative">
                {/* Main Rose Pink Gift Box */}
                <div className="w-16 h-14 sm:w-22 sm:h-18 rounded-sm bg-gradient-to-br from-[#d97282] to-[#992c42] shadow-xl border border-[#f3a4b0]/40 relative overflow-hidden">
                  {/* Ribbon horizontal */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 sm:h-3.5 bg-gradient-to-r from-[#faeed1] to-[#f4deb0] shadow-sm flex items-center justify-center">
                    <div className="w-full h-px bg-[#b58c22]/40" />
                  </div>
                  {/* Ribbon vertical */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 sm:w-3.5 bg-gradient-to-b from-[#faeed1] to-[#f4deb0] shadow-sm flex items-center justify-center">
                    <div className="h-full w-px bg-[#b58c22]/40" />
                  </div>
                  {/* Satin Bow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fce8ba] border border-[#d4af37] shadow-sm" />
                    <div className="absolute -left-1 w-3 h-2 rounded-full border-2 border-[#fce8ba] rotate-[-25deg]" />
                    <div className="absolute -right-1 w-3 h-2 rounded-full border-2 border-[#fce8ba] rotate-[25deg]" />
                  </div>
                </div>

                {/* Smaller gold gift box on the side */}
                <div className="absolute -right-8 bottom-0 w-11 h-10 rounded-sm bg-gradient-to-br from-[#cca038] via-[#e8be56] to-[#a3791c] shadow-lg border border-[#fce8ba]/60">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-[#8c2236]" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-[#8c2236]" />
                </div>
              </div>

              {/* Votive candle */}
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-4 mb-0.5 animate-flame">
                  <div className="w-2 h-3 rounded-full bg-gradient-to-t from-[#f59e0b] via-[#fef08a] to-white blur-[0.5px]" />
                </div>
                <div className="w-5 h-6 rounded-b-md bg-white/20 backdrop-blur-sm border border-white/40 shadow-inner flex items-center justify-center">
                  <div className="w-3.5 h-4 bg-[#f8ead0] rounded-b-sm" />
                </div>
              </div>
            </div>

            {/* Scrapbook Gift Tag */}
            <div className="mt-1 ml-2 bg-[#fffaf0] border border-[#e4cca0] px-2.5 py-1 rounded shadow-md rotate-[-4deg] flex items-center gap-1.5">
              <span className="font-script text-xs sm:text-sm text-[#8c2033] font-bold">
                For Keti ♥
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#8c2033]/60" />
            </div>
          </div>

          {/* Right Arrangement: Champagne gift, florals & glowing votive */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-end gap-2.5">
              {/* Votive candle */}
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-4 mb-0.5 animate-flame">
                  <div className="w-2 h-3 rounded-full bg-gradient-to-t from-[#f59e0b] via-[#fef08a] to-white blur-[0.5px]" />
                </div>
                <div className="w-5 h-6 rounded-b-md bg-white/20 backdrop-blur-sm border border-white/40 shadow-inner flex items-center justify-center">
                  <div className="w-3.5 h-4 bg-[#f8ead0] rounded-b-sm" />
                </div>
              </div>

              {/* Champagne wrapped box */}
              <div className="relative">
                <div className="w-16 h-15 sm:w-20 sm:h-17 rounded-sm bg-gradient-to-br from-[#ebd39e] via-[#d6b772] to-[#ad8836] shadow-xl border border-[#faeed1]/50 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-[#941e33] to-[#b8324b]" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-b from-[#941e33] to-[#b8324b]" />
                  {/* Bow */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-3 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#941e33] border border-white/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Scattered rose petal cluster */}
            <div className="flex items-center gap-1 mr-2 mt-0.5 opacity-90">
              <div className="w-3.5 h-2.5 rounded-full bg-gradient-to-r from-[#e57d8e] to-[#c24f60] rotate-12 shadow-sm" />
              <div className="w-4 h-3 rounded-full bg-gradient-to-br from-[#f294a4] to-[#ab364c] -rotate-12 shadow-sm" />
              <div className="w-3 h-2 rounded-full bg-gradient-to-r from-[#e57d8e] to-[#a83348] rotate-45 shadow-sm" />
            </div>
          </div>
        </div>

        {/* CANDLES ROW */}
        <div className="relative z-30 flex items-end justify-center gap-6 sm:gap-9 mb-[-6px]">
          {litCandles.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => handleLightCandle(idx)}
              className="group relative flex flex-col items-center cursor-pointer select-none"
              title={isLit ? 'Lit candle' : 'Tap to light candle'}
            >
              {/* Flame */}
              <div className="h-12 sm:h-14 flex items-end justify-center">
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      className="animate-flame relative"
                    >
                      {/* Ambient flame halo */}
                      <div className="absolute -inset-2 rounded-full bg-[#f59e0b]/30 blur-md pointer-events-none" />
                      {/* Outer flame */}
                      <div className="w-5 sm:w-6 h-9 sm:h-11 rounded-full bg-gradient-to-t from-[#f97316] via-[#facc15] to-[#fffbeb] blur-[0.5px] shadow-[0_0_15px_#facc15]" />
                      {/* Inner bright white flame core */}
                      <div className="absolute inset-x-1 bottom-1 top-2.5 rounded-full bg-white/95 blur-[0.5px]" />
                      {/* Tip sparkle */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isLit && !hasBlownCandles && (
                  <div className="w-1 h-4 bg-[#7a4933] rounded-t-sm group-hover:bg-[#f6d288] transition-colors shadow-xs" />
                )}

                {hasBlownCandles && !isLit && (
                  <motion.div
                    initial={{ opacity: 0.85, y: 0 }}
                    animate={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1.8 }}
                    className="w-2 h-8 bg-gradient-to-t from-gray-300 via-gray-400 to-transparent blur-[1.5px]"
                  />
                )}
              </div>

              {/* Candle Body: Ivory & Gold Spiral Celebration Candle */}
              <div className="w-4.5 sm:w-5.5 h-20 sm:h-24 rounded-t-lg bg-gradient-to-r from-[#ffeaa7] via-[#fffdfa] to-[#ecd291] shadow-xl border-t border-white/80 flex flex-col justify-between py-2 items-center relative overflow-hidden">
                {/* Spiral decorative ribbons */}
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#d4af37,#d4af37_2px,transparent_2px,transparent_8px)]" />
                <div className="w-full h-0.5 bg-[#b58c22]/30 relative z-10" />
                <div className="w-full h-0.5 bg-[#b58c22]/30 relative z-10" />
                <div className="w-full h-0.5 bg-[#b58c22]/30 relative z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* HERO CAKE TIERS & ORNATE GOLDEN STAND */}
        <div className="relative z-20 w-full flex flex-col items-center">
          {/* Top Tier: Warm Ivory Buttercream with Golden Filigree */}
          <div className="relative w-64 sm:w-80 h-22 sm:h-26 bg-gradient-to-b from-[#fffbf4] via-[#f7ecd6] to-[#ebd2b2] rounded-t-3xl border-t-2 border-x border-[#d4af37]/60 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between pt-2.5 pb-2">
            {/* Scalloped Buttercream Piping along the top rim */}
            <div className="absolute top-0 left-0 right-0 h-4 flex justify-around overflow-hidden px-2">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-4.5 h-3.5 rounded-b-full bg-[#fffcf7] shadow-[0_2px_4px_rgba(0,0,0,0.1)] border-b border-[#ebd2b2]"
                />
              ))}
            </div>

            {/* Inscription on Top Tier */}
            <div className="mt-3.5 flex items-center gap-2">
              <span className="w-3 h-px bg-[#d4af37]/70" />
              <span className="font-serif text-xs sm:text-sm italic text-[#8c2236] tracking-[0.2em] uppercase font-medium">
                Grace & Joy
              </span>
              <span className="w-3 h-px bg-[#d4af37]/70" />
            </div>

            {/* Delicate pearl beads along bottom of top tier */}
            <div className="w-full flex justify-center gap-1 px-4 opacity-70">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#faeed1] to-[#cca038] shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* Bottom Tier: Grand Ivory Tier with Rose Velvet Celebration Band */}
          <div className="relative w-84 sm:w-[440px] md:w-[480px] h-26 sm:h-32 bg-gradient-to-b from-[#fffaf1] via-[#f6ebce] to-[#e8cdab] rounded-t-3xl border-t-2 border-x border-[#d4af37]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between pt-2.5 pb-2">
            {/* Scalloped Buttercream Piping along bottom tier top rim */}
            <div className="absolute top-0 left-0 right-0 h-4 flex justify-around overflow-hidden px-2">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-4 rounded-b-full bg-[#fffaf1] shadow-[0_2px_4px_rgba(0,0,0,0.1)] border-b border-[#e8cdab]"
                />
              ))}
            </div>

            {/* Velvet Rose-Burgundy Ribbon Band across the center */}
            <div className="w-full my-auto py-2 bg-gradient-to-r from-[#801b2d] via-[#a82c44] to-[#801b2d] border-y border-[#e8bd54]/70 shadow-inner flex items-center justify-center gap-3 text-[#fff8ec]">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#faeed1]" />
              <span className="font-serif text-xs sm:text-base tracking-[0.25em] uppercase font-medium drop-shadow-sm">
                Happy Birthday Keti
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#faeed1]" />
            </div>

            {/* Bottom icing pearls */}
            <div className="w-full flex justify-center gap-1.5 px-4 opacity-80 mb-0.5">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#faeed1] to-[#d4af37] shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* Ornate Golden Cake Stand Plate */}
          <div className="w-92 sm:w-[480px] md:w-[530px] h-5 sm:h-6 bg-gradient-to-r from-[#b3842c] via-[#fae8b2] to-[#996d1b] rounded-full shadow-[0_16px_35px_rgba(0,0,0,0.85)] border-t border-[#fff9eb]/70 relative flex items-center justify-center">
            <div className="w-[96%] h-1 rounded-full bg-[#fdf5df]/80 shadow-inner" />
          </div>

          {/* Ornate Golden Stand Stem & Base */}
          <div className="flex flex-col items-center">
            <div className="w-32 sm:w-40 h-6 sm:h-7 bg-gradient-to-b from-[#b3842c] via-[#8c6518] to-[#6e4e0f] rounded-b-xl shadow-md border-x border-[#c79a3a]/40" />
            <div className="w-48 sm:w-60 h-3.5 sm:h-4 bg-gradient-to-r from-[#996d1b] via-[#fae8b2] to-[#8c6518] rounded-full shadow-lg border-t border-[#fff9eb]/60" />
          </div>

          {/* Celebration Table Top Surface Layer */}
          <div className="w-full max-w-4xl h-8 sm:h-10 -mt-2 bg-gradient-to-b from-[#240b13] via-[#1a070e] to-[#120408] border-t border-[#d4af37]/30 rounded-t-3xl shadow-2xl relative flex items-center justify-center px-4">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
            <span className="font-script text-xs sm:text-sm text-[#f5d0d4]/80 tracking-wider">
              Warmest birthday celebration for Keti ♡
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Controls / Grand Finale Actions */}
      <div className="shrink-0 flex flex-col items-center gap-3 w-full max-w-xl mx-auto z-30 pb-2">
        {!allLit && !hasBlownCandles && (
          <div className="flex items-center gap-3 sm:gap-4 bg-[#230912]/80 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-full border border-[#d4af37]/40 shadow-xl">
            <span className="text-xs text-[#f5d0d4] font-medium font-sans">
              {litCandles.filter(Boolean).length} of {candleCount} candles glowing
            </span>
            <span className="w-1 h-1 rounded-full bg-[#d4af37]" />
            <button
              onClick={handleLightAll}
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-[#7a1b2d] to-[#992c42] hover:from-[#8c2033] hover:to-[#b0354e] border border-[#d4af37]/60 text-xs font-semibold text-[#fff8ec] rounded-full transition-all cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <Flame className="w-4 h-4 text-[#ffd778]" />
              <span>Light All Candles</span>
            </button>
          </div>
        )}

        {allLit && !hasBlownCandles && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <button
              onClick={handleBlowCandles}
              type="button"
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[#ffe49e] via-[#f7d070] to-[#e4b547] text-[#240a12] font-semibold text-sm sm:text-base tracking-wide rounded-full shadow-[0_0_35px_rgba(247,208,112,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border border-white/60"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#801b2d]" />
              <span>Make a Secret Wish & Blow the Candles</span>
            </button>
            <span className="text-xs text-[#fff8ec]/90 italic font-serif">
              Close your eyes, make your wish, and let this moment be yours.
            </span>
          </motion.div>
        )}

        {/* CELEBRATION MODAL BANNER */}
        {celebrationActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 sm:p-7 bg-gradient-to-b from-[#2a0c16]/95 via-[#200810]/95 to-[#15040a]/95 backdrop-blur-md border-2 border-[#d4af37]/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-lg text-center relative overflow-hidden"
          >
            {/* Scrapbook Corner Ribbons */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
              <div className="absolute top-2 -right-6 w-24 h-5 bg-[#d4af37] rotate-45 flex items-center justify-center text-[9px] font-bold text-[#2a0c16] uppercase tracking-widest shadow-sm">
                Joy
              </div>
            </div>

            <div className="inline-flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd778]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#e8b26e] font-medium block">
                Celebrate & Rejoice
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#ffd778]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl text-[#fff8ec] font-normal mb-1.5 drop-shadow-sm">
              {cakeConfig.celebrationTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#fce2cc] font-serif italic mb-2">
              “{cakeConfig.celebrationSubtitle}”
            </p>
            <p className="text-xs text-[#f5d0d4] font-light leading-relaxed mb-5 max-w-md mx-auto">
              {cakeConfig.celebrationBlessing}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={handleTriggerConfettiAgain}
                type="button"
                className="px-5 py-2.5 bg-gradient-to-r from-[#ffe49e] via-[#f7d070] to-[#e4b547] text-[#240a12] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-md hover:brightness-105"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Shower Stardust</span>
              </button>

              <button
                onClick={handleRelight}
                type="button"
                className="px-4 py-2.5 bg-[#36111d] hover:bg-[#481827] border border-[#d4af37]/60 text-xs font-medium text-[#fff8ec] rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 text-[#ffd778]" />
                <span>Relight</span>
              </button>

              <button
                onClick={onReplay}
                type="button"
                className="px-4 py-2.5 bg-[#36111d] hover:bg-[#481827] border border-[#d4af37]/60 text-xs font-medium text-[#fff8ec] rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#f5d0d4]" />
                <span>Replay Journey</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
