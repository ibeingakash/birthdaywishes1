import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface HeroSceneProps {
  onBegin: () => void;
}

export default function HeroScene({ onBegin }: HeroSceneProps) {
  const handleBegin = async () => {
    if (!audioEngine.getIsPlaying()) {
      await audioEngine.start();
    }
    audioEngine.playStarSparkle();
    onBegin();
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[580px] flex flex-col items-center justify-center text-center px-6 select-none overflow-hidden">
      {/* Layered Environmental Lighting & Astrological Circles */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-radial from-[#123947]/35 via-[#09222c]/18 to-transparent blur-3xl" />
        <div className="absolute w-[640px] sm:w-[860px] h-[640px] sm:h-[860px] rounded-full border border-[#173e4d]/30" />
        <div className="absolute w-[440px] sm:w-[620px] h-[440px] sm:h-[620px] rounded-full border border-dashed border-[#e6c887]/20" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center px-4">
        {/* Intimate Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.35em] text-[#e6c887] mb-6 font-medium"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#e6c887]" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
            A Personal Birthday Surprise
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#e6c887]" />
        </motion.div>

        {/* Cinematic Headline for Keti */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-8xl lg:text-9xl font-normal tracking-tight text-[#faeed1] mb-6 leading-[0.98] drop-shadow-md"
          style={{ textWrap: 'balance' }}
        >
          Happy Birthday, {birthdayConfig.recipient.name}
          <span className="inline-block ml-3 sm:ml-4 text-4xl sm:text-6xl text-[#e6c887] align-top animate-pulse">✨</span>
        </motion.h1>

        {/* Personal Birthday Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-[#9ec0cc] font-light max-w-lg mb-10 leading-relaxed"
          style={{ textWrap: 'balance' }}
        >
          {birthdayConfig.recipient.subtitle}
        </motion.p>

        {/* Primary Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={handleBegin}
            type="button"
            className="group relative inline-flex items-center gap-3 px-10 py-4 text-sm sm:text-base font-medium tracking-wide text-[#061217] bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] rounded-2xl hover:shadow-[0_0_40px_rgba(230,200,135,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-xl"
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="w-4 h-4 text-[#061217] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <span className="text-[11px] text-[#7196a4] tracking-widest uppercase font-light">
            Created especially for you
          </span>
        </motion.div>
      </div>
    </section>
  );
}
