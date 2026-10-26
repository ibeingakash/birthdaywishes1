/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BackgroundCanvas from './components/BackgroundCanvas';
import HeaderNav from './components/HeaderNav';
import SceneNavigationControls, { SCENES } from './components/SceneNavigationControls';
import HeroScene from './components/HeroScene';
import CelestialInteractiveScene from './components/CelestialInteractiveScene';
import PhotoGallery from './components/PhotoGallery';
import BirthdayLetter from './components/BirthdayLetter';
import ConstellationMapScene from './components/ConstellationMapScene';
import WishCapsuleScene from './components/WishCapsuleScene';
import BirthdayCakeScene from './components/BirthdayCakeScene';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalScenes = SCENES.length;

  const goToScene = useCallback((targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < totalScenes) {
      setDirection(targetIndex > currentScene ? 1 : -1);
      setCurrentScene(targetIndex);
    }
  }, [currentScene, totalScenes]);

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
  // (Disabled when typing inside an input/textarea, or on the gallery scene where arrows switch photos)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
      if (isInput) return;

      // When on gallery scene (index 2), let gallery handle internal photo switching
      if (currentScene === 2) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, handleNext, handlePrev]);

  // Render current active scene component
  const renderActiveScene = () => {
    switch (currentScene) {
      case 0:
        return <HeroScene onBegin={() => goToScene(1)} />;
      case 1:
        return (
          <CelestialInteractiveScene
            onContinue={() => goToScene(2)}
            onPrev={() => goToScene(0)}
          />
        );
      case 2:
        return (
          <PhotoGallery
            onContinue={() => goToScene(3)}
            onPrevScene={() => goToScene(1)}
          />
        );
      case 3:
        return (
          <BirthdayLetter
            onContinue={() => goToScene(4)}
            onPrev={() => goToScene(2)}
          />
        );
      case 4:
        return (
          <ConstellationMapScene
            onContinue={() => goToScene(5)}
            onPrev={() => goToScene(3)}
          />
        );
      case 5:
        return (
          <WishCapsuleScene
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
    <div className="relative w-screen h-[100svh] overflow-hidden bg-[#061217] text-[#e2ecf0] selection:bg-[#e6c887]/30 selection:text-[#fae8b2]">
      {/* Fixed Ambient Starry Sky Background */}
      <BackgroundCanvas />

      {/* Persistent Header Navigation & Music Controls */}
      <HeaderNav
        currentScene={currentScene}
        onNavigateScene={goToScene}
      />

      {/* Main Full-Screen Scene Container with Cinematic Transitions */}
      <main className="relative w-full h-full z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            initial={{ opacity: 0, x: direction * 45, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -45, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
      />
    </div>
  );
}
