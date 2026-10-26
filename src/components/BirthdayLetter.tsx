import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface BirthdayLetterProps {
  onContinue: () => void;
  onPrev: () => void;
}

export default function BirthdayLetter({ onContinue, onPrev }: BirthdayLetterProps) {
  const letter = birthdayConfig.letter;

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between pt-18 pb-14 px-6 sm:px-12 md:px-16 overflow-hidden bg-[#241317] text-[#36111a] select-none">
      {/* Warm Ambient Desk Lighting */}
      <div className="absolute inset-0 bg-radial from-[#522933]/40 via-[#261017]/80 to-[#18080d] pointer-events-none" />

      {/* Main Letter Stage */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center my-auto z-10 py-4">
        
        {/* Layered Envelope underneath letter */}
        <div className="absolute w-[92%] sm:w-[580px] h-[400px] sm:h-[460px] bg-[#eeddc8] rounded-xs shadow-xl rotate-[-2deg] -translate-x-2 -translate-y-2 opacity-90 border border-[#ddcbb4]" />

        {/* Vintage Fountain Pen on Left */}
        <div className="hidden lg:block absolute -left-12 bottom-16 w-36 h-8 rotate-[-35deg] pointer-events-none drop-shadow-xl z-20">
          <div className="w-32 h-3.5 bg-gradient-to-r from-[#1c0d12] via-[#2d121a] to-[#d4af37] rounded-full border-t border-[#f7e6b5]" />
          <div className="absolute -left-2 top-0.5 w-4 h-2.5 bg-gradient-to-r from-[#faeed1] to-[#d4af37] rotate-45 rounded-xs" />
        </div>

        {/* Dried Flowers on Top Right */}
        <div className="hidden sm:block absolute -top-4 -right-4 w-32 h-32 pointer-events-none z-20 opacity-80">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
            <path d="M70 10 C60 40 40 70 20 90" stroke="#7a5c4e" strokeWidth="2" strokeLinecap="round" />
            <circle cx="72" cy="12" r="6" fill="#fff8ef" stroke="#cfb5a6" />
            <circle cx="62" cy="24" r="5" fill="#fff8ef" stroke="#cfb5a6" />
            <circle cx="50" cy="38" r="5.5" fill="#fff8ef" stroke="#cfb5a6" />
            <circle cx="36" cy="56" r="5" fill="#fff8ef" stroke="#cfb5a6" />
          </svg>
        </div>

        {/* Primary Letter Paper */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg sm:max-w-xl p-8 sm:p-12 bg-[#fdfbf6] rounded-xs shadow-[0_20px_50px_rgba(20,5,10,0.45)] border border-[#e8dbc9] z-10"
        >
          {/* Subtle Deckle-Edge Border Shadow */}
          <div className="absolute inset-2 border border-[#f0e3d2] pointer-events-none rounded-xs" />

          {/* Salutation in Script: "Dear Keti," */}
          <div className="mb-6">
            <h2 className="font-signature text-5xl sm:text-6xl text-[#82323f] tracking-wide -rotate-1">
              {letter.salutation}
            </h2>
          </div>

          {/* Letter Paragraphs */}
          <div className="space-y-4 font-serif text-base sm:text-lg text-[#4a242c] font-light leading-relaxed">
            {letter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Handwritten Celebration & Sign-off */}
          <div className="mt-8 pt-4 border-t border-[#eeddc8]">
            <p className="font-script text-3xl sm:text-4xl text-[#82323f] mb-1">
              {letter.celebrationText}
            </p>
            <p className="font-serif italic text-sm sm:text-base text-[#6e3d46]">
              {letter.signOff}
            </p>
          </div>

          {/* Hand-drawn Botanical Line Drawing */}
          <div className="absolute bottom-6 right-8 w-16 h-20 opacity-40 pointer-events-none">
            <svg viewBox="0 0 100 120" fill="none" stroke="#82323f" strokeWidth="1.5">
              <path d="M50 110 C50 70 60 40 50 10 M50 70 C40 60 30 65 25 75 M50 45 C60 35 70 40 75 50" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Bottom Right Advance Button */}
      <div className="shrink-0 flex items-center justify-end w-full max-w-4xl mx-auto z-20">
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          aria-label="Next scene"
          className="w-11 h-11 rounded-full bg-[#e0958b] hover:bg-[#d97d74] text-[#240b12] flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
