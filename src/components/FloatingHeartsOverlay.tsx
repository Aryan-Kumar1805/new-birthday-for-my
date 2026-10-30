import React, { useEffect, useState, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export interface FloatingHeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  driftX: number;
  driftY: number;
  scale: number;
  duration: number;
}

const HEART_COLORS = [
  '#f43f5e', // rose-500
  '#fb7185', // rose-400
  '#e11d48', // rose-600
  '#ec4899', // pink-500
  '#f472b6', // pink-400
  '#fda4af', // rose-300
  '#f59e0b', // amber-500 (golden heart)
  '#fbbf24', // amber-400
];

export const FloatingHeartsOverlay: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeartParticle[]>([]);
  const [ambientActive, setAmbientActive] = useState(true);

  const spawnHearts = useCallback((originX: number, originY: number, count = 4) => {
    const newHearts: FloatingHeartParticle[] = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - Math.PI / 2; // Upward spread
      const distance = 80 + Math.random() * 80;
      const driftX = Math.sin(angle) * (30 + Math.random() * 45) + (Math.random() - 0.5) * 30;
      const driftY = -Math.abs(Math.cos(angle) * distance) - 40;

      newHearts.push({
        id: now + Math.random() + i,
        x: originX,
        y: originY,
        size: 14 + Math.floor(Math.random() * 16),
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        rotation: (Math.random() - 0.5) * 45,
        driftX,
        driftY,
        scale: 0.8 + Math.random() * 0.5,
        duration: 1200 + Math.random() * 600,
      });
    }

    setHearts((prev) => [...prev.slice(-30), ...newHearts]);

    // Schedule cleanup
    setTimeout(() => {
      setHearts((current) => current.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1900);
  }, []);

  // Global pointer click/tap listener to trigger heart bursts
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      // Check if user clicked something that shouldn't be overwhelmed, or spawn softly
      spawnHearts(clientX, clientY, 3 + Math.floor(Math.random() * 3));
    };

    window.addEventListener('click', handlePointerDown);
    return () => window.removeEventListener('click', handlePointerDown);
  }, [spawnHearts]);

  // Ambient gentle floating hearts rising from bottom
  useEffect(() => {
    if (!ambientActive) return;

    const interval = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      const bottomY = window.innerHeight + 10;
      spawnHearts(randomX, bottomY, 1);
    }, 2200);

    return () => clearInterval(interval);
  }, [ambientActive, spawnHearts]);

  // Interactive quick button to trigger a heart shower
  const handleHeartShower = () => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.7;
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const spreadX = cx + (Math.random() - 0.5) * (window.innerWidth * 0.7);
        const spreadY = cy + (Math.random() - 0.5) * 200;
        spawnHearts(spreadX, spreadY, 2);
      }, i * 60);
    }
  };

  return (
    <>
      {/* Floating Hearts Container */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
        aria-hidden="true"
      >
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute will-change-transform"
            style={{
              left: `${h.x}px`,
              top: `${h.y}px`,
              animation: `floatingHeartAnim ${h.duration}ms cubic-bezier(0.2, 0.8, 0.3, 1) forwards`,
              ['--drift-x' as string]: `${h.driftX}px`,
              ['--drift-y' as string]: `${h.driftY}px`,
              ['--rot' as string]: `${h.rotation}deg`,
              ['--scale' as string]: `${h.scale}`,
            }}
          >
            <Heart
              style={{
                width: `${h.size}px`,
                height: `${h.size}px`,
                fill: h.color,
                color: h.color,
                filter: 'drop-shadow(0 2px 4px rgba(244, 63, 94, 0.3))',
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Heart Shower Quick Trigger Action */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={handleHeartShower}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-lg shadow-rose-200/50 border border-rose-200/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-xs font-semibold cursor-pointer"
          title="Send a shower of love hearts"
          aria-label="Shower of floating hearts"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 transition-transform group-hover:scale-125 animate-pulse" />
          <span className="hidden sm:inline">Heart Shower</span>
        </button>
      </div>
    </>
  );
};
