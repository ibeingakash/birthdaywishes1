import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { birthdayConfig, SurpriseWish } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface ConstellationMapSceneProps {
  onContinue: () => void;
  onPrev: () => void;
}

// Coordinate distribution across a 1000 x 580 astronomical chart
const STAR_COORDINATES = [
  { id: 'wish-joy', x: 200, y: 150 },        // Alpha: Top left
  { id: 'wish-curiosity', x: 800, y: 140 },  // Beta: Top right
  { id: 'wish-peace', x: 500, y: 280 },      // Polaris Anchor: Center
  { id: 'wish-courage', x: 260, y: 440 },    // Gamma: Bottom left
  { id: 'wish-love', x: 740, y: 430 }        // Delta: Bottom right
];

export default function ConstellationMapScene({ onContinue }: ConstellationMapSceneProps) {
  const [selectedWish, setSelectedWish] = useState<SurpriseWish | null>(null);
  const [awakenedIds, setAwakenedIds] = useState<string[]>([]);

  const wishes = birthdayConfig.wishes.list;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedWish) {
        setSelectedWish(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWish]);

  const handleSelectStar = (wish: SurpriseWish) => {
    setSelectedWish(wish);
    if (!awakenedIds.includes(wish.id)) {
      setAwakenedIds((prev) => [...prev, wish.id]);
    }
    audioEngine.playStarSparkle();
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] flex flex-col justify-between px-6 pt-16 pb-16 select-none overflow-hidden">
      {/* Deep Celestial Nebula Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] sm:w-[1000px] h-[500px] sm:h-[750px] rounded-full bg-radial from-[#123947]/35 via-[#071922]/15 to-transparent blur-3xl" />
      </div>

      {/* Scene Header */}
      <div className="max-w-2xl mx-auto text-center shrink-0 z-20">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#e6c887] font-medium">
            {birthdayConfig.wishes.eyebrow}
          </span>
          <span className="text-[#3b6070]">·</span>
          <span className="text-xs text-[#faeed1] font-medium">
            {awakenedIds.length} of {wishes.length} Stars Awakened
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#faeed1] font-normal tracking-tight">
          {birthdayConfig.wishes.headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#9ec0cc] font-light max-w-md mx-auto mt-1 leading-relaxed">
          {birthdayConfig.wishes.description}
        </p>
      </div>

      {/* Main Large Immersive Constellation Star Map */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-auto min-h-0 z-10 py-2">
        <div className="relative w-full aspect-[16/9] max-h-[58vh] flex items-center justify-center">
          {/* Astronomical Chart SVG Lines and Celestial Compass */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 580"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Celestial coordinate rings */}
            <circle cx="500" cy="280" r="240" fill="none" stroke="rgba(124, 211, 207, 0.12)" strokeDasharray="4 6" />
            <circle cx="500" cy="280" r="150" fill="none" stroke="rgba(230, 200, 135, 0.15)" strokeDasharray="3 5" />
            <circle cx="500" cy="280" r="60" fill="none" stroke="rgba(230, 200, 135, 0.2)" />

            {/* Meridian Axes */}
            <line x1="500" y1="40" x2="500" y2="520" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 4" />
            <line x1="120" y1="280" x2="880" y2="280" stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="2 4" />

            {/* Radiant Constellation Lines */}
            <line x1="200" y1="150" x2="500" y2="280" stroke="rgba(230, 200, 135, 0.45)" strokeWidth="1.8" />
            <line x1="800" y1="140" x2="500" y2="280" stroke="rgba(230, 200, 135, 0.45)" strokeWidth="1.8" />
            <line x1="500" y1="280" x2="260" y2="440" stroke="rgba(230, 200, 135, 0.45)" strokeWidth="1.8" />
            <line x1="500" y1="280" x2="740" y2="430" stroke="rgba(230, 200, 135, 0.45)" strokeWidth="1.8" />
            <line x1="200" y1="150" x2="260" y2="440" stroke="rgba(124, 211, 207, 0.25)" strokeDasharray="4 4" strokeWidth="1.2" />
            <line x1="800" y1="140" x2="740" y2="430" stroke="rgba(124, 211, 207, 0.25)" strokeDasharray="4 4" strokeWidth="1.2" />
          </svg>

          {/* 5 Spatial Star Beacons */}
          {wishes.map((wish, idx) => {
            const coord = STAR_COORDINATES[idx] || { x: 500, y: 280 };
            const isAwakened = awakenedIds.includes(wish.id);
            const leftPercent = (coord.x / 1000) * 100;
            const topPercent = (coord.y / 580) * 100;

            return (
              <div
                key={wish.id}
                style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <button
                  onClick={() => handleSelectStar(wish)}
                  type="button"
                  aria-label={`Awaken ${wish.title}`}
                  className="group relative cursor-pointer active:scale-95 transition-transform"
                >
                  {/* Outer Pulsing Aura */}
                  <div
                    className={`absolute inset-0 rounded-full blur-md transition-all ${
                      isAwakened
                        ? 'bg-[#e6c887]/70 scale-150 animate-pulse'
                        : 'bg-[#7cd3cf]/35 group-hover:bg-[#e6c887]/60 scale-125'
                    }`}
                  />

                  {/* Core Star Orb Beacon */}
                  <div
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-serif text-xl sm:text-2xl border-2 transition-all duration-300 shadow-2xl ${
                      isAwakened
                        ? 'bg-gradient-to-br from-[#1b4859] to-[#071922] text-[#faeed1] border-[#e6c887] shadow-[0_0_25px_rgba(230,200,135,0.6)]'
                        : 'bg-[#091f27] text-[#8ab0be] border-[#1a4454] group-hover:border-[#7cd3cf]'
                    }`}
                  >
                    <span>{wish.symbol}</span>
                    {isAwakened && (
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#e6c887] animate-pulse" />
                    )}
                  </div>
                </button>

                {/* Substantial Typography Label */}
                <div className="mt-2 text-center pointer-events-none whitespace-nowrap">
                  <span className="text-xs sm:text-sm text-[#faeed1] font-medium tracking-wide block drop-shadow-md">
                    {wish.title}
                  </span>
                  <span className="text-[10px] text-[#7196a4] tracking-widest uppercase block mt-0.5">
                    {wish.theme}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Toolbar & Action */}
      <div className="shrink-0 flex items-center justify-end w-full max-w-5xl mx-auto z-20 pt-2">
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_25px_rgba(230,200,135,0.45)] cursor-pointer active:scale-95 shadow-md"
        >
          <span>The Birthday Finale</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#061217]" />
        </button>
      </div>

      {/* Rich Wish Modal Overlay */}
      <AnimatePresence>
        {selectedWish && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedWish.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#040d12]/85 backdrop-blur-md p-6"
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-b from-[#0a232e] to-[#06161e] border-2 border-[#e6c887]/70 rounded-3xl p-8 sm:p-10 shadow-2xl text-center"
            >
              <button
                onClick={() => setSelectedWish(null)}
                type="button"
                aria-label="Return to Star Map"
                className="absolute top-5 right-5 p-2 text-[#8ab0be] hover:text-[#faeed1] bg-[#0c2834] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#154659] to-[#071922] border border-[#e6c887] flex items-center justify-center font-serif text-3xl text-[#faeed1] shadow-[0_0_30px_rgba(230,200,135,0.45)]">
                {selectedWish.symbol}
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] text-[#e6c887] font-medium block mb-1">
                {selectedWish.theme}
              </span>
              <h3 className="font-serif text-3xl text-[#faeed1] font-normal mb-4">
                {selectedWish.title}
              </h3>

              <p className="text-sm sm:text-base text-[#b2cdd8] font-light leading-relaxed mb-6">
                {selectedWish.fullMessage}
              </p>

              {selectedWish.quote && (
                <div className="p-4 bg-[#071922] border-t border-[#163f4e] rounded-2xl text-xs sm:text-sm font-serif italic text-[#faeed1]/95 mb-6">
                  {selectedWish.quote}
                </div>
              )}

              <button
                onClick={() => setSelectedWish(null)}
                type="button"
                className="px-8 py-3 bg-[#e6c887] hover:bg-[#fae8b2] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Return to Star Map
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
