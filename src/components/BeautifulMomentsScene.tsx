import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';
import { getScrapbookCropUrl } from '../utils/scrapbookAssets';

interface BeautifulMomentsSceneProps {
  onContinue: () => void;
  onPrev: () => void;
}

export default function BeautifulMomentsScene({
  onContinue,
  onPrev
}: BeautifulMomentsSceneProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [polaroidUrls, setPolaroidUrls] = useState<Record<string, string>>({});

  const moments = birthdayConfig.moments;

  useEffect(() => {
    // Load crops for the 3 polaroids
    Promise.all([
      getScrapbookCropUrl('scene3_polaroid_top'),
      getScrapbookCropUrl('scene3_polaroid_mid'),
      getScrapbookCropUrl('scene3_polaroid_right')
    ]).then(([topUrl, midUrl, rightUrl]) => {
      setPolaroidUrls({
        'scene3_polaroid_top': topUrl,
        'scene3_polaroid_mid': midUrl,
        'scene3_polaroid_right': rightUrl
      });
    });
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between pt-18 pb-16 px-6 sm:px-12 md:px-16 overflow-hidden paper-texture text-[#36121b] select-none">
      {/* Top Right Handwritten Script Note */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-18 right-8 sm:right-16 z-20 pointer-events-none max-w-xs text-right"
      >
        <span className="font-script text-2xl sm:text-3xl text-[#78303c] leading-tight block rotate-1">
          {moments.handwrittenAnnotation}
        </span>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative flex-1 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 my-auto z-10 py-4">
        
        {/* LEFT COLUMN: Editorial Heading, Copy & Filter Buttons */}
        <div className="w-full lg:w-5/12 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Kicker */}
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#a86561] font-medium block mb-2">
              {moments.eyebrow}
            </span>

            {/* Main Heading */}
            <h2 className="font-serif text-4xl sm:text-6xl text-[#36111a] font-normal leading-[1.05] tracking-tight mb-4">
              {moments.title}
            </h2>

            {/* Body */}
            <p className="font-sans text-sm sm:text-base text-[#69434b] font-light leading-relaxed mb-8">
              {moments.description}
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {moments.categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      audioEngine.playStarSparkle();
                      setActiveCategory(cat);
                    }}
                    type="button"
                    className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1e0a11] text-[#fff8ef] shadow-sm'
                        : 'bg-[#f4ebe0] text-[#5e3840] hover:bg-[#ebdccf]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Layered Polaroid Photo Collage */}
        <div className="relative w-full lg:w-7/12 flex items-center justify-center min-h-[360px] sm:min-h-[440px]">
          {/* Decorative Daisy Blossoms */}
          <div className="absolute -top-4 right-8 w-16 h-16 pointer-events-none opacity-85 z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
              <circle cx="50" cy="50" r="14" fill="#d47959" />
              {[...Array(12)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="20"
                  rx="6"
                  ry="18"
                  fill="#f28d84"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
          </div>

          <div className="absolute -bottom-6 left-12 w-20 h-20 pointer-events-none opacity-75 z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
              <circle cx="50" cy="50" r="15" fill="#cf7052" />
              {[...Array(10)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="22"
                  rx="7"
                  ry="19"
                  fill="#f6b8b0"
                  transform={`rotate(${i * 36} 50 50)`}
                />
              ))}
            </svg>
          </div>

          {/* Polaroid 1 (Top / Center) */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute top-0 sm:top-2 left-10 sm:left-20 w-44 sm:w-56 polaroid-frame -rotate-2 z-10 transition-transform hover:scale-105 hover:z-30 cursor-pointer"
            onClick={onContinue}
          >
            {/* Washi tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#fff9ed]/80 border-x border-[#dfd1be] rotate-1" />
            <div className="w-full aspect-[4/3] bg-[#2d121a] overflow-hidden rounded-xs">
              <img
                src={polaroidUrls['scene3_polaroid_top'] || '/assets/aistudio/image_679625cc.png'}
                alt="Spring sunlight"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-script text-lg text-[#66303a]">Spring Sunlight ♡</span>
            </div>
          </motion.div>

          {/* Polaroid 2 (Bottom Left / Overlapping) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="absolute bottom-2 left-4 sm:left-12 w-40 sm:w-52 polaroid-frame rotate-4 z-20 transition-transform hover:scale-105 hover:z-30 cursor-pointer"
            onClick={onContinue}
          >
            <div className="w-full aspect-square bg-[#2d121a] overflow-hidden rounded-xs">
              <img
                src={polaroidUrls['scene3_polaroid_mid'] || '/assets/aistudio/image_679625cc.png'}
                alt="Golden hour"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-script text-lg text-[#66303a]">Golden Hour</span>
            </div>
          </motion.div>

          {/* Polaroid 3 (Bottom Right / Overlapping) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="absolute bottom-4 right-4 sm:right-16 w-42 sm:w-54 polaroid-frame -rotate-2 z-15 transition-transform hover:scale-105 hover:z-30 cursor-pointer"
            onClick={onContinue}
          >
            <div className="w-full aspect-square bg-[#2d121a] overflow-hidden rounded-xs">
              <img
                src={polaroidUrls['scene3_polaroid_right'] || '/assets/aistudio/image_679625cc.png'}
                alt="Quiet mornings"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-script text-lg text-[#66303a]">Quiet Moments ♡</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="shrink-0 flex items-center justify-end w-full max-w-6xl mx-auto gap-3 pt-2 z-20">
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onPrev();
          }}
          type="button"
          aria-label="Previous scene"
          className="w-10 h-10 rounded-full bg-[#1e0a11] text-[#fff8ef] hover:bg-[#381822] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          aria-label="Next scene"
          className="w-10 h-10 rounded-full bg-[#1e0a11] text-[#fff8ef] hover:bg-[#381822] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
