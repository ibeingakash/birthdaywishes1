import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import HeaderNav from './components/HeaderNav';
import SceneNavigationControls, { SCENES } from './components/SceneNavigationControls';
import HeroScene from './components/HeroScene';
import ScrapbookIntroScene from './components/ScrapbookIntroScene';
import BeautifulMomentsScene from './components/BeautifulMomentsScene';
import PhotoGallery from './components/PhotoGallery';
import BirthdayLetter from './components/BirthdayLetter';
import BirthdayWishesScene from './components/BirthdayWishesScene';
import BirthdayCakeScene from './components/BirthdayCakeScene';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalScenes = SCENES.length; // 7 scenes

  const goToScene = useCallback(
    (targetIndex: number) => {
      if (targetIndex >= 0 && targetIndex < totalScenes) {
        setDirection(targetIndex > currentScene ? 1 : -1);
        setCurrentScene(targetIndex);
      }
    },
    [currentScene, totalScenes]
  );

  const handleNext = useCallback(() => {
    if (currentScene < totalScenes - 1) {
      goToScene(currentScene + 1);
    }
  }, [currentScene, totalScenes, goToScene]);

  const handlePrev = useCallback(() => {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  }, [currentScene, goToScene]);

  // Global keyboard navigation: Left/Right arrows between scenes
  // (Disabled on Gallery scene index 3 where arrows navigate photo thumbnails)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
      if (isInput) return;

      if (currentScene === 3) return; // Photo Gallery handles its own internal navigation

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, handleNext, handlePrev]);

  // Determine whether current scene has a dark or light paper theme
  const isDarkScene = currentScene === 0 || currentScene === 3 || currentScene === 4 || currentScene === 6;

  // Render current active scene component
  const renderActiveScene = () => {
    switch (currentScene) {
      case 0:
        return <HeroScene onBegin={() => goToScene(1)} />;
      case 1:
        return (
          <ScrapbookIntroScene
            onContinue={() => goToScene(2)}
            onNavigateChapter={(sceneIdx) => goToScene(sceneIdx)}
          />
        );
      case 2:
        return (
          <BeautifulMomentsScene
            onContinue={() => goToScene(3)}
            onPrev={() => goToScene(1)}
          />
        );
      case 3:
        return (
          <PhotoGallery
            onContinue={() => goToScene(4)}
            onPrevScene={() => goToScene(2)}
          />
        );
      case 4:
        return (
          <BirthdayLetter
            onContinue={() => goToScene(5)}
            onPrev={() => goToScene(3)}
          />
        );
      case 5:
        return (
          <BirthdayWishesScene
            onContinue={() => goToScene(6)}
            onPrev={() => goToScene(4)}
          />
        );
      case 6:
        return (
          <BirthdayCakeScene
            onReplay={() => goToScene(0)}
            onPrev={() => goToScene(5)}
          />
        );
      default:
        return <HeroScene onBegin={() => goToScene(1)} />;
    }
  };

  return (
    <div className={`relative w-screen h-[100svh] overflow-hidden ${isDarkScene ? 'bg-[#18090f] text-[#fbf5eb]' : 'bg-[#fbf6ee] text-[#36121b]'}`}>
      {/* Persistent Header Navigation & Music Controls */}
      <HeaderNav
        currentScene={currentScene}
        totalScenes={totalScenes}
        onNavigateScene={goToScene}
        isDarkTheme={isDarkScene}
      />

      {/* Main Full-Screen Scene Container with Cinematic Transitions */}
      <main className="relative w-full h-full z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            initial={{ opacity: 0, x: direction * 35, filter: 'blur(3px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -35, filter: 'blur(3px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {renderActiveScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Discreet Bottom Scene Progress & Navigation Controls */}
      <SceneNavigationControls
        currentScene={currentScene}
        totalScenes={totalScenes}
        onNavigate={goToScene}
        onNext={handleNext}
        onPrev={handlePrev}
        isDarkTheme={isDarkScene}
      />
    </div>
  );
}
