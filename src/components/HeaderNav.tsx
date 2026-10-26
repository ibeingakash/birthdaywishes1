import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface HeaderNavProps {
  currentScene: number;
  totalScenes: number;
  onNavigateScene: (sceneIndex: number) => void;
  isDarkTheme?: boolean;
}

export default function HeaderNav({
  currentScene,
  totalScenes,
  onNavigateScene,
  isDarkTheme = false
}: HeaderNavProps) {
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

  const sceneNumber = String(currentScene + 1).padStart(2, '0');
  const totalNumber = String(totalScenes).padStart(2, '0');

  const textColor = isDarkTheme ? 'text-[#fbf5eb]' : 'text-[#3b121b]';
  const subColor = isDarkTheme ? 'text-[#d6b7b2]' : 'text-[#84535c]';
  const borderBg = isDarkTheme ? 'border-[#3d1a24]/40 bg-[#1e0a11]/40' : 'border-[#eeddcc]/50 bg-[#fdfbf7]/70';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 h-14 sm:h-16 px-6 sm:px-10 flex items-center justify-between border-b backdrop-blur-md transition-colors duration-500 ${borderBg}`}>
      {/* Brand Zone: "Happy Birthday Keti ♥" */}
      <button
        onClick={() => onNavigateScene(0)}
        type="button"
        className={`font-serif text-lg sm:text-xl font-normal tracking-wide transition-opacity hover:opacity-80 flex items-center gap-1.5 cursor-pointer ${textColor}`}
      >
        <span>Happy Birthday Keti</span>
        <span className="text-sm text-[#e0837b]">♥</span>
      </button>

      {/* Right Controls: Scene Counter & Ambient Audio */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Discrete Scene Counter */}
        <div className={`font-serif text-xs sm:text-sm tracking-widest font-medium ${subColor}`}>
          <span className={textColor}>{sceneNumber}</span>
          <span className="mx-1 opacity-50">/</span>
          <span>{totalNumber}</span>
        </div>

        {/* Ambient Audio Toggle */}
        <button
          onClick={handleAudioToggle}
          type="button"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`p-2 rounded-full border transition-all cursor-pointer active:scale-95 ${
            isDarkTheme
              ? 'bg-[#2d1119] border-[#481f2a] text-[#fbf5eb] hover:bg-[#3d1823]'
              : 'bg-[#f8f1e6] border-[#e5d6c5] text-[#4d212a] hover:bg-[#efe4d2]'
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-[#e0837b] animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
          )}
        </button>
      </div>
    </header>
  );
}
