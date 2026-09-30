import React, { useEffect, useRef } from 'react';

export const HeroEmblem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const centerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate a gentle offset based on mouse position relative to center
      targetX = (deltaX / rect.width) * 35; // max ~17.5px movement
      targetY = (deltaY / rect.height) * 35;
    };

    const update = () => {
      // Smooth lerping
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      
      if (ring1Ref.current) {
        ring1Ref.current.style.transform = `translate(${currentX * 0.15}px, ${currentY * 0.15}px)`;
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `translate(${currentX * -0.3}px, ${currentY * -0.3}px)`;
      }
      if (centerRef.current) {
        centerRef.current.style.transform = `translate(${currentX * 0.7}px, ${currentY * 0.7}px)`;
      }
      
      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px] lg:max-w-[480px] xl:max-w-[500px] aspect-square flex items-center justify-center select-none mx-auto">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none scale-125 opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 216, 196, 0.08) 0%, rgba(255, 216, 196, 0) 70%)',
        }}
      />

      <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Cutout mask for horizontal stroke */}
            <mask id="mask-horiz">
              <rect width="100%" height="100%" fill="white" />
              <path d="M 300 240 Q 290 360 180 410" stroke="black" strokeWidth="32" strokeLinecap="round" fill="none" />
            </mask>
            
            {/* Cutout mask for left sweep stroke */}
            <mask id="mask-left">
              <rect width="100%" height="100%" fill="white" />
              <path d="M 290 290 Q 360 370 420 410" stroke="black" strokeWidth="32" strokeLinecap="round" fill="none" />
            </mask>
          </defs>

          {/* LAYER 1: Outer Decorative Ring (Astrolabe / Lattice) */}
          <g ref={ring1Ref}>
            <circle cx="300" cy="300" r="280" stroke="#FFD8C4" strokeWidth="1" strokeDasharray="4 12" opacity="0.4" />
            <circle cx="300" cy="300" r="260" stroke="#FFD8C4" strokeWidth="2" opacity="0.15" />
            
            {/* Compass Ticks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`large-${i}`}
                x1="300" y1="20" x2="300" y2="36"
                stroke="#FFD8C4" strokeWidth="2"
                opacity="0.5"
                transform={`rotate(${i * 30} 300 300)`}
              />
            ))}
            {Array.from({ length: 48 }).map((_, i) => (
              i % 4 !== 0 && (
                <line
                  key={`small-${i}`}
                  x1="300" y1="20" x2="300" y2="28"
                  stroke="#FFD8C4" strokeWidth="1"
                  opacity="0.2"
                  transform={`rotate(${i * 7.5} 300 300)`}
                />
              )
            ))}
          </g>

          {/* LAYER 2: Middle Base Ring */}
          <g ref={ring2Ref}>
            <circle cx="300" cy="300" r="230" fill="#4A190F" stroke="#FFD8C4" strokeWidth="4" opacity="0.95" />
            <circle cx="300" cy="300" r="215" stroke="#FFD8C4" strokeWidth="1" opacity="0.3" />
          </g>

          {/* LAYER 3: Centerpiece - "文" Character & Book */}
          <g ref={centerRef}>
            {/* Background Sun */}
            <circle cx="300" cy="280" r="120" fill="#8C2224" />
            
            {/* Geometric "文" Character (Culture/Language) */}
            <g>
              {/* Top Point */}
              <path d="M 300 170 L 300 215" stroke="#FFD8C4" strokeWidth="16" strokeLinecap="square" />
              
              {/* Horizontal Stroke (Masked by Left Sweep) */}
              <path d="M 190 240 L 410 240" stroke="#FFD8C4" strokeWidth="16" strokeLinecap="square" mask="url(#mask-horiz)" />
              
              {/* Left Sweep (Masked by Right Sweep) */}
              <path d="M 300 240 Q 290 360 180 410" stroke="#FFD8C4" strokeWidth="16" strokeLinecap="square" fill="none" mask="url(#mask-left)" />
              
              {/* Right Sweep (Foreground) */}
              <path d="M 290 290 Q 360 370 420 410" stroke="#FFD8C4" strokeWidth="16" strokeLinecap="square" fill="none" />
            </g>

            {/* Abstract Open Book / Pedestal */}
            <g transform="translate(0, 15)">
              <path d="M 180 430 Q 240 460 300 440 Q 360 460 420 430" stroke="#FFD8C4" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8"/>
              <path d="M 190 445 Q 240 470 300 455 Q 360 470 410 445" stroke="#FFD8C4" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
              <path d="M 200 460 Q 240 480 300 470 Q 360 480 400 460" stroke="#FFD8C4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
              <line x1="300" y1="440" x2="300" y2="480" stroke="#FFD8C4" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
            </g>
            
            {/* Floating Red Seal "易皮 YIPI" */}
            <g transform="translate(370, 310)">
              <rect x="0" y="0" width="48" height="48" rx="6" fill="#D95605" />
              <rect x="3" y="3" width="42" height="42" rx="4" stroke="#FFD8C4" strokeWidth="1" fill="none" opacity="0.5" />
              <text x="24" y="22" fontFamily="'Playfair Display', serif" fontSize="18" fontWeight="bold" fill="#FFD8C4" textAnchor="middle" dominantBaseline="central">易</text>
              <text x="24" y="38" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#FFD8C4" textAnchor="middle" dominantBaseline="central" opacity="0.8" letterSpacing="1">YIPI</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
