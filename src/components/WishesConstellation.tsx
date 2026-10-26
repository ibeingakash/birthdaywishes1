import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, X, Send, Check } from 'lucide-react';
import { birthdayConfig, SurpriseWish } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface CustomWish {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export default function WishesConstellation() {
  const [selectedWish, setSelectedWish] = useState<SurpriseWish | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [customWishes, setCustomWishes] = useState<CustomWish[]>([
    {
      id: 'pre-1',
      author: 'Family',
      text: 'May your laughter echo through every room you step into this year!',
      timestamp: 'Just now'
    }
  ]);
  const [authorInput, setAuthorInput] = useState('');
  const [wishInput, setWishInput] = useState('');
  const [wishSent, setWishSent] = useState(false);

  useEffect(() => {
    if (!selectedWish) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWish(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWish]);

  const wishes = birthdayConfig.wishes.list;

  const handleSelectWish = (wish: SurpriseWish) => {
    setSelectedWish(wish);
    if (!unlockedIds.includes(wish.id)) {
      setUnlockedIds((prev) => [...prev, wish.id]);
    }
    audioEngine.playStarSparkle();
  };

  const handleAddCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    const newWish: CustomWish = {
      id: `wish-${Date.now()}`,
      author: authorInput.trim() || 'Well-wisher',
      text: wishInput.trim(),
      timestamp: 'Moments ago'
    };

    setCustomWishes((prev) => [newWish, ...prev]);
    setWishInput('');
    setAuthorInput('');
    setWishSent(true);
    audioEngine.playStarSparkle();

    setTimeout(() => {
      setWishSent(false);
    }, 4000);
  };

  return (
    <section id="wishes" className="relative py-28 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6c887] font-medium">
            {birthdayConfig.wishes.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#faeed1] mt-2 mb-4">
            {birthdayConfig.wishes.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#9ec0cc] font-light leading-relaxed">
            {birthdayConfig.wishes.description}
          </p>
          <div className="mt-3 text-xs text-[#7196a4]">
            {unlockedIds.length} of {wishes.length} stars revealed
          </div>
        </div>

        {/* Five Interactive Star Nodes (Constellation Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {wishes.map((wish, index) => {
            const isUnlocked = unlockedIds.includes(wish.id);
            return (
              <motion.button
                key={wish.id}
                onClick={() => handleSelectWish(wish)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className={`relative p-6 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isUnlocked
                    ? 'bg-[#0b2732] border-[#e6c887]/60 shadow-[0_0_20px_rgba(230,200,135,0.18)]'
                    : 'bg-[#071922]/70 border-[#143947] hover:border-[#7cd3cf]/50'
                }`}
              >
                {/* Node Symbol & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif text-xl ${
                      isUnlocked
                        ? 'bg-[#144254] text-[#faeed1] border border-[#e6c887]'
                        : 'bg-[#091f28] text-[#7196a4] border border-[#173e4d]'
                    }`}
                  >
                    {wish.symbol}
                  </div>
                  {isUnlocked && (
                    <Sparkles className="w-4 h-4 text-[#e6c887] animate-pulse" />
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#e6c887] block mb-1">
                    {wish.theme}
                  </span>
                  <h3 className="font-serif text-xl text-[#faeed1] font-normal mb-2">
                    {wish.title}
                  </h3>
                  <p className="text-xs text-[#8ab0be] line-clamp-3 leading-relaxed">
                    {wish.shortSnippet}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#123644] text-[11px] text-[#e6c887] flex items-center gap-1 font-medium">
                  <span>{isUnlocked ? 'Read again →' : 'Reveal blessing →'}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive "Wish Capsule" Form: Write a wish into the night sky */}
        <div className="relative bg-[#071b24] border border-[#184252] rounded-3xl p-8 sm:p-12 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-[#14303b] pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#e6c887] font-medium block">
                Interactive Starlight Wish Capsule
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#faeed1] mt-1">
                Leave a Birthday Wish for Keti
              </h3>
              <p className="text-xs sm:text-sm text-[#8ab0be] mt-1 font-light">
                Write a personal thought, greeting, or prayer to illuminate Keti's constellation.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-[#0d2c38] border border-[#1c4e61] text-xs text-[#faeed1] flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#e6c887] fill-[#e6c887]" />
              <span>{customWishes.length} wishes in orbit</span>
            </div>
          </div>

          <form onSubmit={handleAddCustomWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs uppercase tracking-wider text-[#8ab0be] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mom, Maya, Cousin Alex"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#051319] border border-[#163d4c] rounded-xl text-sm text-[#faeed1] placeholder:text-[#4d7280] focus:outline-none focus:border-[#e6c887]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#8ab0be] mb-1.5">
                  Your Heartfelt Wish
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. May this year open doors you never dreamed existed!"
                    value={wishInput}
                    onChange={(e) => setWishInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#051319] border border-[#163d4c] rounded-xl text-sm text-[#faeed1] placeholder:text-[#4d7280] focus:outline-none focus:border-[#e6c887]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#e6c887] hover:bg-[#fae8b2] text-[#061217] font-medium text-xs tracking-wider uppercase rounded-xl transition-colors flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
                  >
                    <span>Release</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Inspiration Prompts */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#7196a4]">
              <span>Quick inspiration:</span>
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

            {wishSent && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#0f3442] border border-[#e6c887]/50 rounded-xl text-xs text-[#faeed1] flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-[#e6c887]" />
                <span>Your wish has been cast into the constellation! ✨</span>
              </motion.div>
            )}
          </form>

          {/* List of recent custom wishes */}
          <div className="mt-8 pt-6 border-t border-[#14303b] space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-[#7196a4] block mb-2">
              Recent Wishes in the Sky:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
              {customWishes.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 bg-[#09202a]/80 border border-[#163d4c] rounded-xl flex flex-col justify-between"
                >
                  <p className="text-xs text-[#faeed1] font-light leading-relaxed mb-1.5">
                    “{w.text}”
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#7ea3b0]">
                    <span className="font-medium text-[#e6c887]">{w.author}</span>
                    <span>{w.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Star Wish Modal */}
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
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#081e28] border border-[#e6c887]/60 rounded-3xl p-8 sm:p-10 shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedWish(null)}
                type="button"
                aria-label="Close"
                className="absolute top-5 right-5 p-2 text-[#8ab0be] hover:text-[#faeed1] bg-[#0c2834] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Glowing Icon */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#0f3442] border border-[#e6c887] flex items-center justify-center font-serif text-3xl text-[#faeed1] shadow-[0_0_25px_rgba(230,200,135,0.35)]">
                {selectedWish.symbol}
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-[#e6c887] font-medium block mb-1">
                {selectedWish.theme}
              </span>
              <h3 className="font-serif text-3xl text-[#faeed1] font-normal mb-4">
                {selectedWish.title}
              </h3>

              <p className="text-sm sm:text-base text-[#b2cdd8] font-light leading-relaxed mb-6">
                {selectedWish.fullMessage}
              </p>

              {selectedWish.quote && (
                <div className="p-4 bg-[#0a232f] border-t border-[#163f4e] rounded-xl text-xs font-serif italic text-[#faeed1]/90 mb-6">
                  {selectedWish.quote}
                </div>
              )}

              <button
                onClick={() => setSelectedWish(null)}
                type="button"
                className="px-6 py-2.5 bg-[#e6c887] hover:bg-[#fae8b2] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
              >
                Keep This Light Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
