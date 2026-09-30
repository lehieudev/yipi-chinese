const fs = require('fs');

let file = 'src/hooks/useFluidClouds.ts';
let content = fs.readFileSync(file, 'utf8');

// Optimize useFluidClouds
const newUseFluidClouds = `
import { useEffect, useRef } from 'react';

const LERP_TAU = 0.05;

export function useFluidClouds() {
  const cloud1Ref = useRef<HTMLDivElement | null>(null);
  const cloud2Ref = useRef<HTMLDivElement | null>(null);
  const cloud3Ref = useRef<HTMLDivElement | null>(null);
  const cloud4Ref = useRef<HTMLDivElement | null>(null);
  const cloud5Ref = useRef<HTMLDivElement | null>(null);
  const cloud6Ref = useRef<HTMLDivElement | null>(null);
  const cloud7Ref = useRef<HTMLDivElement | null>(null);
  const cloud8Ref = useRef<HTMLDivElement | null>(null);
  const cloud9Ref = useRef<HTMLDivElement | null>(null);
  const cloud10Ref = useRef<HTMLDivElement | null>(null);
  const cloud11Ref = useRef<HTMLDivElement | null>(null);
  const cloud12Ref = useRef<HTMLDivElement | null>(null);
  const cloud13Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let time = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = window.scrollY || 0;
    let animationFrameId: number;
    let isMobile = window.innerWidth <= 768;

    const handleResize = () => {
      isMobile = window.innerWidth <= 768;
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isMobile) return; // Disable pointer tracking on mobile for performance
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      targetPointerX = (e.clientX / width) * 2 - 1;
      targetPointerY = (e.clientY / height) * 2 - 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Intentionally empty to save performance on mobile
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const updateLoop = () => {
      // Pause animation if scrolled past the hero section (roughly 1.5x screen height)
      if (targetScrollY > (window.innerHeight || 800) * 1.5) {
        animationFrameId = requestAnimationFrame(updateLoop);
        return;
      }

      time += isMobile ? 0.005 : 0.01; // Slower time on mobile

      if (!isMobile) {
        currentPointerX += (targetPointerX - currentPointerX) * LERP_TAU;
        currentPointerY += (targetPointerY - currentPointerY) * LERP_TAU;
      }
      
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const scrollY = currentScrollY;

      // Only animate deep background if not mobile
      if (!isMobile) {
        if (cloud10Ref.current) {
          const x = Math.sin(time * 0.15) * 40 - scrollY * 0.1;
          const y = Math.cos(time * 0.1) * 30 + scrollY * 0.85;
          cloud10Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
        }
        if (cloud11Ref.current) {
          const x = Math.cos(time * 0.12) * 50 + scrollY * 0.15;
          const y = Math.sin(time * 0.18) * 40 + scrollY * 0.8;
          cloud11Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
        }
        if (cloud12Ref.current) {
          const x = Math.sin(time * 0.08) * 60 + scrollY * 0.05;
          const y = Math.cos(time * 0.12) * 20 + scrollY * 0.9;
          cloud12Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
        }
        if (cloud13Ref.current) {
          const x = Math.cos(time * 0.1) * 45 - scrollY * 0.08;
          const y = Math.sin(time * 0.08) * 25 + scrollY * 0.85;
          cloud13Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
        }
      }

      // MID-BACKGROUND
      if (cloud9Ref.current) {
        const x = Math.sin(time * 0.4) * 15 + (isMobile ? 0 : currentPointerX * 10) - scrollY * 0.2;
        const y = Math.cos(time * 0.5) * 10 + (isMobile ? 0 : currentPointerY * 10) + scrollY * 0.6;
        cloud9Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud6Ref.current) {
        const x = Math.cos(time * 0.5) * 20 + (isMobile ? 0 : currentPointerX * -15) + scrollY * 0.25;
        const y = Math.sin(time * 0.6) * 15 + (isMobile ? 0 : currentPointerY * -15) + scrollY * 0.5;
        cloud6Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud7Ref.current) {
        const x = Math.sin(time * 0.7) * 25 + (isMobile ? 0 : currentPointerX * -25) + scrollY * 0.3;
        const y = Math.cos(time * 0.5) * 12 + (isMobile ? 0 : currentPointerY * -25) + scrollY * 0.45;
        cloud7Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }

      // MID-FOREGROUND
      if (cloud4Ref.current) {
        const x = Math.sin(time * 0.3) * 10 + (isMobile ? 0 : currentPointerX * 15) - scrollY * 0.15;
        const y = Math.cos(time * 0.35) * 8 + (isMobile ? 0 : currentPointerY * 15) + scrollY * 0.25;
        cloud4Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud5Ref.current) {
        const x = Math.cos(time * 0.35) * 12 + (isMobile ? 0 : currentPointerX * 18) + scrollY * 0.15;
        const y = Math.sin(time * 0.4) * 7 + (isMobile ? 0 : currentPointerY * 18) + scrollY * 0.2;
        cloud5Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud2Ref.current) {
        const x = Math.cos(time * 0.6) * 20 + (isMobile ? 0 : currentPointerX * -10) - scrollY * 0.2;
        const y = Math.sin(time * 0.7) * 15 + (isMobile ? 0 : currentPointerY * -10) + scrollY * 0.1;
        cloud2Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud1Ref.current) {
        const x = Math.sin(time * 0.8) * 15 + (isMobile ? 0 : currentPointerX * -20) + scrollY * 0.25;
        const y = Math.cos(time * 0.5) * 10 + (isMobile ? 0 : currentPointerY * -20) + scrollY * 0.05;
        cloud1Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }

      // EXTREME FOREGROUND
      if (cloud3Ref.current) {
        const x = Math.sin(time * 0.4) * 20 + (isMobile ? 0 : currentPointerX * -20) - scrollY * 0.1;
        const y = Math.cos(time * 0.9) * 10 + (isMobile ? 0 : currentPointerY * -20) + scrollY * -0.25;
        cloud3Ref.current.style.transform = \`translate3d(calc(-50% + \${x.toFixed(2)}px), \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud8Ref.current) {
        const x = Math.cos(time * 0.8) * 18 + (isMobile ? 0 : currentPointerX * -20) - scrollY * 0.3;
        const y = Math.sin(time * 0.7) * 14 + (isMobile ? 0 : currentPointerY * -20) + scrollY * -0.3;
        cloud8Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    cloud1Ref, cloud2Ref, cloud3Ref, cloud4Ref, cloud5Ref, cloud6Ref,
    cloud7Ref, cloud8Ref, cloud9Ref, cloud10Ref, cloud11Ref, cloud12Ref, cloud13Ref,
  };
}
`;

fs.writeFileSync(file, newUseFluidClouds);
