import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../birthdayConfig';

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="relative py-14 px-6 border-t border-[#122e39] bg-[#050f14] z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#7196a4]">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-serif text-base text-[#faeed1]">
            For {birthdayConfig.recipient.name}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Crafted with love for an unforgettable birthday</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onScrollToTop}
            type="button"
            className="flex items-center gap-2 text-[#e6c887] hover:text-[#faeed1] transition-colors cursor-pointer"
          >
            <span>Return to Stars</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
