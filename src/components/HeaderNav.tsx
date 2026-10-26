import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audio';
import { birthdayConfig } from '../birthdayConfig';
import { SCENES } from './SceneNavigationControls';

interface HeaderNavProps {
  currentScene: number;
  onNavigateScene: (sceneIndex: number) => void;
}

export default function HeaderNav({ currentScene, onNavigateScene }: HeaderNavProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  const handleAudioToggle = async () => {
    await audioEngine.toggle();
  };

  const currentMeta = SCENES[currentScene] || SCENES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 px-6 sm:px-10 flex items-center justify-between border-b border-[#14303b]/40 bg-[#061217]/60 backdrop-blur-md">
      {/* Brand Zone */}
      <button
        onClick={() => onNavigateScene(0)}
        type="button"
        className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-[#faeed1] hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
      >
        <span>For {birthdayConfig.recipient.name}</span>
        <span className="text-xs text-[#e6c887] opacity-80" aria-hidden="true">✨</span>
      </button>

      {/* Quiet Center Indicator */}
      <div className="hidden sm:flex items-center gap-2 text-xs text-[#8ab0be] font-medium tracking-wide">
        <span className="text-[#e6c887] font-serif">{currentMeta.number}</span>
        <span className="text-[#416270]">/</span>
        <span className="text-[#658b99]">07</span>
        <span className="text-[#416270]">·</span>
        <span className="text-[#d7e9f0] font-light">{currentMeta.label}</span>
      </div>

      {/* Music Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleAudioToggle}
          type="button"
          aria-label={isPlaying ? 'Mute celestial ambient music' : 'Play celestial ambient music'}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs font-medium text-[#faeed1] bg-[#0c242e] border border-[#1d4554] rounded-xl hover:bg-[#123340] hover:border-[#e6c887]/50 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#e6c887] animate-pulse" />
              <span className="hidden sm:inline">Ambient Audio</span>
              <span className="sm:hidden">Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#8ab0be]" />
              <span className="hidden sm:inline">Play Ambient</span>
              <span className="sm:hidden">Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
