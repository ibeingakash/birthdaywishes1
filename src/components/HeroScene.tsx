import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Info } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';
import { getScrapbookCropUrl } from '../utils/scrapbookAssets';

interface HeroSceneProps {
  onBegin: () => void;
}

export default function HeroScene({ onBegin }: HeroSceneProps) {
  const [windowPhotoUrl, setWindowPhotoUrl] = useState<string>('/assets/aistudio/image_679625cc.png');

  useEffect(() => {
    getScrapbookCropUrl('scene1_window_photo').then((url) => {
      setWindowPhotoUrl(url);
    });
  }, []);

  const handleBegin = async () => {
    if (!audioEngine.getIsPlaying()) {
      await audioEngine.start();
    }
    audioEngine.playStarSparkle();
    onBegin();
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col md:flex-row overflow-hidden bg-[#240b12] text-[#faeed1] select-none">
      {/* LEFT HALF: Cinematic Warm Window Photograph */}
      <div className="relative w-full md:w-1/2 h-[45svh] md:h-full overflow-hidden bg-[#1f090f]">
        {/* The Window Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-left-top transition-transform duration-1000 scale-105 hover:scale-100"
          style={{
            backgroundImage: `url(${windowPhotoUrl})`,
            backgroundPosition: 'left center'
          }}
        />

        {/* Warm Golden Hour Light Overlay & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#240b12] opacity-80 md:opacity-90" />
        <div className="absolute inset-0 bg-[#36111a]/20 mix-blend-overlay" />

        {/* Handwritten Annotation on the Window/Curtain */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute top-16 md:top-20 left-8 md:left-14 max-w-[240px] sm:max-w-[280px] z-20 pointer-events-none"
        >
          <p className="font-script text-2xl sm:text-3xl text-[#faeed1] leading-snug drop-shadow-[0_2px_8px_rgba(30,10,15,0.8)] -rotate-3">
            Some people just make the world feel brighter. ♡
          </p>
        </motion.div>
      </div>

      {/* RIGHT HALF: Deep Burgundy Editorial Panel */}
      <div className="relative w-full md:w-1/2 h-[55svh] md:h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 py-8 md:py-16 bg-[#260c13] z-10">
        {/* Subtle Ambient Radial Warmth */}
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-radial from-[#d97d74]/15 to-transparent blur-3xl pointer-events-none" />

        {/* Top Spacer to balance with HeaderNav */}
        <div className="h-8 md:h-12 shrink-0" />

        {/* Center Main Content */}
        <div className="my-auto max-w-md">
          {/* Large Editorial Serif: "Happy Birthday" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#faeed1] leading-[0.92] tracking-tight">
              Happy<br />
              Birthday
            </h1>
          </motion.div>

          {/* Expressive Script Name: "Keti ♥" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 my-3 sm:my-5"
          >
            <span className="font-signature text-6xl sm:text-8xl lg:text-9xl text-[#f2858d] tracking-wide leading-none -rotate-2 drop-shadow-sm">
              Keti
            </span>
            <span className="text-2xl sm:text-3xl text-[#f2858d] mb-4 animate-pulse">♥</span>
          </motion.div>

          {/* Sincere Birthday Message */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-base text-[#e8c8c6] font-light leading-relaxed max-w-sm mb-8"
          >
            {birthdayConfig.recipient.shortMessage}
          </motion.p>

          {/* Coral / Pink Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleBegin}
              type="button"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#e0958b] hover:bg-[#d97d74] text-[#240b12] font-sans text-sm sm:text-base font-medium rounded-full shadow-[0_8px_25px_rgba(224,149,139,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{birthdayConfig.recipient.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Progress Note */}
        <div className="shrink-0 pt-4 flex items-center gap-2 text-[11px] text-[#b88c92] font-sans tracking-wide">
          <span>Scroll or click to begin</span>
          <Info className="w-3 h-3 opacity-70" />
        </div>
      </div>
    </section>
  );
}
