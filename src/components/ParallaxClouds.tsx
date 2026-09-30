import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cloud } from './Cloud';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxCloudsProps {
  className?: string;
  interactive?: boolean;
}

/**
 * ParallaxClouds Component
 * 
 * Inspired by the multi-tier spatial depth of ThreeUI's KageLandingPage:
 * - Layer 0 (Deep Background): Massive volumetric fog & distant auspicious clouds (slow scrub: 0.08)
 * - Layer 1 (Midground): Structural Xiangyun clouds with Ruyi coils (medium scrub: 0.22)
 * - Layer 2 (Active Atmosphere): Floating cloud ribbons with continuous organic sway
 * - Layer 3 (Foreground Framing): Edge clouds that part swiftly as user scrolls down (fast scrub: 0.55)
 * 
 * Powered by GSAP ScrollTrigger with physics-based mouse sway damping.
 */
export const ParallaxClouds: React.FC<ParallaxCloudsProps> = ({
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Layer refs for GSAP targeting
  const deepBgRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const activeCloudsRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. Multi-Tier Scroll Parallax (Inspired by Kage's Chapter Depth)
      // -------------------------------------------------------------
      
      // Layer 0: Deep Atmospheric Mist & Distant Clouds (Slow scrub)
      if (deepBgRef.current) {
        gsap.to('.cloud-deep', {
          y: (i, el) => {
            const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
            return 180 * speed;
          },
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Layer 1: Midground Auspicious Clouds
      if (midgroundRef.current) {
        gsap.to('.cloud-mid', {
          y: (i, el) => {
            const speed = parseFloat(el.getAttribute('data-speed') || '0.25');
            return 320 * speed;
          },
          x: (i, el) => {
            const drift = parseFloat(el.getAttribute('data-drift') || '0');
            return drift * 80;
          },
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Layer 2: Organic Breathing Floating Animation for Midground Clouds
      gsap.to('.cloud-float-slow', {
        y: '+=14',
        x: '+=8',
        rotation: 0.8,
        duration: 4.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.6,
          from: 'random',
        },
      });

      gsap.to('.cloud-float-reverse', {
        y: '-=12',
        x: '-=10',
        rotation: -0.6,
        duration: 5.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.8,
          from: 'random',
        },
      });

      // Layer 3: Foreground Framing Clouds (Fast parting motion)
      if (foregroundRef.current) {
        // Left foreground cloud parts out to left and down
        gsap.to('.cloud-fg-left', {
          y: 260,
          x: -120,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        // Right foreground cloud parts out to right and down
        gsap.to('.cloud-fg-right', {
          y: 290,
          x: 140,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // -------------------------------------------------------------
      // 2. Mouse Sway with Inertial Damping (Inspired by Kage's Camera Sway)
      // -------------------------------------------------------------
      if (interactive && window.innerWidth >= 768) {
        // QuickTo setters for ultra-smooth 60fps tracking
        const xToMid = gsap.quickTo(midgroundRef.current, 'x', { duration: 0.8, ease: 'power2.out' });
        const yToMid = gsap.quickTo(midgroundRef.current, 'y', { duration: 0.8, ease: 'power2.out' });
        
        const xToDeep = gsap.quickTo(deepBgRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
        const yToDeep = gsap.quickTo(deepBgRef.current, 'y', { duration: 1.4, ease: 'power2.out' });

        const xToFg = gsap.quickTo(foregroundRef.current, 'x', { duration: 0.5, ease: 'power2.out' });
        const yToFg = gsap.quickTo(foregroundRef.current, 'y', { duration: 0.5, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
          const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

          // Opposite parallax shifts for depth
          xToDeep(normX * 12);
          yToDeep(normY * 8);

          xToMid(normX * -24);
          yToMid(normY * -16);

          xToFg(normX * -45);
          yToFg(normY * -28);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* =========================================================
          TIER 0: Deep Background Atmospheric Fog (Slow, blurred, vast)
          ========================================================= */}
      <div ref={deepBgRef} className="absolute inset-0 w-full h-full">
        {/* Top-left massive luminous fog */}
        <Cloud
          type={5}
          data-speed="0.08"
          className="cloud-deep absolute -top-36 -left-36 w-[650px] sm:w-[850px] opacity-15 blur-3xl"
        />
        {/* Top-right horizon drift */}
        <Cloud
          type={4}
          data-speed="0.12"
          className="cloud-deep absolute top-1/4 -right-48 w-[720px] sm:w-[920px] opacity-20 blur-[45px]"
        />
        {/* Deep bottom center basin mist */}
        <Cloud
          type={3}
          data-speed="0.06"
          className="cloud-deep absolute -bottom-48 left-1/4 w-[950px] sm:w-[1250px] opacity-20 blur-3xl"
        />
        {/* High zenith cloud bank */}
        <Cloud
          type={2}
          data-speed="0.10"
          className="cloud-deep absolute -top-24 left-1/3 w-[820px] sm:w-[1050px] opacity-15 blur-[55px]"
        />
      </div>

      {/* =========================================================
          TIER 1 & 2: Midground Auspicious Clouds & Floating Ribbons
          ========================================================= */}
      <div ref={midgroundRef} className="absolute inset-0 w-full h-full">
        {/* Upper Left Floating Ruyi Cloud */}
        <Cloud
          type={4}
          data-speed="0.18"
          data-drift="-0.15"
          className="cloud-mid cloud-float-slow absolute top-10 sm:top-14 left-8 sm:left-[18%] w-36 sm:w-48 opacity-80"
        />

        {/* Top Right Ascending Grand Cloud */}
        <Cloud
          type={1}
          data-speed="0.28"
          data-drift="0.2"
          className="cloud-mid cloud-float-reverse absolute -top-2 sm:top-4 right-2 sm:right-14 lg:right-24 w-52 sm:w-68 lg:w-84 opacity-90 drop-shadow-md"
        />

        {/* Mid-Left Flowing Ribbon Cloud */}
        <Cloud
          type={2}
          data-speed="0.22"
          data-drift="-0.1"
          className="cloud-mid cloud-float-slow absolute top-1/3 -left-10 sm:-left-4 lg:left-4 w-48 sm:w-64 lg:w-76 opacity-85"
        />

        {/* Lower Right Auspicious Swirl */}
        <Cloud
          type={5}
          data-speed="0.32"
          data-drift="0.25"
          className="cloud-mid cloud-float-reverse absolute bottom-20 sm:bottom-28 right-4 sm:right-16 lg:right-32 w-40 sm:w-56 opacity-80"
        />

        {/* Center Bottom Expansive Foundation Cloud */}
        <Cloud
          type={3}
          data-speed="0.16"
          className="cloud-mid cloud-float-slow absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] lg:w-[680px] opacity-85 drop-shadow-lg"
        />

        {/* Decorative Floating Accents */}
        <Cloud
          type={3}
          data-speed="0.20"
          className="cloud-mid cloud-float-reverse absolute -top-8 left-1/3 w-60 sm:w-80 opacity-60 hidden md:block"
        />
        <Cloud
          type={4}
          data-speed="0.25"
          className="cloud-mid cloud-float-slow absolute top-1/2 -right-12 w-56 sm:w-72 opacity-65 hidden md:block"
        />
        <Cloud
          type={5}
          data-speed="0.15"
          className="cloud-mid cloud-float-reverse absolute top-1/4 left-1/4 w-44 sm:w-56 opacity-55 hidden lg:block"
        />
      </div>

      {/* =========================================================
          TIER 3: Foreground Framing Elements (Part swiftly on scroll)
          ========================================================= */}
      <div ref={foregroundRef} className="absolute inset-0 w-full h-full">
        {/* Bottom Left Foreground Silhouette Cloud */}
        <Cloud
          type={2}
          className="cloud-fg-left absolute bottom-0 sm:bottom-6 -left-16 sm:-left-10 w-64 sm:w-88 lg:w-[440px] opacity-95 drop-shadow-2xl"
        />
      </div>
    </div>
  );
};
