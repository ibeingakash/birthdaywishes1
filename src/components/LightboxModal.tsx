import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GalleryPhoto } from '../birthdayConfig';

interface LightboxModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalPhotos: number;
}

export default function LightboxModal({
  photo,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalPhotos
}: LightboxModalProps) {
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [photo, onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 45) {
      onPrev();
    } else if (deltaX < -45) {
      onNext();
    }
    touchStartXRef.current = null;
  };

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040d12]/92 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar with Counter & Close */}
      <div
        className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs text-[#9ec0cc] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="tracking-widest uppercase">
          {currentIndex + 1} of {totalPhotos}
        </span>
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="p-2 text-[#9ec0cc] hover:text-[#faeed1] bg-[#0c242e] border border-[#1d4554] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Navigation Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        type="button"
        aria-label="Previous image"
        className="absolute left-3 sm:left-8 p-3 text-[#faeed1] bg-[#0c242e]/80 hover:bg-[#143d4c] border border-[#1d4554] rounded-full transition-all cursor-pointer z-10 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image & Caption Container */}
      <div
        className="max-w-4xl max-h-[85vh] flex flex-col items-center bg-[#071922] border border-[#193e4d] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[65vh] flex items-center justify-center bg-[#051319] overflow-hidden">
          <img
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="max-h-[65vh] w-auto object-contain transition-transform duration-300"
            onError={(e) => {
              // Fallback if custom image fails to load
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = parent.querySelector('.img-fallback');
                if (fallback) (fallback as HTMLElement).style.display = 'flex';
              }
            }}
          />
          <div className="img-fallback hidden flex-col items-center justify-center p-12 text-center text-[#7ea3b0]">
            <ImageIcon className="w-12 h-12 text-[#e6c887] mb-3" />
            <p className="font-serif text-lg text-[#faeed1]">{photo.title}</p>
            <p className="text-xs text-[#7ea3b0] mt-1">Image ready to be placed</p>
          </div>
        </div>

        {/* Caption Area */}
        <div className="w-full p-6 bg-[#071922] border-t border-[#14303b]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-serif text-2xl text-[#faeed1]">{photo.title}</h3>
            {photo.dateOrPlace && (
              <span className="text-xs text-[#e6c887] font-medium tracking-wide">
                {photo.dateOrPlace}
              </span>
            )}
          </div>
          <p className="text-sm text-[#9ec0cc] leading-relaxed font-light">
            {photo.caption}
          </p>
        </div>
      </div>

      {/* Next Navigation Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        type="button"
        aria-label="Next image"
        className="absolute right-3 sm:right-8 p-3 text-[#faeed1] bg-[#0c242e]/80 hover:bg-[#143d4c] border border-[#1d4554] rounded-full transition-all cursor-pointer z-10 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
