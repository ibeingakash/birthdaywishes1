/**
 * Lightweight, high-performance canvas celebration particle effect.
 * Produces elegant champagne gold, starlight ivory, and warm bronze flakes
 * with subtle physics and rotational flutter.
 */

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'star' | 'circle' | 'strip';
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  opacity: number;
  decay: number;
}

let activeConfettiCancel: (() => void) | null = null;

export function launchCelebrationConfetti(canvas: HTMLCanvasElement, durationMs: number = 4000) {
  if (activeConfettiCancel) {
    activeConfettiCancel();
    activeConfettiCancel = null;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const particles: Particle[] = [];
  const colors = [
    '#f5e0a9', // champagne gold
    '#e2b85a', // warm gold
    '#faeed1', // starlight cream
    '#7cd3cf', // teal stardust
    '#f7c59f', // peach warmth
    '#ffffff'  // pure light
  ];

  const count = 140;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI / 6) + (Math.random() * (2 * Math.PI / 3)); // upward spread
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: rect.width / 2 + (Math.random() * 80 - 40),
      y: rect.height * 0.75,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.6 ? 'star' : Math.random() > 0.3 ? 'strip' : 'circle',
      vx: Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1) * speed,
      vy: -Math.sin(angle) * speed - 2,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.1,
      opacity: 1,
      decay: 0.003 + Math.random() * 0.005
    });
  }

  let animationFrameId: number;
  const startTime = performance.now();

  function render(time: number) {
    if (!ctx) return;
    ctx.clearRect(0, 0, rect.width, rect.height);

    const elapsed = time - startTime;
    let aliveCount = 0;

    for (const p of particles) {
      if (p.opacity <= 0) continue;
      aliveCount++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.vx *= 0.985; // drag
      p.rotation += p.vRot;
      p.opacity -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'strip') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        // 4-pointed gentle star
        ctx.beginPath();
        const r = p.size;
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.quadraticCurveTo(0, 0, 0, r);
        ctx.quadraticCurveTo(0, 0, -r, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r);
        ctx.fill();
      }

      ctx.restore();
    }

    if (aliveCount > 0 && elapsed < durationMs) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, rect.width, rect.height);
      activeConfettiCancel = null;
    }
  }

  animationFrameId = requestAnimationFrame(render);
  const cancel = () => {
    cancelAnimationFrame(animationFrameId);
    if (ctx) ctx.clearRect(0, 0, rect.width, rect.height);
  };
  activeConfettiCancel = cancel;
  return cancel;
}
