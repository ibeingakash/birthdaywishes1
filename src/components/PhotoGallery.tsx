import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';

interface PhotoGalleryProps {
  onContinue: () => void;
  onPrevScene: () => void;
}

export default function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [localPhotoOverrides, setLocalPhotoOverrides] = useState<Record<string, string>>({});
  const touchStartXRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const photos = birthdayConfig.gallery.photos;
  const currentPhoto = photos[currentIndex] || photos[0];
  const activeImageUrl = localPhotoOverrides[currentPhoto.id] || currentPhoto.url;
  const hasRealImage = Boolean(activeImageUrl && activeImageUrl.trim().length > 0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    audioEngine.playStarSparkle();
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    audioEngine.playStarSparkle();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 40) handlePrev();
    if (deltaX < -40) handleNext();
    touchStartXRef.current = null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLocalPhotoOverrides((prev) => ({
        ...prev,
        [currentPhoto.id]: previewUrl
      }));
      audioEngine.playStarSparkle();
    }
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100svh] min-h-[620px] flex flex-col justify-between px-6 pt-16 pb-16 select-none overflow-hidden"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Atmospheric Ambient Backdrop Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[450px] sm:w-[650px] h-[550px] sm:h-[750px] rounded-full bg-radial from-[#133d4d]/30 via-[#071922]/15 to-transparent blur-3xl" />
      </div>

      {/* Scene Header */}
      <div className="max-w-xl mx-auto text-center shrink-0 z-20">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#e6c887] font-medium">
            {birthdayConfig.gallery.eyebrow}
          </span>
          <span className="text-[#3b6070]">·</span>
          <span className="text-xs text-[#9ec0cc] font-serif font-medium">
            {currentIndex + 1} of {photos.length}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#faeed1] font-normal tracking-tight">
          {birthdayConfig.gallery.headline}
        </h2>
      </div>

      {/* Main Single Large Portrait Display Stage */}
      <div className="relative flex-1 w-full max-w-2xl mx-auto flex items-center justify-center my-auto min-h-0 py-2 z-10">
        {/* Navigation Arrow - Left */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous portrait"
          className="absolute -left-2 sm:-left-12 z-30 p-3 rounded-full bg-[#071922]/90 hover:bg-[#123947] border border-[#1b4352] text-[#faeed1] transition-all cursor-pointer shadow-xl active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Dominant Portrait Frame with AnimatePresence */}
        <div className="relative w-full h-[54vh] sm:h-[58vh] max-h-[580px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPhoto.id || currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 0.96, x: direction * 35 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: direction * -35 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-sm sm:max-w-md flex flex-col justify-end rounded-3xl overflow-hidden border-2 border-[#1c4859]/90 bg-[#071922] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Corner Filigree Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#e6c887]/60 z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#e6c887]/60 z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#e6c887]/60 z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#e6c887]/60 z-20 pointer-events-none" />

              {/* Genuine Photograph or Tasteful Replaceable Portrait Placeholder */}
              {hasRealImage ? (
                <div className="relative w-full h-full bg-[#051319] overflow-hidden">
                  <img
                    src={activeImageUrl}
                    alt={currentPhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Bottom Vignette for legible caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051117] via-[#051117]/60 to-transparent" />
                </div>
              ) : (
                /* Tasteful Architectural Portrait Placeholder (Never unrelated tea or scenery) */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#0a232e] via-[#071922] to-[#040e13]">
                  {/* Starlit Monogram Crest */}
                  <div className="w-24 h-24 rounded-full border-2 border-[#e6c887]/70 bg-gradient-to-b from-[#123947] to-[#081b24] shadow-[0_0_35px_rgba(230,200,135,0.3)] flex flex-col items-center justify-center mb-6">
                    <span className="font-serif text-4xl text-[#faeed1] font-semibold">K</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#e6c887] mt-0.5">Portrait</span>
                  </div>

                  <span className="text-[11px] text-[#e6c887] tracking-[0.25em] uppercase font-medium mb-1">
                    {currentPhoto.dateOrPlace}
                  </span>
                  <h3 className="font-serif text-2xl text-[#faeed1] font-normal mb-3">
                    {currentPhoto.title}
                  </h3>

                  <p className="text-xs text-[#9ec0cc] font-light max-w-xs leading-relaxed mb-6">
                    {currentPhoto.caption}
                  </p>

                  {/* Browser Live Preview Action for Keti's Photo */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0c2e3b] hover:bg-[#154659] border border-[#1e566d] text-xs font-medium text-[#faeed1] rounded-xl transition-all cursor-pointer shadow-md hover:border-[#e6c887]/60 active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#e6c887]" />
                    <span>Upload Keti's Photo Preview</span>
                  </button>

                  <span className="text-[10px] text-[#5e8291] mt-3 tracking-wide">
                    Or configure in src/birthdayConfig.ts
                  </span>
                </div>
              )}

              {/* Caption Overlay when real image is present */}
              {hasRealImage && (
                <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h3 className="font-serif text-2xl text-[#faeed1] font-normal">
                      {currentPhoto.title}
                    </h3>
                    {currentPhoto.dateOrPlace && (
                      <span className="text-[11px] text-[#e6c887] font-medium tracking-wide">
                        {currentPhoto.dateOrPlace}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#b2cdd8] font-light leading-relaxed">
                    {currentPhoto.caption}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrow - Right */}
        <button
          onClick={handleNext}
          type="button"
          aria-label="Next portrait"
          className="absolute -right-2 sm:-right-12 z-30 p-3 rounded-full bg-[#071922]/90 hover:bg-[#123947] border border-[#1b4352] text-[#faeed1] transition-all cursor-pointer shadow-xl active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Toolbar & Action to Scene 4 */}
      <div className="shrink-0 flex items-center justify-between w-full max-w-xl mx-auto gap-4 z-20">
        {/* Discrete Portrait Selector Dots */}
        <div className="flex items-center gap-2">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                audioEngine.playStarSparkle();
              }}
              type="button"
              aria-label={`View portrait ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-gradient-to-r from-[#faeed1] to-[#e6c887] shadow-[0_0_8px_rgba(230,200,135,0.6)]'
                  : 'w-2 bg-[#1b4352] hover:bg-[#9ec0cc]'
              }`}
            />
          ))}
        </div>

        {/* Primary Action Button to Next Scene */}
        <button
          onClick={() => {
            audioEngine.playStarSparkle();
            onContinue();
          }}
          type="button"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#fae8b2] via-[#e6c887] to-[#d4af37] text-[#061217] text-xs font-medium uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_25px_rgba(230,200,135,0.45)] cursor-pointer active:scale-95 shadow-md"
        >
          <span>Read Birthday Letter</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#061217]" />
        </button>
      </div>
    </section>
  );
}
