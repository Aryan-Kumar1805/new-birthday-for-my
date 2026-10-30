import React, { useState } from 'react';
import { Heart, Sparkles, ScrollText, CheckCircle2, BookmarkCheck, Shuffle, Plus } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

interface ReasonsJarProps {
  reasons: string[];
  girlfriendName: string;
  boyfriendName: string;
  onAddReason: (reason: string) => void;
}

export const ReasonsJar: React.FC<ReasonsJarProps> = ({
  reasons,
  girlfriendName,
  boyfriendName,
  onAddReason,
}) => {
  const [discoveredIndices, setDiscoveredIndices] = useState<number[]>([0]); // First one unlocked by default
  const [currentReasonIdx, setCurrentReasonIdx] = useState<number | null>(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [newReasonInput, setNewReasonInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const pullRandomReason = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      // Pick random index
      const randIdx = Math.floor(Math.random() * reasons.length);
      setCurrentReasonIdx(randIdx);
      if (!discoveredIndices.includes(randIdx)) {
        setDiscoveredIndices((prev) => [...prev, randIdx]);
        if (discoveredIndices.length + 1 === reasons.length) {
          fireCelebrationConfetti(3000);
        }
      }
    }, 450);
  };

  const handleAddNewReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReasonInput.trim()) {
      onAddReason(newReasonInput.trim());
      setNewReasonInput('');
      setShowAddModal(false);
    }
  };

  return (
    <section id="reasons" className="py-20 bg-stone-50 relative overflow-hidden">
      {/* Delicate background ambient lights */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-semibold tracking-wider uppercase mb-2">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>Little Moments That Mean Everything</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
            The Jar of Reasons
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Every folded note inside this jar holds one of the infinite reasons my heart chose you.
            Tap the jar or pull a note to unfold one!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: The Vintage Glass Jar */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={pullRandomReason}
              className={`relative cursor-pointer transition-transform duration-200 group ${
                isShaking ? 'animate-bounce scale-105' : 'hover:scale-102'
              }`}
              title="Click the jar to pull a love note"
            >
              {/* Glass Jar Cork Top */}
              <div className="w-28 h-6 bg-amber-800 rounded-t-lg mx-auto shadow-sm border-b border-amber-950 flex items-center justify-center">
                <span className="text-[10px] text-amber-200 uppercase tracking-widest font-mono">
                  LOVE JAR
                </span>
              </div>
              <div className="w-24 h-3 bg-amber-900/60 mx-auto" />

              {/* Jar Body with Gloss Reflection */}
              <div className="w-56 sm:w-64 h-72 sm:h-80 rounded-3xl bg-gradient-to-b from-white/70 via-rose-50/40 to-white/80 backdrop-blur-xs border-2 border-white/80 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Glass reflections */}
                <div className="absolute top-4 left-4 bottom-4 w-4 bg-white/40 rounded-full blur-[2px] pointer-events-none" />
                <div className="absolute top-8 right-6 w-2 h-16 bg-white/50 rounded-full blur-[1px] pointer-events-none" />

                {/* Floating Folded Origami Stars & Parchments inside Jar */}
                <div className="absolute inset-x-4 bottom-4 h-48 flex flex-wrap gap-2.5 items-end justify-center overflow-hidden opacity-90 pb-2">
                  {reasons.slice(0, 18).map((_, i) => (
                    <div
                      key={i}
                      className={`w-7 h-5 rounded-xs shadow-xs transform transition-transform ${
                        i % 3 === 0
                          ? 'bg-rose-200 rotate-12'
                          : i % 2 === 0
                          ? 'bg-amber-100 -rotate-6'
                          : 'bg-pink-100 rotate-45'
                      } flex items-center justify-center text-[9px] text-stone-500`}
                    >
                      ★
                    </div>
                  ))}
                </div>

                {/* Jar Kraft Label */}
                <div className="relative z-10 bg-amber-50/90 border border-amber-200 shadow-md rounded-lg p-3 text-center w-40">
                  <span className="font-serif italic text-xs text-stone-700 block">
                    Reasons I Love
                  </span>
                  <span className="font-script text-xl text-rose-700 block font-bold">
                    {girlfriendName}
                  </span>
                  <div className="text-[10px] text-amber-800/80 mt-1 font-mono uppercase tracking-wider">
                    {discoveredIndices.length} / {reasons.length} Read
                  </div>
                </div>
              </div>
            </div>

            {/* Jar Control Buttons */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={pullRandomReason}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-xs flex items-center gap-2 active:scale-95 transition-all"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Pull A Note</span>
              </button>

              <button
                onClick={() => setShowDrawer(true)}
                className="px-4 py-2.5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-full text-xs font-medium transition-colors"
              >
                <span>All Read ({discoveredIndices.length})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Unfolded Love Letter Display */}
          <div className="lg:col-span-7">
            {currentReasonIdx !== null && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-100/80 relative">
                {/* Decorative Parchment Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">
                      #{currentReasonIdx + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Reason #{currentReasonIdx + 1} of {reasons.length}
                    </span>
                  </div>
                  <span className="text-xs text-rose-500 flex items-center gap-1 font-script text-lg">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    Always & Forever
                  </span>
                </div>

                {/* The Unfolded Heartfelt Message */}
                <div className="min-h-[140px] flex items-center">
                  <p className="font-serif text-xl sm:text-2xl text-stone-800 leading-relaxed italic">
                    "{reasons[currentReasonIdx]}"
                  </p>
                </div>

                {/* Footer Signature */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    With endless love, <span className="font-semibold text-stone-700">{boyfriendName}</span>
                  </div>
                  <button
                    onClick={pullRandomReason}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
                  >
                    <span>Read Next Reason</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discovered Reasons Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Discovered Reasons ({discoveredIndices.length}/{reasons.length})
                </h3>
                <p className="text-xs text-stone-500">Every reason you have pulled so far.</p>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="text-stone-400 hover:text-stone-800 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {discoveredIndices.map((idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentReasonIdx(idx);
                    setShowDrawer(false);
                  }}
                  className="p-3.5 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-2xl cursor-pointer transition-colors flex items-start gap-3"
                >
                  <span className="text-xs font-bold text-rose-600 shrink-0 mt-0.5">#{idx + 1}</span>
                  <p className="text-sm font-serif italic text-stone-800">{reasons[idx]}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs text-rose-600 font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add another reason</span>
              </button>
              <button
                onClick={() => setShowDrawer(false)}
                className="px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Reason Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">Add A New Reason</h3>
            <p className="text-xs text-stone-500 mb-4">Write another sweet thing you adore about her.</p>
            <form onSubmit={handleAddNewReason} className="space-y-4">
              <textarea
                required
                rows={3}
                value={newReasonInput}
                onChange={(e) => setNewReasonInput(e.target.value)}
                placeholder="e.g. The little cute voice you make when you talk to plants..."
                className="w-full text-sm rounded-xl border border-stone-200 p-3 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-stone-600 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold"
                >
                  Drop into Jar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
