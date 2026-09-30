import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Book, Target, Loader2, CheckCircle2, MessageCircle, Compass } from 'lucide-react';

interface WelcomeOnboardingProps {
  onComplete: (name: string, level: string, goal: string) => void;
  defaultName?: string;
}

export const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({ onComplete, defaultName = '' }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(defaultName);
  const [level, setLevel] = useState('');
  const [goal, setGoal] = useState('');

  const handleNext = () => {
    if (step === 3) {
      // Simulate API loading
      setTimeout(() => {
        onComplete(name, level, goal);
      }, 2500);
    }
    setStep(s => s + 1);
  };

  const steps = [
    // Step 0: Welcome
    <motion.div
      key="step0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center max-w-lg mx-auto"
    >
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 border border-orange-100 shadow-sm">
        <BookOpen className="w-12 h-12 text-[#C45827]" />
      </div>
      <h1 className="text-4xl md:text-5xl font-oriental font-bold text-[#4A190F] mb-6 leading-tight">
        Chào mừng đến với <span className="text-[#C45827]">YIPI</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
        Nền tảng học tiếng Trung cá nhân hóa, giúp bạn nắm vững HSK một cách tự nhiên và thú vị nhất.
      </p>
      <button
        onClick={handleNext}
        className="px-8 py-4 bg-[#C45827] text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-[#A5471E] transition-all active:scale-95 shadow-lg shadow-[#C45827]/20"
      >
        Bắt đầu hành trình <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>,

    // Step 1: Name
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center max-w-md mx-auto w-full"
    >
      <h2 className="text-3xl font-bold text-[#4A190F] mb-4">Bạn tên là gì?</h2>
      <p className="text-gray-500 mb-8">Hãy cho chúng mình biết tên để YIPI có thể xưng hô với bạn nhé.</p>
      
      <div className="w-full relative mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên hoặc biệt danh của bạn"
          autoFocus
          className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-2xl text-xl text-center font-bold text-gray-800 focus:outline-none focus:border-[#C45827] focus:ring-4 focus:ring-[#C45827]/10 transition-all shadow-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && name.trim()) handleNext();
          }}
        />
      </div>

      <button
        onClick={handleNext}
        disabled={!name.trim()}
        className="w-full py-4 bg-[#4A190F] text-white rounded-2xl font-bold text-lg hover:bg-[#3A140C] transition-all disabled:opacity-50 disabled:active:scale-100 active:scale-95"
      >
        Tiếp tục
      </button>
    </motion.div>,

    // Step 2: Level
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full"
    >
      <h2 className="text-3xl font-bold text-[#4A190F] mb-4">Trình độ hiện tại của {name} là gì?</h2>
      <p className="text-gray-500 mb-8">Điều này giúp YIPI đề xuất lộ trình học phù hợp nhất.</p>
      
      <div className="w-full flex flex-col gap-3 mb-8">
        {[
          { id: 'beginner', label: 'Tân binh (Mới bắt đầu)', desc: 'Chưa biết gì về tiếng Trung' },
          { id: 'elementary', label: 'Đã biết một chút (HSK 1-2)', desc: 'Biết Pinyin và một số câu giao tiếp cơ bản' },
          { id: 'intermediate', label: 'Trung cấp (HSK 3-4)', desc: 'Có thể giao tiếp khá, muốn nâng cao ngữ pháp' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setLevel(item.id);
              setTimeout(handleNext, 300);
            }}
            className={`w-full p-5 text-left border-2 rounded-2xl transition-all ${
              level === item.id 
                ? 'border-[#C45827] bg-[#C45827]/5' 
                : 'border-gray-100 bg-white hover:border-gray-300'
            }`}
          >
            <div className="font-bold text-[#4A190F] text-lg">{item.label}</div>
            <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 3: Goal
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full"
    >
      <h2 className="text-3xl font-bold text-[#4A190F] mb-4">Mục tiêu của bạn là gì?</h2>
      <p className="text-gray-500 mb-8">Chọn mục tiêu chính để hệ thống tối ưu bài tập cho {name}.</p>
      
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {[
          { id: 'hsk', icon: <Target className="w-8 h-8 mb-3" />, label: 'Thi HSK' },
          { id: 'communication', icon: <MessageCircle className="w-8 h-8 mb-3" />, label: 'Giao tiếp' },
          { id: 'work', icon: <Book className="w-8 h-8 mb-3" />, label: 'Công việc' },
          { id: 'hobby', icon: <CheckCircle2 className="w-8 h-8 mb-3" />, label: 'Sở thích' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setGoal(item.id);
              setTimeout(handleNext, 400);
            }}
            className={`flex flex-col items-center p-6 border-2 rounded-2xl transition-all ${
              goal === item.id 
                ? 'border-[#C45827] bg-[#C45827]/5 text-[#C45827]' 
                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {item.icon}
            <div className="font-bold text-lg">{item.label}</div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 4: Loading / Finalizing
    <motion.div
      key="step4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-gray-100"></div>
        <div className="w-24 h-24 rounded-full border-4 border-[#C45827] border-t-transparent animate-spin absolute top-0 left-0"></div>
        <Compass className="w-8 h-8 text-[#C45827] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h2 className="text-2xl font-bold text-[#4A190F] mb-3">Đang thiết lập lộ trình cho {name}...</h2>
      <p className="text-gray-500 animate-pulse">Sắp xong rồi, chờ một chút nhé!</p>
    </motion.div>
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAEDE6] overflow-hidden p-6">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-200/40 rounded-full blur-3xl hidden md:block pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-200/30 rounded-full blur-3xl hidden md:block pointer-events-none"></div>
      
      <div className="w-full relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      {step > 0 && step < 4 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                step === i ? 'bg-[#C45827] w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
