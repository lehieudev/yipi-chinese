import React from 'react';

export const BrandLogo: React.FC = () => {
  return (
    <div className="fixed top-6 left-6 lg:top-8 lg:left-10 xl:left-16 z-[60] flex items-center gap-3 select-none pointer-events-none">
      <div 
        data-flip-id="brand-logo" 
        className="w-12 h-12 flex items-center justify-center shrink-0 will-change-transform"
      >
        <img 
          src="/logo.png" 
          alt="Yipi Logo" 
          className="w-full h-full object-contain drop-shadow-md"
        />
      </div>
      <span 
        data-flip-id="brand-title" 
        className="text-white font-oriental font-bold text-lg tracking-wide hidden sm:block drop-shadow-md will-change-transform"
      >
        YIPI
      </span>
    </div>
  );
};
