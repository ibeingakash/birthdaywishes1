import { motion } from 'motion/react';
import { Feather, Heart, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface BirthdayLetterProps {
  onContinue: () => void;
  onPrev: () => void;
}

export default function BirthdayLetter({ onContinue }: BirthdayLetterProps) {
  const letter = birthdayConfig.letter;

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] flex flex-col justify-between px-6 sm:px-12 pt-16 pb-16 select-none overflow-hidden">
      {/* Subtle Environmental Backdrop */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] sm:w-[900px] h-[500px] sm:h-[700px] rounded-full bg-radial from-[#123a4a]/25 via-[#081c24]/12 to-transparent blur-3xl" />
      </div>

      {/* Scene Header */}
      <div className="max-w-2xl mx-auto text-center shrink-0 z-20">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#e6c887] font-medium block mb-1">
          From the Heart
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#faeed1] font-normal tracking-tight">
          {letter.heading}
        </h2>
      </div>

      {/* Main Expansive Manuscript Reading Pane */}
      <div className="relative flex-1 w-full max-w-3xl mx-auto overflow-y-auto px-4 sm:px-8 py-3 my-auto max-h-[62vh] scrollbar-thin z-10">
        <div className="relative flex flex-col items-start w-full">
          {/* Top Seal & Monogram Lockup */}
          <div className="flex items-center justify-between w-full mb-8 pb-4 border-b border-[#143d4d]/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#123947] to-[#071b22] border-2 border-[#e6c887]/80 flex items-center justify-center shadow-lg shrink-0">
                <span className="font-serif text-2xl font-bold text-[#faeed1]">K</span>
              </div>
              <div>
                <span className="font-serif text-lg text-[#faeed1] block">
                  For {birthdayConfig.recipient.name}
                </span>
                <span className="text-[10px] text-[#7196a4] tracking-[0.2em] uppercase block">
                  A Personal Birthday Dedication
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#e6c887] font-serif italic">
              <Feather className="w-4 h-4 text-[#e6c887]" />
              <span className="hidden sm:inline">Written with deep warmth</span>
            </div>
          </div>

          {/* Salutation */}
          <h3 className="font-serif text-3xl sm:text-4xl text-[#faeed1] font-normal mb-6">
            {letter.salutation}
          </h3>

          {/* Staggered Paragraphs with Large Editorial Drop Cap */}
          <div className="space-y-6 text-[#c4dce6] text-base sm:text-lg leading-relaxed font-light">
            {letter.paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                className={idx === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-[#faeed1] first-letter:mr-2 first-letter:float-left' : ''}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Sincere Signoff */}
          <div className="mt-10 pt-6 border-t border-[#143d4d]/60 w-full flex items-end justify-between gap-4">
            <div>
              <p className="font-serif italic text-lg text-[#faeed1]/90 mb-1">
                {letter.closing}
              </p>
              <p className="font-serif text-2xl sm:text-3xl text-[#faeed1] font-medium">
                {letter.signature}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#e6c887] mb-1">
              <Heart className="w-4 h-4 fill-[#e6c887]" />
              <span className="hidden sm:inline tracking-wider font-light">Cherished in every season</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scene Toolbar */}
      <div className="shrink-0 flex items-center justify-end w-full max-w-3xl mx-auto z-20 pt-2">
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_25px_rgba(230,200,135,0.45)] cursor-pointer active:scale-95 shadow-md"
        >
          <span>Explore Star Map</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#061217]" />
        </button>
      </div>
    </section>
  );
}
