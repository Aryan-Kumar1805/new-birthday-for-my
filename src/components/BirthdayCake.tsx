import React, { useState } from 'react';
import { Sparkles, Wind, RotateCcw, Heart, Gift, Stars } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audioPlayer';

interface BirthdayCakeProps {
  config: BirthdayConfig;
  onUpdateWish: (newWish: string) => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ config, onUpdateWish }) => {
  // 5 candles on top of the cake
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [showWishModal, setShowWishModal] = useState(false);
  const [girlfriendSecretWish, setGirlfriendSecretWish] = useState('');
  const [wishSealed, setWishSealed] = useState(false);

  const allBlownOut = candlesLit.every((lit) => !lit);

  const handleBlowCandle = (index: number) => {
    if (!candlesLit[index]) return;
    const next = [...candlesLit];
    next[index] = false;
    setCandlesLit(next);

    // If this blew out the last candle
    if (next.every((l) => !l)) {
      triggerCelebration();
    }
  };

  const handleBlowAll = () => {
    setCandlesLit([false, false, false, false, false]);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    romanticAudio.playCelebrationChime();
    fireCelebrationConfetti(1800);
    setTimeout(() => {
      setShowWishModal(true);
    }, 150);
  };

  const handleRelight = () => {
    setCandlesLit([true, true, true, true, true]);
    setShowWishModal(false);
    setWishSealed(false);
  };

  const handleSealSecretWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (girlfriendSecretWish.trim()) {
      setWishSealed(true);
      fireCelebrationConfetti(2500);
    }
  };

  return (
    <section id="cake" className="py-16 bg-gradient-to-b from-stone-50 via-rose-50/30 to-stone-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2">
            An Interactive Birthday Tradition
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
            Blow Out Your Birthday Candles
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
            Close your eyes, make the deepest wish in your heart, and tap the candles or click blow below!
          </p>
        </div>

        {/* The Interactive Cake Illustration Container */}
        <div className="relative w-full max-w-md mx-auto py-12 px-6 flex flex-col items-center select-none">
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-5 sm:gap-7 z-20 -mb-2">
            {candlesLit.map((isLit, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleBlowCandle(idx)}
                aria-label={isLit ? `Blow out candle ${idx + 1}` : `Candle ${idx + 1} is blown out`}
                className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 focus:outline-hidden"
              >
                {/* Flame or Smoke */}
                <div className="h-9 flex items-end justify-center relative">
                  {isLit ? (
                    <div className="candle-flame w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-lg shadow-amber-300" />
                  ) : (
                    <div className="smoke-particle w-1.5 h-3 bg-stone-400 rounded-full blur-[1px]" />
                  )}
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-2.5 bg-stone-700 rounded-t-xs" />

                {/* Candle Body */}
                <div
                  className={`w-3.5 h-14 rounded-t-md shadow-xs transition-colors ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300'
                      : 'bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300'
                  }`}
                >
                  {/* Subtle spiral stripe */}
                  <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,white_3px,white_5px)] rounded-t-md" />
                </div>
              </button>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-48 sm:w-56 h-20 bg-gradient-to-b from-rose-50 via-rose-100 to-rose-200 rounded-t-3xl relative shadow-md flex items-center justify-center border-t border-white/60">
            {/* Strawberries / Berries Decor */}
            <div className="absolute -top-3 w-full flex justify-around px-4">
              <span className="text-xl">🍓</span>
              <span className="text-sm">🌸</span>
              <span className="text-xl">🍓</span>
              <span className="text-sm">🌸</span>
              <span className="text-xl">🍓</span>
            </div>
            {/* Cream drip effect */}
            <div className="w-full flex justify-between px-2 text-rose-200 text-xs tracking-widest font-serif opacity-80">
              {config.girlfriendName}
            </div>
          </div>

          {/* Cake Bottom Tier */}
          <div className="w-72 sm:w-80 h-28 bg-gradient-to-b from-rose-100 via-rose-200 to-rose-300 rounded-t-3xl relative shadow-lg border-t-2 border-white/70 overflow-hidden">
            {/* Decorative frosting piping */}
            <div className="absolute top-1 left-0 right-0 h-3 flex justify-between px-3 text-white/90 text-sm">
              <span>⚪</span>
              <span>⚪</span>
              <span>⚪</span>
              <span>⚪</span>
              <span>⚪</span>
              <span>⚪</span>
              <span>⚪</span>
            </div>

            {/* Cake Center Message */}
            <div className="w-full h-full flex flex-col items-center justify-center pt-2">
              <span className="font-serif italic text-rose-900 font-semibold text-lg sm:text-xl">
                {config.ageMilestone === 16 ? 'Sweet 16' : `Turning ${config.ageMilestone}`}
              </span>
              <span className="font-script text-xl sm:text-2xl text-rose-700">Forever Loved</span>
            </div>
          </div>

          {/* Ceramic Cake Pedestal Stand */}
          <div className="w-80 sm:w-96 h-5 bg-gradient-to-r from-stone-200 via-white to-stone-200 rounded-full shadow-md border border-stone-300/80 -mt-0.5" />
          <div className="w-24 h-8 bg-gradient-to-b from-stone-200 to-stone-300 rounded-b-md shadow-xs" />
          <div className="w-40 h-3 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 rounded-full shadow-md" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {!allBlownOut ? (
            <button
              onClick={handleBlowAll}
              className="px-6 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-full shadow-md shadow-rose-200 transition-all flex items-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Out All Candles</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowWishModal(true)}
                className="px-6 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-full shadow-md shadow-amber-200 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Birthday Wish & Note</span>
              </button>
              <button
                onClick={handleRelight}
                className="px-4 py-3 text-sm font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-full shadow-xs transition-all flex items-center gap-1.5"
                title="Relight the candles"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Relight</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Secret Birthday Wish Modal */}
      {showWishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowWishModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg w-8 h-8 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 transition-colors"
              aria-label="Close wish dialog"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Gift className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Your Birthday Wish Has Been Cast!
              </h3>
              <p className="text-xs text-rose-600 font-semibold tracking-wider uppercase mt-1">
                May the universe grant you every desire
              </p>
            </div>

            {/* Boyfriend's written wish for her */}
            <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-5 mb-6 text-stone-700">
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>My Wish For You:</span>
              </p>
              <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                "{config.customWish}"
              </p>
              <p className="text-right text-xs text-rose-600 font-script text-xl mt-2">
                — {config.boyfriendName}
              </p>
            </div>

            {/* Girl's secret wish input */}
            {!wishSealed ? (
              <form onSubmit={handleSealSecretWish} className="space-y-3">
                <label
                  htmlFor="secret-wish"
                  className="block text-xs font-semibold text-stone-700 uppercase tracking-wider text-left"
                >
                  Lock In Your Personal Secret Wish (Only for you):
                </label>
                <textarea
                  id="secret-wish"
                  rows={2}
                  value={girlfriendSecretWish}
                  onChange={(e) => setGirlfriendSecretWish(e.target.value)}
                  placeholder="Whisper your deepest wish for the year ahead..."
                  className="w-full text-sm rounded-xl border border-stone-200 p-3 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400 bg-stone-50 resize-none"
                />
                <button
                  type="submit"
                  disabled={!girlfriendSecretWish.trim()}
                  className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-medium text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Stars className="w-4 h-4" />
                  <span>Seal Wish Into The Universe ✨</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 text-sm">
                <span className="text-lg block mb-1">🌟</span>
                <strong>Your secret wish is sealed safely among the stars!</strong>
                <p className="text-xs text-emerald-600 mt-1">
                  Keep smiling, my love—this is going to be your best year yet.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Candles Blown Out: 5/5</span>
              <button
                type="button"
                onClick={handleRelight}
                className="text-rose-600 hover:underline font-medium"
              >
                Relight candles & play again
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
