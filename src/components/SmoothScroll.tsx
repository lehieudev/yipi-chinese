import React, { useEffect, useRef } from 'react';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentY = 0;
    let targetY = 0;
    let reqId: number;

    const updateHeight = () => {
      document.body.style.height = `${container.getBoundingClientRect().height}px`;
    };

    const updateScroll = () => {
      targetY = window.scrollY;
      // Lerp factor for buttery smooth easing
      currentY += (targetY - currentY) * 0.08;
      
      // Apply negative translate to simulate scrolling down
      container.style.transform = `translate3d(0, -${currentY.toFixed(3)}px, 0)`;
      
      reqId = requestAnimationFrame(updateScroll);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    
    resizeObserver.observe(container);
    updateHeight();
    updateScroll();

    // Prevent browser from restoring scroll position automatically and messing up the initial height calculation
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(reqId);
      document.body.style.height = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#C45827]">
      <div ref={containerRef} className="w-full relative pointer-events-auto will-change-transform">
        {children}
      </div>
    </div>
  );
};
