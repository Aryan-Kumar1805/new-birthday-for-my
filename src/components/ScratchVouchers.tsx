import React, { useRef, useEffect, useState } from 'react';
import { Ticket, Sparkles, UtensilsCrossed, Compass, HeartHandshake, Film, Check, Gift } from 'lucide-react';
import { ScratchVoucher } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';

interface ScratchVouchersProps {
  vouchers: ScratchVoucher[];
  onRedeem: (voucherId: string) => void;
}

const VoucherCard: React.FC<{
  voucher: ScratchVoucher;
  onRedeem: (id: string) => void;
}> = ({ voucher, onRedeem }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw metallic silver/rose scratch-off coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#d1d5db');
    grad.addColorStop(0.3, '#f3f4f6');
    grad.addColorStop(0.7, '#cbd5e1');
    grad.addColorStop(1, '#94a3b8');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative scratch pattern text
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH WITH MOUSE OR FINGER ✨', width / 2, height / 2 - 10);
    ctx.font = '11px sans-serif';
    ctx.fillText('to reveal your birthday surprise', width / 2, height / 2 + 12);
  }, [isScratched]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    // Check scratched percentage approximately
    checkPercentage(ctx, canvas);
  };

  const checkPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      const totalPixels = imgData.data.length / 4;

      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) {
          transparentPixels += 4;
        }
      }

      if (transparentPixels / totalPixels > 0.45) {
        setIsScratched(true);
        fireCelebrationConfetti(2000);
      }
    } catch {
      // In case of security/tainted canvas, fallback
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-rose-500" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-pink-500" />;
      default:
        return <Film className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-200/80 relative overflow-hidden flex flex-col justify-between">
      {/* Voucher Header Strip */}
      <div className="flex items-center justify-between pb-3 border-b border-dashed border-stone-200 mb-4">
        <div className="flex items-center gap-2">
          {renderIcon(voucher.iconName)}
          <div>
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">
              {voucher.category}
            </span>
            <h4 className="font-serif font-bold text-stone-900 text-base">{voucher.title}</h4>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600">
          Birthday VIP
        </span>
      </div>

      {/* Reward Area & Scratch Overlay */}
      <div className="relative w-full h-36 bg-amber-50/50 rounded-2xl border border-amber-200/70 p-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed font-medium">
            "{voucher.reward}"
          </p>
          <span className="text-[10px] text-rose-600 font-semibold uppercase tracking-wider mt-2 block">
            No Expiration · Valid Anytime
          </span>
        </div>

        {/* Scratch Canvas Overlay */}
        {!isScratched && (
          <canvas
            ref={canvasRef}
            width={320}
            height={144}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={(e) => {
              if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={handleTouchMove}
            className="absolute inset-0 w-full h-full cursor-pointer z-20 touch-none rounded-2xl"
          />
        )}
      </div>

      {/* Bottom Action */}
      <div className="mt-4 pt-3 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          {isScratched ? 'Surprise Unlocked! ✨' : 'Scratch card above'}
        </span>

        {voucher.isRedeemed ? (
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
            <Check className="w-4 h-4" />
            <span>Redeemed</span>
          </div>
        ) : (
          <button
            onClick={() => onRedeem(voucher.id)}
            disabled={!isScratched}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
          >
            Redeem Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export const ScratchVouchers: React.FC<ScratchVouchersProps> = ({ vouchers, onRedeem }) => {
  return (
    <section id="vouchers" className="py-20 bg-stone-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-semibold tracking-wider uppercase mb-2">
            <Ticket className="w-4 h-4" />
            <span>Interactive Birthday Coupon Book</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
            Scratch-Off Birthday Vouchers
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Scratch off each card to reveal special promises and dates made just for you. Redeem them whenever you wish!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {vouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} onRedeem={onRedeem} />
          ))}
        </div>
      </div>
    </section>
  );
};
