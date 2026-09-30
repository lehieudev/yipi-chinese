import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { PenTool, Play, RotateCcw, Target, ArrowRight, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

export const WritingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const [activeChar, setActiveChar] = useState('学');
  const [isQuizzing, setIsQuizzing] = useState(false);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'writing' | 'success'>('idle');

  const vocabList = [
    { char: '学', pinyin: 'xué', meaning: 'Học', strokes: 8 },
    { char: '习', pinyin: 'xí', meaning: 'Tập', strokes: 3 },
    { char: '中', pinyin: 'zhōng', meaning: 'Trung', strokes: 4 },
    { char: '文', pinyin: 'wén', meaning: 'Văn', strokes: 4 },
    { char: '我', pinyin: 'wǒ', meaning: 'Tôi', strokes: 7 },
    { char: '爱', pinyin: 'ài', meaning: 'Yêu', strokes: 10 },
    { char: '你', pinyin: 'nǐ', meaning: 'Bạn', strokes: 7 },
    { char: '好', pinyin: 'hǎo', meaning: 'Tốt / Khỏe', strokes: 6 },
    { char: '汉', pinyin: 'hàn', meaning: 'Hán', strokes: 5 },
    { char: '语', pinyin: 'yǔ', meaning: 'Ngữ', strokes: 9 },
  ];

  const activeCharData = vocabList.find(v => v.char === activeChar) || vocabList[0];

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous writer
    containerRef.current.innerHTML = '';
    setIsQuizzing(false);
    setQuizStatus('idle');
    
    // Initialize new writer
    writerRef.current = HanziWriter.create(containerRef.current, activeChar, {
      width: 300,
      height: 300,
      padding: 24,
      showOutline: true,
      strokeAnimationSpeed: 1.5,
      delayBetweenStrokes: 150,
      strokeColor: '#C45827',
      highlightColor: '#FCA5A5',
      outlineColor: '#E5E7EB',
      drawingColor: '#4A190F',
      drawingWidth: 16,
    });
  }, [activeChar]);

  const handleAnimate = () => {
    if (!writerRef.current) return;
    setIsQuizzing(false);
    setQuizStatus('idle');
    writerRef.current.cancelQuiz();
    writerRef.current.animateCharacter();
  };

  const handleQuiz = () => {
    if (!writerRef.current) return;
    setIsQuizzing(true);
    setQuizStatus('writing');
    writerRef.current.quiz({
      onMistake: (strokeData: any) => {
        console.log('Mistake', strokeData);
      },
      onCorrectStroke: (strokeData: any) => {
        console.log('Correct', strokeData);
      },
      onComplete: (summaryData: any) => {
        setQuizStatus('success');
      }
    });
  };

  const handleClear = () => {
    if (!writerRef.current) return;
    setIsQuizzing(false);
    setQuizStatus('idle');
    writerRef.current.cancelQuiz();
    
    // Reset by recreating to clear drawings
    containerRef.current!.innerHTML = '';
    writerRef.current = HanziWriter.create(containerRef.current!, activeChar, {
      width: 300,
      height: 300,
      padding: 24,
      showOutline: true,
      strokeColor: '#C45827',
      highlightColor: '#FCA5A5',
      outlineColor: '#E5E7EB',
      drawingColor: '#4A190F',
      drawingWidth: 16,
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6 lg:gap-10">
      
      {/* Banner */}
      <div className="bg-white rounded-[24px] border border-red-900/10 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl hidden md:block opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-red-600 font-bold mb-3 uppercase tracking-wider text-xs">
            <PenTool className="w-4 h-4" />
            Luyện viết
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-2">Học viết chữ Hán chuẩn nét</h1>
          <p className="text-[#682315]/70 text-sm leading-relaxed">
            Xem ảnh động hướng dẫn từng nét, sau đó tự viết lại trên ô chữ thập. Viết đúng quy tắc thuận tay giúp nhớ lâu và nét chữ đẹp hơn.
          </p>
        </div>

        <div className="relative z-10 hidden sm:flex items-center justify-center w-32 h-32 rounded-full bg-red-50 border-4 border-white shadow-lg shrink-0 overflow-hidden">
           <svg className="w-20 h-20 text-red-200 absolute opacity-50" viewBox="0 0 100 100">
             <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
             <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
             <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
             <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
           </svg>
           <span className="text-6xl font-oriental text-[#C45827] relative z-10">永</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        
        {/* Left: Vocabulary List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#4A190F]">Danh sách từ vựng</h2>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Bài 1</span>
          </div>
          
          <div className="bg-white rounded-[20px] p-2 border border-gray-100 shadow-sm overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
              {vocabList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChar(item.char)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${activeChar === item.char ? 'bg-red-50 border border-red-100 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl font-oriental ${activeChar === item.char ? 'bg-white text-red-600 shadow-sm' : 'bg-gray-100 text-gray-700'}`}>
                      {item.char}
                    </div>
                    <div>
                      <div className={`font-bold ${activeChar === item.char ? 'text-red-700' : 'text-gray-800'}`}>{item.pinyin}</div>
                      <div className="text-xs text-gray-500">{item.meaning}</div>
                    </div>
                  </div>
                  {activeChar === item.char && (
                    <ChevronRight className="w-5 h-5 text-red-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Writing Canvas */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 sm:p-10 flex flex-col items-center relative overflow-hidden">
            
            {/* Header / Info */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#4A190F] mb-1">{activeCharData.char} - {activeCharData.pinyin}</h3>
                <p className="text-[#682315]/70 text-sm">Nghĩa: {activeCharData.meaning} • Số nét: {activeCharData.strokes}</p>
              </div>
              
              {quizStatus === 'success' && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm border border-green-200 animate-pulse">
                  <CheckCircle2 className="w-5 h-5" />
                  Bạn đã viết đúng!
                </div>
              )}
            </div>

            {/* Canvas Container */}
            <div className="relative mb-8">
              {/* Grid Background (Tian Zi Ge - 田字格) */}
              <div className="absolute inset-0 pointer-events-none border-2 border-red-200 rounded-lg overflow-hidden flex items-center justify-center">
                 <svg width="100%" height="100%" viewBox="0 0 300 300">
                    <line x1="150" y1="0" x2="150" y2="300" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6,6" />
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6,6" />
                    <line x1="0" y1="0" x2="300" y2="300" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6,6" opacity="0.5" />
                    <line x1="300" y1="0" x2="0" y2="300" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6,6" opacity="0.5" />
                 </svg>
              </div>
              
              {/* Hanzi Writer Mount Point */}
              <div ref={containerRef} className="w-[300px] h-[300px] cursor-crosshair rounded-lg overflow-hidden bg-transparent relative z-10" />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button 
                onClick={handleAnimate}
                disabled={isQuizzing}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${isQuizzing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <Play className="w-4 h-4" /> Xem viết mẫu
              </button>
              
              <button 
                onClick={handleQuiz}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm ${isQuizzing ? 'bg-[#C45827] text-white' : 'bg-white border border-[#C45827] text-[#C45827] hover:bg-[#FFF9F6]'}`}
              >
                <PenTool className="w-4 h-4" /> {isQuizzing ? 'Đang viết...' : 'Tự luyện viết'}
              </button>
              
              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <RotateCcw className="w-4 h-4" /> Xóa viết lại
              </button>
            </div>
            
            {/* Hint Box */}
            <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-4 w-full flex items-start gap-3">
              <Target className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-orange-800 text-sm mb-1">Mẹo viết chữ Hán</h4>
                <p className="text-orange-700/80 text-xs leading-relaxed">
                  Trái trước phải sau, trên trước dưới sau, ngang trước sổ sau, ngoài trước trong sau. Nếu đang trong chế độ "Tự luyện viết", hãy dùng chuột hoặc ngón tay (trên di động) vẽ trực tiếp lên ô vuông ở trên để luyện tập!
                </p>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};
