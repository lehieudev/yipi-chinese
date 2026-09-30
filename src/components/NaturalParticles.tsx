import React, { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  hue: number; // 35-50 (golden amber to warm vermilion flame)
  coreSize: number;
  glowRadius: number;
  depth: number; // 0.5 (far) to 1.5 (near)
}

export const NaturalParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracker for gentle displacement
    const mouse = {
      x: -2000,
      y: -2000,
      radius: 160,
      strength: 2.2
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize, { passive: true });

    // Determine particle count based on screen size (rich & dense enough to be visibly stunning)
    const isMobile = window.innerWidth < 768;
    const emberCount = isMobile ? 45 : 90;

    const createEmber = (initialY?: number): Ember => {
      const depth = 0.5 + Math.random(); // 0.5 (far) to 1.5 (close)
      const size = (1.8 + Math.random() * 2.8) * depth;
      const baseAlpha = 0.45 + Math.random() * 0.45;

      // Hues: 25 (warm ember red-orange) to 48 (luminous lantern gold)
      const hue = 25 + Math.random() * 25;

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.4 + Math.random() * 0.7) * depth, // upward rising float
        size,
        baseAlpha,
        alpha: baseAlpha,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.035, // firefly breathing twinkle
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayAmp: (0.6 + Math.random() * 1.2) * depth,
        hue,
        coreSize: size * 0.5,
        glowRadius: size * (3.5 + Math.random() * 2.5),
        depth
      };
    };

    const embers: Ember[] = [];
    for (let i = 0; i < emberCount; i++) {
      embers.push(createEmber());
    }

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Render glowing embers & fireflies
      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];

        // Upward floating motion with natural wind sway
        p.swayPhase += p.swaySpeed;
        const sway = Math.sin(p.swayPhase) * p.swayAmp;
        p.x += p.vx + sway;
        p.y += p.vy;

        // Firefly breathing luminescence (lập lòe tự nhiên)
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase);
        // Alpha oscillates between 0.3 and 1.0 of baseAlpha
        p.alpha = p.baseAlpha * (0.65 + 0.35 * pulse);

        // Interaction with mouse: gently drift away like embers stirred by breeze
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const factor = (1 - dist / mouse.radius) * p.depth * mouse.strength;
          p.x += (dx / dist) * factor;
          p.y += (dy / dist) * factor * 0.8;
        }

        // Wrap around screen boundaries
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // Skip drawing if invisible
        if (p.alpha <= 0.02) continue;

        // DRAW EMBER GLOW (Warm golden flame & lantern glow)
        const rad = p.glowRadius;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);

        // Outer soft glow (warm orange/amber)
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${p.alpha * 0.95})`);
        grad.addColorStop(0.25, `hsla(${p.hue - 5}, 100%, 65%, ${p.alpha * 0.65})`);
        grad.addColorStop(0.65, `hsla(${p.hue - 10}, 95%, 55%, ${p.alpha * 0.25})`);
        grad.addColorStop(1, `hsla(${p.hue - 15}, 90%, 50%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        // DRAW HOT WHITE-GOLD CORE (Tâm hạt đom đóm sáng rực)
        ctx.fillStyle = `rgba(255, 255, 240, ${Math.min(1, p.alpha * 1.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.coreSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when page is not visible
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[40] w-full h-full"
      aria-hidden="true"
    />
  );
};
