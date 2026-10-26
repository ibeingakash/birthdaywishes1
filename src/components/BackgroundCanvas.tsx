import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  speed: number;
  twinkleSpeed: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create stars
    const starCount = Math.min(120, Math.floor((width * height) / 10000));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.7;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.4,
        alpha: baseAlpha,
        baseAlpha,
        speed: 0.05 + Math.random() * 0.1,
        twinkleSpeed: 0.01 + Math.random() * 0.03
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX / width - 0.5) * 15;
      const parallaxY = (mouseY / height - 0.5) * 15;

      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric midnight-teal gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + parallaxX * 2,
        height * 0.35 + parallaxY * 2,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#0c262f'); // deep luminous teal center
      bgGrad.addColorStop(0.4, '#091c24'); // midnight teal
      bgGrad.addColorStop(0.75, '#07151c'); // dark muted indigo
      bgGrad.addColorStop(1, '#050f14'); // deep space edge
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial nebula haze
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.75 - parallaxX * 3,
        height * 0.65 - parallaxY * 3,
        20,
        width * 0.75,
        height * 0.65,
        width * 0.45
      );
      nebulaGrad.addColorStop(0, 'rgba(19, 58, 71, 0.25)');
      nebulaGrad.addColorStop(0.6, 'rgba(14, 38, 54, 0.12)');
      nebulaGrad.addColorStop(1, 'rgba(6, 18, 23, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Twinkle oscillation
        star.alpha = star.baseAlpha + Math.sin(t * 1.5 + i) * 0.25;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));

        const drawX = star.x + parallaxX * (star.radius * 0.8);
        const drawY = star.y + parallaxY * (star.radius * 0.8);

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 245, 255, ${star.alpha})`;
        ctx.shadowColor = 'rgba(230, 200, 135, 0.6)';
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
