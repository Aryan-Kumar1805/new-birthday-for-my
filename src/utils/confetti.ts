interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  opacity: number;
  isHeart: boolean;
}

export function fireCelebrationConfetti(durationMs = 1800) {
  // Guard for SSR
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  // Use logical width/height to avoid software rasterizer lag
  canvas.width = Math.min(window.innerWidth, 1440);
  canvas.height = Math.min(window.innerHeight, 900);

  const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#a855f7', '#6366f1', '#10b981'];
  const particles: Particle[] = [];

  const count = 45;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI / 4) + (Math.random() * Math.PI) / 2; // Fan upwards
    const speed = 5 + Math.random() * 8;
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: canvas.height / 2 - 20,
      vx: Math.cos(angle) * (Math.random() > 0.5 ? speed : -speed),
      vy: -Math.abs(Math.sin(angle) * speed) - 3,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 8,
      opacity: 1,
      isHeart: i % 2 === 0,
    });
  }

  const startTime = performance.now();
  let animId: number;

  function drawHeart(c: CanvasRenderingContext2D, size: number) {
    c.beginPath();
    const topCurve = size * 0.3;
    c.moveTo(0, topCurve);
    c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurve);
    c.bezierCurveTo(-size / 2, (size + topCurve) / 2, 0, size, 0, size * 1.2);
    c.bezierCurveTo(0, size, size / 2, (size + topCurve) / 2, size / 2, topCurve);
    c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurve);
    c.closePath();
    c.fill();
  }

  function frame(now: number) {
    if (!ctx) return;
    const elapsed = now - startTime;

    if (elapsed >= durationMs) {
      cancelAnimationFrame(animId);
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98;
      p.rotation += p.vRot;

      if (elapsed > durationMs - 500) {
        p.opacity = Math.max(0, 1 - (elapsed - (durationMs - 500)) / 500);
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isHeart) {
        drawHeart(ctx, p.size);
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      }
      ctx.restore();
    }

    animId = requestAnimationFrame(frame);
  }

  animId = requestAnimationFrame(frame);
}
