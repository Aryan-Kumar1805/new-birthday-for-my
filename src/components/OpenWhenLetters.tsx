import React, { useState } from 'react';
import { Mail, MailOpen, Heart, X, Sparkles, Feather } from 'lucide-react';
import { LoveLetter } from '../types';

interface OpenWhenLettersProps {
  letters: LoveLetter[];
  girlfriendName: string;
}

export const OpenWhenLetters: React.FC<OpenWhenLettersProps> = ({ letters, girlfriendName }) => {
  const [openedLetter, setOpenedLetter] = useState<LoveLetter | null>(null);
  const [openedHistory, setOpenedHistory] = useState<string[]>([]);

  const handleOpenLetter = (letter: LoveLetter) => {
    setOpenedLetter(letter);
    if (!openedHistory.includes(letter.id)) {
      setOpenedHistory((prev) => [...prev, letter.id]);
    }
  };

  return (
    <section id="letters" className="py-20 bg-stone-100/70 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-semibold tracking-wider uppercase mb-2">
            <Feather className="w-4 h-4" />
            <span>Time-Sealed Messages for Your Heart</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
            "Open When..." Letters
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Whenever life gets noisy, overwhelming, or when you just need a warm reminder of home,
            break the wax seal on any of these letters.
          </p>
        </div>

        {/* Envelope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {letters.map((letter) => {
            const hasBeenOpened = openedHistory.includes(letter.id);

            return (
              <div
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className="group cursor-pointer bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-stone-200/80 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Vintage Envelope Flap Visual */}
                <div className="w-full h-32 bg-stone-50 rounded-xl border border-stone-200/60 relative overflow-hidden flex flex-col items-center justify-center p-4 group-hover:bg-rose-50/40 transition-colors">
                  {/* Flap crease lines */}
                  <div className="absolute top-0 left-0 right-0 h-16 border-b border-stone-200/80 bg-gradient-to-b from-stone-100/60 to-transparent pointer-events-none" />

                  {/* Wax Seal Stamp in Center */}
                  <div
                    className="w-12 h-12 rounded-full shadow-md flex items-center justify-center text-white relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: letter.sealColor }}
                  >
                    <Heart className="w-5 h-5 fill-white text-white drop-shadow-xs" />
                  </div>

                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest mt-2 z-10">
                    {hasBeenOpened ? 'Unsealed' : 'Wax Sealed'}
                  </span>
                </div>

                {/* Envelope Front Typography */}
                <div className="mt-5">
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block mb-1">
                    Open When...
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-rose-700 transition-colors line-clamp-1">
                    {letter.openWhen}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {letter.subtitle}
                  </p>
                </div>

                {/* Bottom Card Action */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-sans">
                    {letter.datePenciled}
                  </span>
                  <span className="text-rose-600 font-semibold group-hover:underline flex items-center gap-1">
                    {hasBeenOpened ? 'Read Again' : 'Break Seal & Read'} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Love Letter Reader Modal */}
      {openedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fffdf9] rounded-3xl max-w-2xl w-full p-8 sm:p-12 shadow-2xl border border-amber-200/60 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setOpenedLetter(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
              aria-label="Close letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letterhead */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: openedLetter.sealColor }}
                >
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono block">
                    {openedLetter.openWhen}
                  </span>
                  <span className="text-sm font-serif italic text-stone-600">
                    {openedLetter.subtitle}
                  </span>
                </div>
              </div>
              <span className="text-xs text-stone-400 font-mono hidden sm:inline">
                {openedLetter.datePenciled}
              </span>
            </div>

            {/* Salutation */}
            <h4 className="text-2xl sm:text-3xl font-script text-rose-950 mb-6 font-bold">
              {openedLetter.salutation}
            </h4>

            {/* Letter Body */}
            <div className="prose prose-stone max-w-none text-stone-800 font-serif text-base sm:text-lg leading-relaxed space-y-4 mb-10">
              {openedLetter.body.map((paragraph, idx) => (
                <p key={idx} className="indent-4 sm:indent-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="pt-6 border-t border-stone-200 flex flex-col items-end">
              <div className="text-right whitespace-pre-line font-script text-2xl sm:text-3xl text-rose-900">
                {openedLetter.signature}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
