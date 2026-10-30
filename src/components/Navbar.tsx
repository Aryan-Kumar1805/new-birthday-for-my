import React from 'react';
import { Heart, Music, Volume2, VolumeX, Sparkles, Sliders } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

interface NavbarProps {
  girlfriendName: string;
  onOpenCustomizer: () => void;
  audioPlaying: boolean;
  setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  girlfriendName,
  onOpenCustomizer,
  audioPlaying,
  setAudioPlaying,
}) => {
  const handleToggleAudio = () => {
    const isNowPlaying = romanticAudio.toggle();
    setAudioPlaying(isNowPlaying);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-rose-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2 text-lg sm:text-xl font-serif font-bold tracking-tight text-rose-950 whitespace-nowrap shrink-0 group"
          aria-label="Home"
        >
          <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 transition-transform group-hover:scale-110">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </span>
          <span>For {girlfriendName || 'My Love'}</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600"
          aria-label="Main Navigation"
        >
          <a
            href="#cake"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Birthday Cake
          </a>
          <a
            href="#memories"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Our Memories
          </a>
          <a
            href="#reasons"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Reasons Jar
          </a>
          <a
            href="#letters"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Love Letters
          </a>
          <a
            href="#vouchers"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Surprise Vouchers
          </a>
          <a
            href="#quiz"
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Love Quiz
          </a>
        </nav>

        {/* Zone 3: Actions & Audio */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleAudio}
            aria-label={audioPlaying ? 'Mute romantic background melody' : 'Play romantic background melody'}
            title={audioPlaying ? 'Music playing' : 'Play music'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              audioPlaying
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span className="hidden sm:inline">Melody On</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-full shadow-sm shadow-rose-200 transition-all whitespace-nowrap shrink-0"
            aria-label="Personalize this website"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Personalize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
