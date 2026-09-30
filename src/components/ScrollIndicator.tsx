import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);
  const reqRef = useRef<number>();

  useEffect(() => {
    let targetOpacity = 1;
    let currentOpacity = 1;

    const updateTarget = () => {
      // Fade out over the first 200px of scrolling
      targetOpacity = Math.max(0, 1 - window.scrollY / 200);
    };

    const loop = () => {
      currentOpacity += (targetOpacity - currentOpacity) * 0.1;
      
      // Prevent microscopic updates
      if (Math.abs(targetOpacity - currentOpacity) < 0.001) {
        currentOpacity = targetOpacity;
      }

      setOpacity(currentOpacity);
      reqRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    loop();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  return (
    <div 
      className="absolute bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none will-change-opacity"
      style={{ opacity, display: opacity === 0 ? 'none' : 'flex' }}
    >
      <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm bg-white/5">
        <div className="w-1 h-2 bg-[#FFD8C4] rounded-full animate-scroll-wheel" />
      </div>
      <ChevronDown className="w-4 h-4 text-[#FFD8C4]/70" />
    </div>
  );
}
