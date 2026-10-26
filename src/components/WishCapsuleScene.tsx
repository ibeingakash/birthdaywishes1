import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Star, Sparkles, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface CustomWish {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface WishCapsuleSceneProps {
  onContinue: () => void;
  onPrev: () => void;
}

export default function WishCapsuleScene({ onContinue }: WishCapsuleSceneProps) {
  const [authorInput, setAuthorInput] = useState('');
  const [wishInput, setWishInput] = useState('');
  const [floatingOrb, setFloatingOrb] = useState<{ id: number; text: string } | null>(null);
  const [sessionWishes, setSessionWishes] = useState<CustomWish[]>([
    {
      id: 'seed-1',
      author: 'Family & Loved Ones',
      text: 'May this year open boundless doors of joy, peace, and creative fulfillment!',
      timestamp: 'Session memory'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    const newWish: CustomWish = {
      id: `wish-${Date.now()}`,
      author: authorInput.trim() || 'Well-wisher',
      text: wishInput.trim(),
      timestamp: 'Just now'
    };

    setSessionWishes((prev) => [newWish, ...prev]);

    // Animate radiant light ascending into starfield
    setFloatingOrb({ id: Date.now(), text: wishInput.trim() });
    audioEngine.playStarSparkle();

    setWishInput('');
    setAuthorInput('');

    setTimeout(() => {
      setFloatingOrb(null);
    }, 3800);
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] flex flex-col justify-between px-6 pt-16 pb-16 select-none overflow-hidden">
      {/* Floating Starlight Ascending Particle Animation */}
      <AnimatePresence>
        {floatingOrb && (
          <motion.div
            key={floatingOrb.id}
            initial={{ opacity: 0, scale: 0.5, y: 120 }}
            animate={{
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0.5, 1.3, 1.1, 0.8, 0.3],
              y: -360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.6, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#fae8b2] via-[#e6c887] to-white shadow-[0_0_60px_rgba(250,232,178,1)] flex items-center justify-center animate-pulse">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-[#061217] fill-[#061217]" />
            </div>
            <span className="text-xs text-[#faeed1] font-serif mt-3 tracking-widest uppercase bg-[#061217]/90 px-4 py-1.5 rounded-full border border-[#e6c887]/60 backdrop-blur-md shadow-xl">
              Wish Ascended to the Stars ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-radial from-[#154659]/30 via-[#071922]/15 to-transparent blur-3xl" />
      </div>

      {/* Scene Header */}
      <div className="max-w-2xl mx-auto text-center shrink-0 z-20">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#e6c887] font-medium block mb-1">
          {birthdayConfig.capsule.eyebrow}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#faeed1] font-normal tracking-tight">
          {birthdayConfig.capsule.headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#9ec0cc] font-light max-w-md mx-auto mt-1 leading-relaxed">
          {birthdayConfig.capsule.description}
        </p>
      </div>

      {/* Centerpiece: Glowing Celestial Light Vessel / Capsule */}
      <div className="relative flex-1 w-full max-w-xl mx-auto flex flex-col items-center justify-center my-auto min-h-0 z-10 py-2">
        <div className="relative w-full rounded-3xl border-2 border-[#1c4e61]/80 bg-gradient-to-b from-[#0a2733]/90 via-[#071a22]/95 to-[#051319] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Vessel Filigree Rings & Glowing Seal */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#143d4d]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#123947] to-[#e6c887]/80 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-[#061217]" />
              </div>
              <div>
                <span className="font-serif text-base text-[#faeed1] block">
                  {birthdayConfig.capsule.vesselTitle}
                </span>
                <span className="text-[10px] text-[#7196a4] tracking-wider uppercase block">
                  Holding wishes for this visit
                </span>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#0c2a36] border border-[#1b4b5d] text-[11px] text-[#faeed1] font-serif">
              {sessionWishes.length} {sessionWishes.length === 1 ? 'wish' : 'wishes'} glowing
            </div>
          </div>

          {/* Integrated Celestial Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="capsule-author" className="block text-[10px] uppercase tracking-widest text-[#8ab0be] mb-1.5 font-medium">
                Your Name
              </label>
              <input
                id="capsule-author"
                type="text"
                placeholder="e.g. Maya, Alex, Mom"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#051319]/80 border border-[#163d4c] rounded-xl text-xs sm:text-sm text-[#faeed1] placeholder:text-[#4d7280] focus:outline-none focus:border-[#e6c887] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="capsule-text" className="block text-[10px] uppercase tracking-widest text-[#8ab0be] mb-1.5 font-medium">
                Your Birthday Blessing for Keti
              </label>
              <div className="flex gap-2">
                <input
                  id="capsule-text"
                  type="text"
                  required
                  placeholder="e.g. May this year unfold with quiet miracles!"
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#051319]/80 border border-[#163d4c] rounded-xl text-xs sm:text-sm text-[#faeed1] placeholder:text-[#4d7280] focus:outline-none focus:border-[#e6c887] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] text-[#061217] font-medium text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_20px_rgba(230,200,135,0.45)] flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 shadow-md"
                >
                  <span>Release</span>
                  <Send className="w-3.5 h-3.5 text-[#061217]" />
                </button>
              </div>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#7196a4]">
              <span>Inspiration:</span>
              <button
                type="button"
                onClick={() => setWishInput('May peace, boundless creativity, and steady health accompany every step you take!')}
                className="hover:text-[#faeed1] underline underline-offset-4 cursor-pointer"
              >
                Peace & health
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setWishInput('May you travel far, read deeply, and laugh until your ribs ache!')}
                className="hover:text-[#faeed1] underline underline-offset-4 cursor-pointer"
              >
                Travel & laughter
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setWishInput('Wishing you a year as graceful, bright, and sincere as your heart!')}
                className="hover:text-[#faeed1] underline underline-offset-4 cursor-pointer"
              >
                Bright chapter
              </button>
            </div>
          </form>

          {/* Session Stream Preview */}
          <div className="mt-5 pt-4 border-t border-[#143d4d]/60 max-h-24 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {sessionWishes.slice(0, 2).map((w) => (
              <div
                key={w.id}
                className="p-2.5 bg-[#06161e]/75 border border-[#133947] rounded-xl text-xs flex flex-col justify-between"
              >
                <p className="text-[#faeed1] font-light leading-relaxed mb-1">“{w.text}”</p>
                <div className="flex items-center justify-between text-[10px] text-[#7ea3b0]">
                  <span className="font-medium text-[#e6c887]">{w.author}</span>
                  <span>{w.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scene Toolbar */}
      <div className="shrink-0 flex items-center justify-end w-full max-w-xl mx-auto z-20 pt-2">
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
    </section>
  );
}
