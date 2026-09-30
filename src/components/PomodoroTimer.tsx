import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const MODES = {
  focus: { time: 25 * 60, label: 'Tập trung', color: '#C45827', bg: 'bg-[#C45827]/10', icon: BookOpen },
  shortBreak: { time: 5 * 60, label: 'Nghỉ ngắn', color: '#4A190F', bg: 'bg-[#4A190F]/10', icon: Coffee },
  longBreak: { time: 15 * 60, label: 'Nghỉ dài', color: '#682315', bg: 'bg-[#682315]/10', icon: BrainCircuit },
};

export const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.time);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play a sound or notification here ideally
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode].time);
  };

  const changeMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].time);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100;
  const CurrentIcon = MODES[mode].icon;

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
      {/* Decorative background blur */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-500 ${mode === 'focus' ? 'bg-[#C45827]' : 'bg-[#4A190F]'}`}></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2 text-[#4A190F]">
          <CurrentIcon className="w-5 h-5" />
          <h3 className="font-bold text-gray-800 text-sm">Phiên học Pomodoro</h3>
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="flex bg-gray-50 rounded-xl p-1 mb-8 relative z-10">
        {(Object.keys(MODES) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => changeMode(m)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
              mode === m
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="relative flex justify-center items-center mb-8">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-gray-100"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            className="transition-all duration-1000 ease-linear"
            stroke={MODES[mode].color}
            strokeWidth="12"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono text-gray-800 tracking-tighter">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
            {MODES[mode].label}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 relative z-10">
        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={toggleTimer}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-95 ${
            isRunning 
              ? 'bg-[#4A190F] hover:bg-[#3A140C]' 
              : 'bg-[#C45827] hover:bg-[#A3431A]'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isRunning ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </motion.div>
          </AnimatePresence>
        </button>
        
        {/* Placeholder for future settings/skip button to keep balance */}
        <div className="w-10 h-10"></div>
      </div>
    </div>
  );
};
