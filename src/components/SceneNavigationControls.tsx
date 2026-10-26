import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export interface SceneMeta {
  id: string;
  label: string;
  shortLabel: string;
  number: string;
}

export const SCENES: SceneMeta[] = [
  { id: 'invitation', label: 'A Birthday Invitation', shortLabel: 'Invitation', number: '01' },
  { id: 'portal', label: 'The Celestial Journey', shortLabel: 'Journey', number: '02' },
  { id: 'gallery', label: "Keti's Portraits", shortLabel: 'Portraits', number: '03' },
  { id: 'letter', label: 'A Birthday Letter', shortLabel: 'Letter', number: '04' },
  { id: 'constellation', label: 'Constellation of Wishes', shortLabel: 'Wishes', number: '05' },
  { id: 'cake', label: 'The Birthday Finale', shortLabel: 'Finale', number: '06' },
];

interface SceneNavigationControlsProps {
  currentScene: number;
  totalScenes: number;
  onNavigate: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function SceneNavigationControls({
  currentScene,
  totalScenes,
  onNavigate,
  onNext,
  onPrev,
}: SceneNavigationControlsProps) {
  const isFirst = currentScene === 0;
  const isLast = currentScene === totalScenes - 1;

  const handleStepClick = (idx: number) => {
    if (idx !== currentScene) {
      audioEngine.playStarSparkle();
      onNavigate(idx);
    }
  };

  return (
    <nav
      aria-label="Scene navigation"
      className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 pointer-events-none px-4 flex justify-center"
    >
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-5 bg-[#06161e]/90 backdrop-blur-md border border-[#143947]/80 py-2 px-3.5 sm:px-5 rounded-full shadow-2xl">
        {/* Previous Button */}
        {!isFirst ? (
          <button
            onClick={() => {
              audioEngine.playStarSparkle();
              onPrev();
            }}
            type="button"
            aria-label="Previous scene"
            className="flex items-center gap-1 text-xs text-[#9ebac6] hover:text-[#faeed1] py-1 px-2 rounded-full hover:bg-[#0c2732] transition-colors cursor-pointer group active:scale-95"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#e6c887] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline font-medium">Back</span>
          </button>
        ) : (
          <div className="w-4 sm:w-8" />
        )}

        {/* 6 Progress Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SCENES.map((scene, idx) => {
            const isActive = idx === currentScene;
            const isPast = idx < currentScene;
            return (
              <button
                key={scene.id}
                onClick={() => handleStepClick(idx)}
                type="button"
                title={`${scene.number}: ${scene.label}`}
                aria-label={`Jump to ${scene.label}`}
                aria-current={isActive ? 'step' : undefined}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-gradient-to-r from-[#fae8b2] to-[#e6c887] shadow-[0_0_8px_rgba(230,200,135,0.7)]'
                    : isPast
                    ? 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#7cd3cf]/70 hover:bg-[#faeed1]'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#1b4352] hover:bg-[#9ec0cc]'
                }`}
              />
            );
          })}
        </div>

        {/* Next / Replay Button */}
        {!isLast ? (
          <button
            onClick={() => {
              audioEngine.playStarSparkle();
              onNext();
            }}
            type="button"
            aria-label="Next scene"
            className="flex items-center gap-1 text-xs text-[#061217] bg-gradient-to-r from-[#fae8b2] to-[#e6c887] font-medium py-1 px-3 sm:px-3.5 rounded-full transition-all hover:shadow-[0_0_12px_rgba(230,200,135,0.4)] cursor-pointer group active:scale-95"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <button
            onClick={() => {
              audioEngine.playCelebrationChimes();
              onNavigate(0);
            }}
            type="button"
            aria-label="Replay journey from beginning"
            className="flex items-center gap-1 text-xs text-[#e6c887] hover:text-[#faeed1] py-1 px-2.5 rounded-full hover:bg-[#0c2732] transition-colors cursor-pointer group"
          >
            <RotateCcw className="w-3 h-3 group-hover:-rotate-45 transition-transform" />
            <span className="font-medium">Replay</span>
          </button>
        )}
      </div>
    </nav>
  );
}
