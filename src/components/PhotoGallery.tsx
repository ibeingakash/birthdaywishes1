import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';
import { getScrapbookCropUrl } from '../utils/scrapbookAssets';

interface PhotoGalleryProps {
  onContinue: () => void;
  onPrevScene: () => void;
}

export default function PhotoGallery({ onContinue, onPrevScene }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredUrl, setFeaturedUrl] = useState<string>('/assets/aistudio/image_679625cc.png');
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);

  const galleryItems = birthdayConfig.gallery.items;

  useEffect(() => {
    // Load main photo crop
    getScrapbookCropUrl('scene4_featured_photo').then((url) => {
      setFeaturedUrl(url);
    });

    // Load thumbnails
    const thumbKeys = [
      'scene4_thumb_1',
      'scene4_thumb_2',
      'scene4_thumb_3',
      'scene4_thumb_4',
      'scene4_thumb_5',
      'scene4_thumb_6',
      'scene4_thumb_7',
      'scene4_thumb_8'
    ] as const;

    Promise.all(thumbKeys.map((k) => getScrapbookCropUrl(k))).then((urls) => {
      setThumbnailUrls(urls);
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
    audioEngine.playStarSparkle();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
    audioEngine.playStarSparkle();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onContinue();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentItem = galleryItems[currentIndex] || galleryItems[0];
  const activeDisplayUrl = thumbnailUrls[currentIndex] || featuredUrl;

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between pt-16 pb-8 px-4 sm:px-10 bg-[#16090e] text-[#fbf5eb] select-none overflow-hidden">
      {/* Top Gallery Header Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm text-[#fbf5eb]/80">
            {currentIndex + 1} of {galleryItems.length}
          </span>
          <span className="text-[#a86561]">·</span>
          <span className="font-serif text-sm text-[#e0958b]">
            {currentItem.title}
          </span>
        </div>

        {/* Close Button / Return */}
        <button
          onClick={onContinue}
          type="button"
          aria-label="Proceed to Letter"
          className="p-2 rounded-full bg-[#261017] hover:bg-[#381822] text-[#fbf5eb] border border-[#481f2a] transition-all cursor-pointer shadow-md active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Single Dominant Photograph Stage */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-auto min-h-0 py-2 z-10">
        {/* Navigation Arrow - Left */}
        <button
          onClick={handlePrev}
          type="button"
          aria-label="Previous photograph"
          className="absolute left-1 sm:left-4 z-30 p-3 sm:p-4 rounded-full bg-[#261017]/90 hover:bg-[#3d1823] border border-[#481f2a] text-[#fbf5eb] transition-all cursor-pointer shadow-xl active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Featured Photo Frame */}
        <div className="relative w-full max-w-4xl h-[56vh] sm:h-[62vh] max-h-[580px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full rounded-md overflow-hidden border-2 border-[#421d28] bg-[#0d0407] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              <img
                src={currentIndex === 0 ? featuredUrl : activeDisplayUrl}
                alt={currentItem.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Bottom Right Handwritten Heart Overlay */}
              <div className="absolute bottom-4 right-5 z-20 pointer-events-none">
                <span className="font-script text-3xl sm:text-4xl text-[#f2858d] drop-shadow-md">
                  ♡
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrow - Right */}
        <button
          onClick={handleNext}
          type="button"
          aria-label="Next photograph"
          className="absolute right-1 sm:right-4 z-30 p-3 sm:p-4 rounded-full bg-[#261017]/90 hover:bg-[#3d1823] border border-[#481f2a] text-[#fbf5eb] transition-all cursor-pointer shadow-xl active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Horizontal Filmstrip Thumbnails */}
      <div className="shrink-0 w-full max-w-3xl mx-auto flex items-center justify-center gap-2 sm:gap-3 py-2 z-20 overflow-x-auto scrollbar-none">
        {galleryItems.map((item, idx) => {
          const isSelected = idx === currentIndex;
          const thumbUrl = thumbnailUrls[idx] || featuredUrl;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                audioEngine.playStarSparkle();
              }}
              type="button"
              className={`relative shrink-0 w-12 sm:w-16 h-9 sm:h-12 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#e0958b] scale-105 shadow-[0_0_12px_rgba(224,149,139,0.5)]'
                  : 'border-[#381822] opacity-60 hover:opacity-100 hover:border-[#82414e]'
              }`}
            >
              <img
                src={thumbUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
