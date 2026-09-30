import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { PalaceDoorTransition } from '@/components/PalaceDoorTransition';

// Register GSAP Flip and Observer plugins
gsap.registerPlugin(Flip, Observer);

interface TransitionContextType {
  startTransition: (callback: () => void, mode?: 'welcome' | 'goodbye' | 'transition') => void;
  navigateWithFlip: (path: string, mode?: 'welcome' | 'goodbye' | 'transition') => void;
}

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
  navigateWithFlip: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMode, setTransitionMode] = useState<'welcome' | 'goodbye' | 'transition'>('transition');
  const callbackRef = useRef<(() => void) | null>(null);

  // Store GSAP Flip state across route changes
  const flipStateRef = useRef<any>(null);
  const observerRef = useRef<any>(null);

  // When location changes, play GSAP Flip animation on shared elements
  useEffect(() => {
    if (flipStateRef.current) {
      // Allow the DOM to render the new route layout
      const rafId = requestAnimationFrame(() => {
        const targets = document.querySelectorAll('[data-flip-id]');
        if (targets.length > 0 && flipStateRef.current) {
          Flip.from(flipStateRef.current, {
            duration: 0.75,
            ease: 'power3.out',
            scale: true,
            absolute: true,
            stagger: 0.05,
            clearProps: 'transform,position,width,height,top,left',
            onComplete: () => {
              flipStateRef.current = null;
            }
          });
        } else {
          flipStateRef.current = null;
        }
      });

      return () => cancelAnimationFrame(rafId);
    }
  }, [location.pathname]);

  const startTransition = (cb: () => void, mode: 'welcome' | 'goodbye' | 'transition' = 'transition') => {
    // 1. Capture GSAP Flip state of shared brand & interface elements
    try {
      const flipElements = document.querySelectorAll('[data-flip-id]');
      if (flipElements.length > 0) {
        flipStateRef.current = Flip.getState(flipElements);
      }
    } catch (e) {
      console.warn('GSAP Flip getState:', e);
    }

    // 2. Use GSAP Observer to lock scrolling smoothly during active transition
    try {
      if (observerRef.current) {
        observerRef.current.kill();
      }
      observerRef.current = Observer.create({
        target: window,
        type: 'wheel,touch,pointer',
        preventDefault: true,
        tolerance: 10,
        onChange: () => {}
      });
    } catch (e) {
      console.warn('GSAP Observer create:', e);
    }

    callbackRef.current = cb;
    setTransitionMode(mode);
    setIsTransitioning(true);
  };

  const navigateWithFlip = (path: string, mode: 'welcome' | 'goodbye' | 'transition' = 'transition') => {
    startTransition(() => {
      navigate(path);
    }, mode);
  };

  const handleReadyToReveal = () => {
    if (callbackRef.current) {
      callbackRef.current();
      callbackRef.current = null;
    }
  };

  const handleComplete = () => {
    // Release GSAP Observer scroll lock
    if (observerRef.current) {
      observerRef.current.kill();
      observerRef.current = null;
    }
    setIsTransitioning(false);
    callbackRef.current = null;
  };

  return (
    <TransitionContext.Provider value={{ startTransition, navigateWithFlip }}>
      {children}
      {isTransitioning && (
        <PalaceDoorTransition 
          mode={transitionMode} 
          onReadyToReveal={handleReadyToReveal} 
          onComplete={handleComplete} 
        />
      )}
    </TransitionContext.Provider>
  );
};
