import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';
import { audioEngine } from '../utils/audio';
import { getScrapbookCropUrl } from '../utils/scrapbookAssets';

interface ScrapbookIntroSceneProps {
  onContinue: () => void;
  onNavigateChapter: (sceneIndex: number) => void;
}

export default function ScrapbookIntroScene({
  onContinue,
  onNavigateChapter
}: ScrapbookIntroSceneProps) {
  const [polaroidUrl, setPolaroidUrl] = useState<string>('/assets/aistudio/image_679625cc.png');

  useEffect(() => {
    getScrapbookCropUrl('scene2_skyline_polaroid').then((url) => {
      setPolaroidUrl(url);
    });
  }, []);

  const intro = birthdayConfig.introduction;

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between pt-18 pb-16 px-6 sm:px-12 md:px-16 overflow-hidden paper-texture text-[#36121b] select-none">
      {/* Background Soft Shadows and Botanical Florals */}
      <div className="absolute top-10 right-12 w-48 h-48 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-[#84434e]">
          <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
        </svg>
      </div>

      {/* Main Content Grid: Left Scrapbook Polaroid + Right Chapter List */}
      <div className="relative flex-1 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 my-auto z-10 py-4">
        
        {/* LEFT COLUMN: Layered Ripped Paper, Film Strip & Polaroid */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          {/* Layered Ripped Paper Note */}
          <motion.div
            initial={{ opacity: 0, rotate: -4, y: 20 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-72 sm:w-84 p-6 sm:p-8 bg-[#fffdfa] border border-[#e8dbc9] rounded-sm shadow-[0_12px_30px_rgba(50,20,25,0.1)] -rotate-2"
          >
            {/* Washi tape strip on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#eeddc8]/75 backdrop-blur-xs border-y border-[#ddcbb4]/60 rotate-1 shadow-xs" />

            {/* Handwritten Note */}
            <p className="font-script text-2xl sm:text-3xl text-[#82323f] leading-snug text-center mb-6 pt-2">
              {intro.scriptNote}
            </p>

            {/* Film Strip running vertically */}
            <div className="absolute -left-5 top-1/4 bottom-8 w-7 bg-[#1c0d12] rounded-xs flex flex-col justify-around items-center py-2 shadow-md">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3.5 h-2.5 bg-[#fff8ef] rounded-xs" />
              ))}
            </div>

            {/* Polaroid Photo overlapping on bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative -mb-10 sm:-mb-14 mx-auto w-52 sm:w-60 bg-white p-3 pb-8 rounded-xs shadow-[0_16px_35px_rgba(45,15,20,0.18)] rotate-4 border border-[#e2d4c0]"
            >
              {/* Photo Image */}
              <div className="w-full aspect-[4/3] bg-[#2d121a] overflow-hidden rounded-xs relative">
                <img
                  src={polaroidUrl}
                  alt="Keti's special day"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-2 text-right pr-2">
                <span className="font-script text-xl text-[#78303c]">
                  {intro.polaroidCaption}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Chapter Timeline & Navigation List */}
        <div className="w-full md:w-1/2 max-w-md pl-4 md:pl-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3b121c] font-normal mb-8 tracking-tight">
              {intro.title}
            </h2>

            {/* Chapter Timeline Nodes */}
            <div className="relative pl-6 space-y-6">
              {/* Vertical connecting line */}
              <div className="absolute left-2.5 top-2.5 bottom-2.5 w-[1.5px] bg-[#d9c4b2]" />

              {intro.chapters.map((chap, idx) => {
                const isActive = idx === 0;
                return (
                  <button
                    key={chap.number}
                    onClick={() => {
                      audioEngine.playStarSparkle();
                      onNavigateChapter(chap.sceneIndex);
                    }}
                    type="button"
                    className="group relative flex items-center gap-4 text-left cursor-pointer transition-all w-full active:scale-98"
                  >
                    {/* Node Circle */}
                    <div
                      className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? 'border-[#c76559] bg-[#fffdfa]'
                          : 'border-[#c2aba0] bg-[#fffdfa] group-hover:border-[#c76559]'
                      }`}
                    >
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#c76559]" />
                      )}
                    </div>

                    {/* Chapter Number & Title */}
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xs tracking-widest text-[#947167]">
                        {chap.number}
                      </span>
                      <span
                        className={`font-serif text-lg transition-colors ${
                          isActive
                            ? 'text-[#3b121c] font-semibold'
                            : 'text-[#6e464d] group-hover:text-[#3b121c]'
                        }`}
                      >
                        {chap.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Action */}
            <div className="mt-10 pt-4 flex justify-start">
              <button
                onClick={() => {
                  audioEngine.playStarSparkle();
                  onContinue();
                }}
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e0958b] hover:bg-[#d97d74] text-[#240b12] text-xs font-medium uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-102 active:scale-95 cursor-pointer"
              >
                <span>Explore Memories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
