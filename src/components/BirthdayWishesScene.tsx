import { motion } from 'motion/react';
import { ArrowRight, Cake } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface BirthdayWishesSceneProps {
  onContinue: () => void;
  onPrev: () => void;
}

export default function BirthdayWishesScene({ onContinue }: BirthdayWishesSceneProps) {
  const wishes = birthdayConfig.wishes;

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between pt-18 pb-14 px-6 sm:px-12 md:px-16 overflow-hidden paper-texture text-[#36111a] select-none">
      {/* Top Right Handwritten Script Note */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-16 right-8 sm:right-16 z-20 pointer-events-none max-w-xs text-right"
      >
        <span className="font-script text-2xl sm:text-3xl text-[#78303c] leading-tight block rotate-1">
          {wishes.handwrittenAnnotation}
        </span>
      </motion.div>

      {/* Decorative Botanical Daisy Blooms */}
      <div className="absolute bottom-10 right-10 w-24 h-24 pointer-events-none opacity-80 z-0">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
          <circle cx="50" cy="50" r="14" fill="#cf7052" />
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="20"
              rx="6"
              ry="18"
              fill="#f49d94"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto z-10 py-2">
        {/* Header Lockup */}
        <div className="text-center mb-8">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#a86561] font-medium block mb-2">
            {wishes.eyebrow}
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#36111a] font-normal tracking-tight flex items-center justify-center gap-2">
            <span>{wishes.title}</span>
            <span className="text-[#d97d74] text-3xl sm:text-4xl">♥</span>
          </h2>
        </div>

        {/* 6 Pastel Wish Cards in 2 x 3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
          {wishes.cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 sm:p-7 rounded-2xl border ${card.bgColor} ${card.borderColor} shadow-sm flex flex-col justify-between min-h-[140px] transition-transform hover:scale-102 hover:shadow-md`}
            >
              <p className="font-sans text-sm sm:text-base text-[#4a242c] font-light leading-relaxed">
                {card.message}
              </p>
              <div className="flex justify-end mt-4">
                <span className={`text-base ${card.accentColor}`}>♥</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Action: Proceed to Cake Finale */}
      <div className="shrink-0 flex items-center justify-center w-full max-w-5xl mx-auto z-20 pt-2">
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#e0958b] hover:bg-[#d97d74] text-[#240b12] text-sm font-medium rounded-full shadow-[0_8px_25px_rgba(224,149,139,0.35)] transition-all hover:scale-103 active:scale-95 cursor-pointer"
        >
          <Cake className="w-4 h-4" />
          <span>Celebrate with Birthday Cake</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
