import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Cake, Calendar, Clock, ChevronDown } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { calculateTimeTogether, calculateBirthdayCountdown } from '../utils/timeCalculators';

interface HeroSectionProps {
  config: BirthdayConfig;
  onScrollToCake: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onScrollToCake }) => {
  const [timeTogether, setTimeTogether] = useState(() =>
    calculateTimeTogether(config.anniversaryDate)
  );
  const [bdayCountdown, setBdayCountdown] = useState(() =>
    calculateBirthdayCountdown(config.birthdayDate, config.ageMilestone)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTogether(calculateTimeTogether(config.anniversaryDate));
      setBdayCountdown(calculateBirthdayCountdown(config.birthdayDate, config.ageMilestone));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.anniversaryDate, config.birthdayDate, config.ageMilestone]);

  const formatDisplayDate = (dStr: string) => {
    const d = new Date(dStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dStr;
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-200/40 via-amber-100/30 to-pink-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-pink-100/50 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle romance kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Dedicated with all my love · {formatDisplayDate(config.birthdayDate)}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance mb-6">
            Happy Birthday to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 font-script text-5xl sm:text-6xl lg:text-7xl font-normal">
              {config.girlfriendName}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
            {config.heroSubtitle}
          </p>

          {/* Milestone & Birthday Status */}
          <div className="mb-10 inline-block bg-white/90 backdrop-blur-sm border border-rose-100 rounded-2xl p-4 sm:p-6 shadow-sm shadow-rose-100">
            {bdayCountdown.isToday ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-rose-900 font-medium">
                <span className="text-2xl">🎉</span>
                <span className="text-base sm:text-lg font-serif">
                  Today is the official day! Celebrating your{' '}
                  <strong className="text-rose-600 font-bold">{bdayCountdown.turningAge}th</strong>{' '}
                  glorious trip around the sun!
                </span>
                <span className="text-2xl">✨</span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2">
                  Countdown to Your Special Day ({bdayCountdown.turningAge === 16 ? 'Sweet 16th Birthday' : `${bdayCountdown.turningAge}th Birthday`})
                </p>
                <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
                  <div className="p-2 sm:p-3 bg-rose-50/70 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                      {bdayCountdown.days}
                    </span>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider">Days</span>
                  </div>
                  <div className="p-2 sm:p-3 bg-rose-50/70 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                      {bdayCountdown.hours}
                    </span>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider">Hours</span>
                  </div>
                  <div className="p-2 sm:p-3 bg-rose-50/70 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                      {bdayCountdown.minutes}
                    </span>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider">Mins</span>
                  </div>
                  <div className="p-2 sm:p-3 bg-rose-50/70 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                      {bdayCountdown.seconds}
                    </span>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider">Secs</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToCake}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-98 rounded-full shadow-md shadow-rose-300/50 transition-all flex items-center gap-2"
            >
              <Cake className="w-4 h-4" />
              <span>Make a Birthday Wish</span>
            </button>
            <a
              href="#memories"
              className="px-6 py-3.5 text-sm sm:text-base font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-full shadow-xs transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Explore Our Story</span>
            </a>
          </div>
        </div>

        {/* Full-width "Time in Love" Counter Banner */}
        <div className="mt-16 bg-gradient-to-r from-rose-900 via-pink-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-950/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Our Love Journey Since {formatDisplayDate(config.anniversaryDate)}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white">
                Every Second With You Is A Gift
              </h2>
              <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
                {timeTogether.totalDays.toLocaleString()} days of shared laughter, warm coffee, and unforgettable memories.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 sm:px-5 sm:py-3 text-center min-w-0 flex-1">
                <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-rose-200">
                  {timeTogether.years}
                </div>
                <div className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider">Years</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 sm:px-5 sm:py-3 text-center min-w-0 flex-1">
                <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-rose-200">
                  {timeTogether.months}
                </div>
                <div className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider">Months</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 sm:px-5 sm:py-3 text-center min-w-0 flex-1">
                <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-rose-200">
                  {timeTogether.days}
                </div>
                <div className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 sm:px-5 sm:py-3 text-center min-w-0 flex-1">
                <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-amber-300">
                  {timeTogether.seconds}
                </div>
                <div className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider">Secs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
