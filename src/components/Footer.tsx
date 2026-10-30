import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  girlfriendName: string;
  boyfriendName: string;
}

export const Footer: React.FC<FooterProps> = ({ girlfriendName, boyfriendName }) => {
  const [copied, setCopied] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-serif font-bold text-lg mb-1">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Forever & Always, {girlfriendName}</span>
          </div>
          <p className="text-xs text-stone-400">
            Handcrafted with love by {boyfriendName}. May every day ahead be as bright as your smile.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-xs">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Happy Sweet 16th Birthday Shrishti! ❤️🎂 I made a special website just for you: ${
                typeof window !== 'undefined' ? window.location.href : ''
              }`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-colors font-medium shadow-xs"
          >
            <span>Share to WhatsApp</span>
          </a>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-full transition-colors"
          >
            <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Link'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-full transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
