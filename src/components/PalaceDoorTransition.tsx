import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import HanziWriter from 'hanzi-writer';
import { HANZI_STROKE_DATA } from '@/data/hanziStrokeData';

export interface PalaceDoorProps {
  mode?: 'welcome' | 'goodbye' | 'transition';
  onReadyToReveal?: () => void;
  onComplete?: () => void;
}

export const PalaceDoorTransition: React.FC<PalaceDoorProps> = ({
  mode = 'welcome',
  onReadyToReveal,
  onComplete
}) => {
  // Discrete choreography stages:
  // 'closing': Doors swinging shut swiftly to center (goodbye, transition)
  // 'writing': Doors shut at center, centerpiece writing Hanzi with ZERO network latency
  // 'fade-centerpiece': Writing done, centerpiece smoothly fades to 0 opacity BEFORE doors open
  // 'opening': Centerpiece is GONE, doors swing wide open in 3D
  // 'dissolving': Entire overlay smoothly fades to 0 opacity
  // 'done': Finished, trigger onComplete
  const [stage, setStage] = useState<
    'closing' | 'writing' | 'fade-centerpiece' | 'opening' | 'dissolving' | 'done'
  >(
    mode === 'welcome' ? 'writing' : 'closing'
  );

  const [charFinished, setCharFinished] = useState(false);
  const charContainerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  const targetChar = mode === 'goodbye' ? '安' : '易';

  // 1. Initial door closing for 'goodbye' and 'transition' (Swift, crisp 380ms swing shut)
  useEffect(() => {
    if (mode === 'goodbye' || mode === 'transition') {
      const closeTimer = setTimeout(() => {
        setStage('writing');
      }, 380);
      return () => clearTimeout(closeTimer);
    }
  }, [mode]);

  // 2. Initialize HanziWriter when stage enters 'writing'
  // Using pre-bundled HANZI_STROKE_DATA for 0ms instant startup without network lag!
  useEffect(() => {
    let isCancelled = false;

    if (stage === 'writing') {
      setCharFinished(false);

      const runWriter = () => {
        if (!charContainerRef.current || isCancelled) return;
        charContainerRef.current.innerHTML = '';

        try {
          writerRef.current = HanziWriter.create(charContainerRef.current, targetChar, {
            width: 100,
            height: 100,
            padding: 6,
            strokeColor: '#FFEAA8',
            radicalColor: '#FFD680',
            outlineColor: 'rgba(255, 234, 168, 0.12)',
            strokeAnimationSpeed: 2.8,
            delayBetweenStrokes: 40,
            showOutline: true,
            // Instant local data loader - bypasses any network request!
            charDataLoader: (char: string, onLoaded: (data: any) => void, onError: (err: any) => void) => {
              if (HANZI_STROKE_DATA[char]) {
                onLoaded(HANZI_STROKE_DATA[char]);
              } else {
                fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(char)}.json`)
                  .then(res => res.json())
                  .then(onLoaded)
                  .catch(onError);
              }
            },
            onLoadCharDataSuccess: () => {
              if (isCancelled) return;
              writerRef.current?.animateCharacter({
                onComplete: () => {
                  if (!isCancelled) setCharFinished(true);
                }
              });
            },
            onLoadCharDataError: () => {
              if (!isCancelled) setCharFinished(true);
            }
          });
        } catch {
          if (!isCancelled) setCharFinished(true);
        }
      };

      // Starts immediately upon doors touching center
      const startTimer = setTimeout(runWriter, 25);

      // Safety fallback timeout
      const safetyTimer = setTimeout(() => {
        if (!isCancelled) setCharFinished(true);
      }, 1500);

      return () => {
        isCancelled = true;
        clearTimeout(startTimer);
        clearTimeout(safetyTimer);
      };
    }
  }, [stage, targetChar]);

  // 3. When character finishes writing, progress to next stage
  // Route change happens behind closed doors, then centerpiece fades
  useEffect(() => {
    if (stage === 'writing' && charFinished) {
      const toFadeTimer = setTimeout(() => {
        if (onReadyToReveal) {
          onReadyToReveal();
        }
        setStage('fade-centerpiece');
      }, 220);
      return () => clearTimeout(toFadeTimer);
    }
  }, [stage, charFinished, onReadyToReveal]);

  // 4. Once centerpiece has faded out completely, SWING DOORS OPEN TO REVEAL DESTINATION
  useEffect(() => {
    if (stage === 'fade-centerpiece') {
      const openTimer = setTimeout(() => {
        setStage('opening');
      }, 160);
      return () => clearTimeout(openTimer);
    }
  }, [stage]);

  // 5. While doors are swinging open, initiate seamless overlay dissolution
  useEffect(() => {
    if (stage === 'opening') {
      const dissolveTimer = setTimeout(() => {
        setStage('dissolving');
      }, 400);
      return () => clearTimeout(dissolveTimer);
    }
  }, [stage]);

  // 6. Complete and clean unmount
  useEffect(() => {
    if (stage === 'dissolving') {
      const completeTimer = setTimeout(() => {
        setStage('done');
        if (onComplete) onComplete();
      }, 280);
      return () => clearTimeout(completeTimer);
    }
  }, [stage, onComplete]);

  if (stage === 'done') return null;

  // Initial angle when component mounts:
  // If welcome: doors start shut at center (0deg)
  // If goodbye/transition: doors start swung open (-88deg / 88deg) then swing shut to 0deg
  const initialLeftAngle = mode === 'welcome' ? 0 : -88;
  const initialRightAngle = mode === 'welcome' ? 0 : 88;

  const currentLeftAngle = (stage === 'opening' || stage === 'dissolving')
    ? -90
    : 0;

  const currentRightAngle = (stage === 'opening' || stage === 'dissolving')
    ? 90
    : 0;

  // Show centerpiece ONLY during 'writing' stage when doors are firmly closed at center
  const showCenterpiece = stage === 'writing';

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'dissolving' ? 0 : 1 }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
      className={`fixed inset-0 z-[120] overflow-hidden flex items-center justify-center select-none ${
        stage === 'dissolving' || stage === 'done' ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      style={{ perspective: '1800px' }}
      aria-hidden="true"
    >
      {/* 
        COURTYARD ATMOSPHERIC BACKDROP 
        Dark lacquer background that smoothly fades away when doors open, 
        revealing the destination page underneath through the parting gate.
      */}
      <motion.div 
        initial={{ opacity: mode === 'welcome' ? 0.95 : 0 }}
        animate={{ 
          opacity: (stage === 'opening' || stage === 'dissolving') ? 0 : 0.95 
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-[#160502] z-0"
      />

      {/* AMBIENT NATURAL DAYLIGHT HAZE BEHIND GATES */}
      <motion.div 
        animate={{ 
          opacity: stage === 'opening' ? 0.3 : 0 
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 bg-radial from-[#F59E0B]/20 via-transparent to-transparent pointer-events-none z-10"
      />

      {/* ======================================================== */}
      {/* SOLID IMPERIAL TIMBER FRAME (Khung cổng hoàng cung)      */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Header Beam */}
        <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 bg-gradient-to-b from-[#100301] via-[#200602] to-[#120301] border-b border-[#D4A359]/30 shadow-2xl flex items-center justify-center">
          <div className="w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-[#FFDA85]/40 to-transparent" />
        </div>
        {/* Left Jamb */}
        <div className="absolute top-0 bottom-0 left-0 w-3 sm:w-5 bg-gradient-to-r from-[#100301] via-[#200602] to-[#120301] border-r border-[#D4A359]/20 shadow-2xl" />
        {/* Right Jamb */}
        <div className="absolute top-0 bottom-0 right-0 w-3 sm:w-5 bg-gradient-to-l from-[#100301] via-[#200602] to-[#120301] border-l border-[#D4A359]/20 shadow-2xl" />
        {/* Bottom Threshold */}
        <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 bg-gradient-to-t from-[#0E0201] via-[#1E0602] to-[#100301] border-t border-[#D4A359]/30 shadow-2xl" />
      </div>

      {/* ======================================================== */}
      {/* CÁNH TẢ (LEFT DOOR LEAF)                                 */}
      {/* ======================================================== */}
      <motion.div
        initial={{ rotateY: initialLeftAngle }}
        animate={{ rotateY: currentLeftAngle }}
        transition={{ 
          duration: stage === 'closing' ? 0.42 : 0.65, 
          ease: [0.16, 1, 0.3, 1] // Heavy solid timber physics curve
        }}
        style={{ 
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        className="absolute top-0 left-0 w-1/2 h-full z-20 flex flex-col justify-between shadow-[15px_0_40px_rgba(0,0,0,0.85)]"
      >
        {/* Front Surface: Vermilion Lacquer on Aged Hardwood */}
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-r from-[#2A0803] via-[#481206] to-[#360B04] flex flex-col justify-between p-3 sm:p-6 border-r border-[#150401]">
          
          {/* Authentic Wood Panel Border */}
          <div className="absolute inset-3 sm:inset-5 border-2 border-[#1E0502] rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_1px_2px_rgba(255,200,150,0.08)] pointer-events-none">
            <div className="absolute inset-2 border border-[#963812]/30 rounded-xs" />
          </div>

          {/* Top Traditional Chinese Fretwork Lattice (Hoa văn mộc truyền thống) */}
          <div className="w-full h-24 sm:h-36 border-2 border-[#1B0502] bg-[#160401]/90 rounded-sm p-2 sm:p-3 relative shadow-inner flex items-center justify-center shrink-0">
            <svg viewBox="0 0 120 70" className="w-full h-full stroke-[#D4A359]/40 fill-none" strokeWidth="1.5">
              <rect x="8" y="8" width="104" height="54" rx="2" strokeWidth="1.8" />
              <rect x="14" y="14" width="92" height="42" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              <path d="M 14,35 H 106 M 40,14 V 56 M 80,14 V 56" />
              <rect x="46" y="21" width="28" height="28" rx="1" strokeWidth="1.5" className="stroke-[#FFDA85]/60" />
              <circle cx="60" cy="35" r="7" className="stroke-[#FFDA85]/70" />
            </svg>
          </div>

          {/* Mid Section: Centered Pushou Lion Knocker & Framing Studs */}
          <div className="relative w-full my-auto flex flex-col items-center justify-center z-10 py-2">
            
            {/* Upper Stud Row (3 studs) */}
            <div className="flex items-center gap-7 sm:gap-12 mb-3 sm:mb-5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFE89E] via-[#BA8838] to-[#59340B] shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_4px_8px_rgba(0,0,0,0.85)] border border-[#FFDC82]/40 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5DC] opacity-90 shadow-xs" />
                </div>
              ))}
            </div>

            {/* Centered Pushou Lion Knocker (Phố thủ hàm hoàn ngay chính giữa cánh) */}
            <div className="w-12 h-16 sm:w-16 sm:h-20 rounded-t-xl rounded-b-md bg-gradient-to-b from-[#FFEAA8] via-[#B88738] to-[#54330D] shadow-[0_8px_16px_rgba(0,0,0,0.8)] border border-[#FFF2CA]/50 flex flex-col items-center justify-center p-1 my-1">
              <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-10 sm:h-10 fill-[#402404] stroke-[#FFEAA8]/80" strokeWidth="0.8">
                <circle cx="20" cy="18" r="11" />
                <circle cx="15" cy="16" r="2.5" fill="#FFEAA8" />
                <circle cx="25" cy="16" r="2.5" fill="#FFEAA8" />
                <path d="M 17,23 Q 20,26 23,23" />
                <path d="M 12,10 Q 15,6 20,8 Q 25,6 28,10" />
              </svg>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border-4 sm:border-[5px] border-[#FFE6A0] bg-transparent shadow-[0_4px_8px_rgba(0,0,0,0.7)] -mt-1.5" />
            </div>

            {/* Lower Stud Row (3 studs) */}
            <div className="flex items-center gap-7 sm:gap-12 mt-3 sm:mt-5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFE89E] via-[#BA8838] to-[#59340B] shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_4px_8px_rgba(0,0,0,0.85)] border border-[#FFDC82]/40 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5DC] opacity-90 shadow-xs" />
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Traditional Chinese Fretwork Lattice */}
          <div className="w-full h-24 sm:h-36 border-2 border-[#1B0502] bg-[#160401]/90 rounded-sm p-2 sm:p-3 relative shadow-inner flex items-center justify-center shrink-0">
            <svg viewBox="0 0 120 70" className="w-full h-full stroke-[#D4A359]/40 fill-none" strokeWidth="1.5">
              <rect x="8" y="8" width="104" height="54" rx="2" strokeWidth="1.8" />
              <path d="M 8,35 H 112 M 35,8 V 62 M 85,8 V 62" />
              <rect x="42" y="16" width="36" height="38" rx="1" strokeWidth="1.5" className="stroke-[#FFDA85]/55" />
              <circle cx="60" cy="35" r="9" className="stroke-[#FFDA85]/65" />
            </svg>
          </div>

        </div>

        {/* 3D Physical Door Edge Thickness (Độ dày mộc của cánh cửa khi mở phối cảnh) */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-[14px] sm:w-[18px] bg-gradient-to-r from-[#170401] to-[#2E0903] border-l border-black/80"
          style={{ 
            transform: 'rotateY(90deg) translateZ(7px)',
            transformOrigin: 'right center'
          }} 
        />
      </motion.div>

      {/* ======================================================== */}
      {/* CÁNH HỮU (RIGHT DOOR LEAF)                                */}
      {/* ======================================================== */}
      <motion.div
        initial={{ rotateY: initialRightAngle }}
        animate={{ rotateY: currentRightAngle }}
        transition={{ 
          duration: stage === 'closing' ? 0.42 : 0.65, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        style={{ 
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        className="absolute top-0 right-0 w-1/2 h-full z-20 flex flex-col justify-between shadow-[-15px_0_40px_rgba(0,0,0,0.85)]"
      >
        {/* Front Surface */}
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-l from-[#2A0803] via-[#481206] to-[#360B04] flex flex-col justify-between p-3 sm:p-6 border-l border-[#150401]">
          
          {/* Authentic Astragal Overlap Strip (Thanh nẹp che khe cửa giữa / 掩口板) */}
          <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-[#190401] via-[#3B0E05] to-[#250803] border-r border-[#D4A359]/35 shadow-xl z-30 pointer-events-none flex flex-col justify-around items-center py-12">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFE59E]/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFE59E]/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFE59E]/70" />
          </div>

          {/* Authentic Wood Panel Border */}
          <div className="absolute inset-3 sm:inset-5 border-2 border-[#1E0502] rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_1px_2px_rgba(255,200,150,0.08)] pointer-events-none">
            <div className="absolute inset-2 border border-[#963812]/30 rounded-xs" />
          </div>

          {/* Top Traditional Chinese Fretwork Lattice */}
          <div className="w-full h-24 sm:h-36 border-2 border-[#1B0502] bg-[#160401]/90 rounded-sm p-2 sm:p-3 relative shadow-inner flex items-center justify-center shrink-0">
            <svg viewBox="0 0 120 70" className="w-full h-full stroke-[#D4A359]/40 fill-none" strokeWidth="1.5">
              <rect x="8" y="8" width="104" height="54" rx="2" strokeWidth="1.8" />
              <rect x="14" y="14" width="92" height="42" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              <path d="M 14,35 H 106 M 40,14 V 56 M 80,14 V 56" />
              <rect x="46" y="21" width="28" height="28" rx="1" strokeWidth="1.5" className="stroke-[#FFDA85]/60" />
              <circle cx="60" cy="35" r="7" className="stroke-[#FFDA85]/70" />
            </svg>
          </div>

          {/* Mid Section: Centered Pushou Lion Knocker & Framing Studs */}
          <div className="relative w-full my-auto flex flex-col items-center justify-center z-10 py-2">
            
            {/* Upper Stud Row (3 studs) */}
            <div className="flex items-center gap-7 sm:gap-12 mb-3 sm:mb-5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFE89E] via-[#BA8838] to-[#59340B] shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_4px_8px_rgba(0,0,0,0.85)] border border-[#FFDC82]/40 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5DC] opacity-90 shadow-xs" />
                </div>
              ))}
            </div>

            {/* Centered Pushou Lion Knocker (Phố thủ hàm hoàn ngay chính giữa cánh) */}
            <div className="w-12 h-16 sm:w-16 sm:h-20 rounded-t-xl rounded-b-md bg-gradient-to-b from-[#FFEAA8] via-[#B88738] to-[#54330D] shadow-[0_8px_16px_rgba(0,0,0,0.8)] border border-[#FFF2CA]/50 flex flex-col items-center justify-center p-1 my-1">
              <svg viewBox="0 0 40 40" className="w-7 h-7 sm:w-10 sm:h-10 fill-[#402404] stroke-[#FFEAA8]/80" strokeWidth="0.8">
                <circle cx="20" cy="18" r="11" />
                <circle cx="15" cy="16" r="2.5" fill="#FFEAA8" />
                <circle cx="25" cy="16" r="2.5" fill="#FFEAA8" />
                <path d="M 17,23 Q 20,26 23,23" />
                <path d="M 12,10 Q 15,6 20,8 Q 25,6 28,10" />
              </svg>
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border-4 sm:border-[5px] border-[#FFE6A0] bg-transparent shadow-[0_4px_8px_rgba(0,0,0,0.7)] -mt-1.5" />
            </div>

            {/* Lower Stud Row (3 studs) */}
            <div className="flex items-center gap-7 sm:gap-12 mt-3 sm:mt-5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFE89E] via-[#BA8838] to-[#59340B] shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_4px_8px_rgba(0,0,0,0.85)] border border-[#FFDC82]/40 flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFF5DC] opacity-90 shadow-xs" />
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Traditional Chinese Fretwork Lattice */}
          <div className="w-full h-24 sm:h-36 border-2 border-[#1B0502] bg-[#160401]/90 rounded-sm p-2 sm:p-3 relative shadow-inner flex items-center justify-center shrink-0">
            <svg viewBox="0 0 120 70" className="w-full h-full stroke-[#D4A359]/40 fill-none" strokeWidth="1.5">
              <rect x="8" y="8" width="104" height="54" rx="2" strokeWidth="1.8" />
              <path d="M 8,35 H 112 M 35,8 V 62 M 85,8 V 62" />
              <rect x="42" y="16" width="36" height="38" rx="1" strokeWidth="1.5" className="stroke-[#FFDA85]/55" />
              <circle cx="60" cy="35" r="9" className="stroke-[#FFDA85]/65" />
            </svg>
          </div>

        </div>

        {/* 3D Physical Door Edge Thickness */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-[14px] sm:w-[18px] bg-gradient-to-l from-[#170401] to-[#2E0903] border-r border-black/80"
          style={{ 
            transform: 'rotateY(-90deg) translateZ(7px)',
            transformOrigin: 'left center'
          }} 
        />
      </motion.div>

      {/* ======================================================== */}
      {/* CENTERPIECE MEDALLION: HANZI STROKE WRITING AT THE HEART */}
      {/* Chỉ hiển thị khi 2 cánh cửa đã đóng kín tại trung tâm.   */}
      {/* ======================================================== */}
      <motion.div
        animate={{ 
          opacity: showCenterpiece ? 1 : 0,
          scale: showCenterpiece ? 1 : 0.95
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
        style={{
          display: (stage === 'opening' || stage === 'dissolving' || stage === 'done') ? 'none' : 'flex'
        }}
      >
        {/* Imperial Disc Medallion */}
        <div className="relative flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br from-[#401007] via-[#240803] to-[#140401] border-3 sm:border-4 border-[#E5A952] shadow-[0_16px_36px_rgba(0,0,0,0.92)]">
          
          {/* Gold Filigree Ring Layer */}
          <div className="absolute inset-1 rounded-full border border-[#FFEAA8]/40 pointer-events-none" />
          
          {/* Hanzi Canvas Container */}
          <div 
            ref={charContainerRef} 
            className="w-[100px] h-[100px] flex items-center justify-center transition-all duration-300"
            style={{
              filter: charFinished ? 'drop-shadow(0 0 10px rgba(255, 234, 168, 0.7))' : 'none'
            }}
          />

          {/* Four Auspicious Corner Studs */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E5A952] rounded-full shadow-md border border-[#FFF0C2]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E5A952] rounded-full shadow-md border border-[#FFF0C2]" />
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#E5A952] rounded-full shadow-md border border-[#FFF0C2]" />
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#E5A952] rounded-full shadow-md border border-[#FFF0C2]" />
        </div>

        {/* Plaque Calligraphic Caption below Medallion */}
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#200602]/95 border border-[#D4A359]/60 shadow-[0_8px_20px_rgba(0,0,0,0.8)] text-center backdrop-blur-xs max-w-xs"
        >
          <h2 className="text-base sm:text-lg font-bold font-serif text-[#FFEAA8] tracking-widest drop-shadow-sm">
            {mode === 'goodbye' 
              ? '「 再会 • 顺遂 」' 
              : (mode === 'transition' ? '「 易 • Nhập Môn 」' : '「 易 • 迎客 」')}
          </h2>
          <p className="text-[11px] sm:text-xs font-medium text-[#FFD8C4]/90 mt-0.5 whitespace-nowrap">
            {mode === 'goodbye' 
              ? 'Chúc bạn vạn sự hanh thông • Hẹn sớm gặp lại!' 
              : (mode === 'transition' 
                ? 'Đang tiến vào không gian học tập...' 
                : 'Cánh cửa mở ra • Chào mừng bạn đến với Yipi')}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
