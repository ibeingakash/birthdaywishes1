import { ChevronLeft, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export interface SceneMeta {
  id: string;
  label: string;
  number: string;
}

export const SCENES: SceneMeta[] = [
  { id: 'invitation', label: 'Birthday Invitation', number: '01' },
  { id: 'introduction', label: 'A Special Day', number: '02' },
  { id: 'moments', label: 'Beautiful Moments', number: '03' },
  { id: 'gallery', label: 'Photo Gallery', number: '04' },
  { id: 'letter', label: 'A Birthday Letter', number: '05' },
  { id: 'wishes', label: 'Birthday Wishes', number: '06' },
  { id: 'cake', label: 'The Birthday Cake', number: '07' }
];

interface SceneNavigationControlsProps {
  currentScene: number;
  totalScenes: number;
  onNavigate: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isDarkTheme?: boolean;
}

export default function SceneNavigationControls({
  currentScene,
  totalScenes,
  onNavigate,
  onNext,
  onPrev,
  isDarkTheme = false
}: SceneNavigationControlsProps) {
  // Hide on Scene 0 (Invitation has its own primary "Open Your Birthday Surprise" button)
  if (currentScene === 0) {
    return null;
  }

  const handleStepClick = (idx: number) => {
    if (idx !== currentScene) {
      audioEngine.playStarSparkle();
      onNavigate(idx);
    }
  };

  const isFirst = currentScene === 0;
  const isLast = currentScene === totalScenes - 1;

  const btnBg = isDarkTheme
    ? 'bg-[#261017]/90 text-[#fbf5eb] border-[#421d28] hover:bg-[#381822]'
    : 'bg-[#ffffff]/90 text-[#3b121b] border-[#e8d8c8] hover:bg-[#f6eee4]';

  return (
    <nav
      aria-label="Scene navigation"
      className="fixed bottom-4 left-0 right-0 z-40 pointer-events-none px-6 flex justify-between items-center max-w-5xl mx-auto"
    >
      {/* Previous Button */}
      <div className="pointer-events-auto">
        {!isFirst ? (
          <button
            onClick={() => {
              audioEngine.playStarSparkle();
              onPrev();
            }}
            type="button"
            aria-label="Previous scene"
            className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-md transition-all active:scale-95 cursor-pointer ${btnBg}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}
      </div>

      {/* Discrete Step Indicators */}
      <div className="pointer-events-auto flex items-center gap-2 bg-[#fdfaf5]/80 dark:bg-[#1b080e]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#ebdccf]/60 shadow-sm">
        {Array.from({ length: totalScenes }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleStepClick(idx)}
            type="button"
            aria-label={`Go to scene ${idx + 1}`}
            className={`transition-all rounded-full cursor-pointer ${
              idx === currentScene
                ? 'w-5 h-1.5 bg-[#d97d74]'
                : 'w-1.5 h-1.5 bg-[#cfb5a6] hover:bg-[#a87a6d]'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="pointer-events-auto">
        {!isLast ? (
          <button
            onClick={() => {
              audioEngine.playStarSparkle();
              onNext();
            }}
            type="button"
            aria-label="Next scene"
            className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-md transition-all active:scale-95 cursor-pointer ${btnBg}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}
      </div>
    </nav>
  );
}
