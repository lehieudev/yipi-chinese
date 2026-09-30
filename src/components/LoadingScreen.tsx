import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import HanziWriter from 'hanzi-writer';

export const LoadingScreen: React.FC<{ onComplete: () => void, onReadyToReveal?: () => void }> = ({ onComplete, onReadyToReveal }) => {
  const [isVisible, setIsVisible] = useState(true);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let writer: any;
    if (characterRef.current) {
      characterRef.current.innerHTML = '';
      writer = HanziWriter.create(characterRef.current, '易', {
        width: 140,
        height: 140,
        padding: 10,
        strokeColor: '#C45827',
        radicalColor: '#C45827',
        outlineColor: 'rgba(255, 216, 196, 0.05)',
        strokeAnimationSpeed: 1.5,
        delayBetweenStrokes: 200,
        showOutline: true,
      });
      writer.animateCharacter();
    }

    const timer = setTimeout(() => {
      if (onReadyToReveal) onReadyToReveal();
      setIsVisible(false);
      setTimeout(onComplete, 1200); 
    }, 2800); 

    return () => clearTimeout(timer);
  }, [onComplete, onReadyToReveal]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(15px)",
            transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } 
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A0B06] pointer-events-none overflow-hidden"
        >
          {/* Abstract background brush strokes */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-[0.02] z-0 pointer-events-none">
             <motion.path
                d="M -10,50 Q 50,30 110,60"
                fill="transparent"
                stroke="#C45827"
                strokeWidth="20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
             />
             <motion.path
                d="M 110,40 Q 50,70 -10,30"
                fill="transparent"
                stroke="#FFD8C4"
                strokeWidth="15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
             />
          </svg>

          {/* Zen Circle SVG */}
          <svg viewBox="0 0 100 100" className="absolute w-[320px] h-[320px] opacity-10 drop-shadow-2xl z-0">
            <motion.path
              d="M 50 10 C 25 10 10 30 10 50 C 10 75 25 90 50 90 C 75 90 90 70 90 50 C 90 25 70 10 50 10"
              fill="transparent"
              stroke="#FFD8C4"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>

          <div className="flex flex-col items-center gap-14 z-10">
            {/* Animated Hanzi Container */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center drop-shadow-[0_0_20px_rgba(196,88,39,0.3)]"
            >
              <div ref={characterRef} />
            </motion.div>
            
            {/* Loading text & brush progress line */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-col items-center gap-5"
            >
              <span className="text-[10px] tracking-[0.5em] text-[#FFD8C4]/60 uppercase font-sans font-medium pl-2">
                Yipi Chinese
              </span>
              <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#C45827]/80 to-transparent"
                />
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
