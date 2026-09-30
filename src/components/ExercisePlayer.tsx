import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Volume2 } from 'lucide-react';

interface ExercisePlayerProps {
  exerciseId: number;
  level: string;
  onBack: () => void;
}

export const ExercisePlayer: React.FC<ExercisePlayerProps> = ({ exerciseId, level, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // States for Word Order
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  
  // States for Fill Blank
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // States for Listening Order
  const [orderedLines, setOrderedLines] = useState<number[]>([]);

  // Initialize question data
  useEffect(() => {
    setIsChecked(false);
    setIsCorrect(false);
    setSelectedOption(null);
    
    if (exerciseId === 1) {
      setAvailableWords(['这条', '路', '长', '很']);
      setSelectedWords([]);
    } else if (exerciseId === 4) {
      setOrderedLines([0, 1, 2, 3]); // Mock initial order
    }
  }, [currentQuestion, exerciseId]);

  const handleCheck = () => {
    setIsChecked(true);
    let correct = false;
    
    if (exerciseId === 1) {
      correct = selectedWords.join('') === '这条路很长';
    } else if (exerciseId === 2) {
      correct = selectedOption === '六';
    } else if (exerciseId === 3) {
      correct = selectedOption === '忘';
    } else if (exerciseId === 4) {
      // Mock correct
      correct = orderedLines[0] === 0 && orderedLines[1] === 1 && orderedLines[2] === 2 && orderedLines[3] === 3;
    } else if (exerciseId === 5) {
      correct = selectedOption === '老';
    }
    
    setIsCorrect(correct);
  };
  
  const handleNext = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onBack();
    }
  };

  const toggleWord = (word: string, fromSelected: boolean) => {
    if (isChecked) return;
    if (fromSelected) {
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      setAvailableWords(prev => prev.filter(w => w !== word));
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const playAudio = () => {
    // In a real app, play specific audio
    // window.speechSynthesis.speak(new SpeechSynthesisUtterance("测试"));
  };

  const moveLine = (index: number, direction: -1 | 1) => {
    if (isChecked) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= orderedLines.length) return;
    const newLines = [...orderedLines];
    const temp = newLines[index];
    newLines[index] = newLines[newIndex];
    newLines[newIndex] = temp;
    setOrderedLines(newLines);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] max-w-4xl mx-auto w-full bg-white sm:rounded-[32px] sm:my-6 shadow-sm border border-gray-100 overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="ml-4 text-xs font-bold text-gray-400 w-10 text-right">
          {currentQuestion + 1}/10
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 flex flex-col items-center">
         <div className="text-center text-[#4A190F] text-xs font-bold uppercase tracking-wider mb-8">
           {exerciseId === 1 && "Sắp xếp các từ thành câu hoàn chỉnh"}
           {exerciseId === 2 && "Điền từ còn thiếu vào chỗ trống"}
           {exerciseId === 3 && "Nghe rồi chọn từ còn thiếu"}
           {exerciseId === 4 && "Nghe rồi sắp xếp các lượt thoại theo đúng thứ tự"}
           {exerciseId === 5 && "Đọc đoạn văn và chọn từ đúng cho chỗ trống"}
         </div>
         
         <div className="flex-1 flex flex-col items-center w-full max-w-2xl">
            {/* 1. Sắp xếp từ */}
            {exerciseId === 1 && (
              <div className="w-full flex flex-col items-center gap-12">
                <div className="text-xl sm:text-2xl font-bold text-center text-[#4A190F]">
                  Con đường này rất dài.
                </div>
                
                {/* Drop zone */}
                <div className="w-full min-h-[60px] border-b-2 border-dashed border-gray-300 flex flex-wrap gap-2 pb-2 justify-center items-end">
                  {selectedWords.length === 0 && <span className="text-gray-400 text-sm mb-2">Bấm vào chữ bên dưới để ghép câu</span>}
                  {selectedWords.map((word, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => toggleWord(word, true)}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-lg font-oriental shadow-sm hover:border-[#C45827]"
                    >
                      {word}
                    </button>
                  ))}
                </div>

                {/* Available words */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {availableWords.map((word, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => toggleWord(word, false)}
                      className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-lg font-oriental shadow-sm hover:border-[#C45827]"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2 & 5. Điền từ */}
            {(exerciseId === 2 || exerciseId === 5) && (
              <div className="w-full flex flex-col items-center gap-10">
                {exerciseId === 5 ? (
                   <div className="text-base sm:text-lg text-[#4A190F] leading-relaxed text-center mb-4">
                     我爸爸的身体很 <span className="inline-block w-12 border-b-2 border-black mx-1"></span> 了，他今年八十岁。他没工作，在家里看书。上午他给猫做饭，晚上他早睡觉。他很想你。
                   </div>
                ) : (
                   <div className="text-2xl sm:text-4xl font-oriental text-center text-[#4A190F] mb-4">
                     <span className="inline-block w-16 border-b-2 border-black mx-2"></span> 本书。
                   </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {['六', '干', '穿', '学'].map((opt, idx) => {
                     const isSelected = selectedOption === opt;
                     return (
                      <button 
                        key={idx}
                        onClick={() => !isChecked && setSelectedOption(opt)}
                        className={`py-4 sm:py-6 rounded-2xl border-2 text-xl font-oriental transition-all ${
                          isSelected 
                            ? 'border-[#C45827] bg-[#C45827]/5 text-[#C45827]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                     );
                  })}
                </div>
              </div>
            )}

            {/* 3. Nghe điền từ */}
            {exerciseId === 3 && (
              <div className="w-full flex flex-col items-center gap-10">
                <button 
                  onClick={playAudio}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
                
                <div className="text-2xl sm:text-3xl font-oriental text-center text-[#4A190F]">
                  我 <span className="inline-block w-12 border-b-2 border-black mx-2"></span> 带书了。
                </div>
                
                <div className="text-sm text-gray-500 mb-2">
                  Tôi quên mang sách rồi.
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {['忘', '还', '写', '吗'].map((opt, idx) => {
                     const isSelected = selectedOption === opt;
                     return (
                      <button 
                        key={idx}
                        onClick={() => !isChecked && setSelectedOption(opt)}
                        className={`py-4 sm:py-6 rounded-2xl border-2 text-xl font-oriental transition-all ${
                          isSelected 
                            ? 'border-[#C45827] bg-[#C45827]/5 text-[#C45827]' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                     );
                  })}
                </div>
              </div>
            )}

            {/* 4. Nghe và sắp xếp thứ tự */}
            {exerciseId === 4 && (
              <div className="w-full flex flex-col gap-3">
                <div className="text-sm text-gray-500 text-center mb-4">
                  Bấm icon loa để nghe từng câu hội thoại
                </div>
                {orderedLines.map((lineId, index) => (
                  <div key={lineId} className="flex items-center gap-3 bg-white border border-gray-200 p-3 sm:p-4 rounded-xl shadow-sm">
                     <button onClick={playAudio} className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 hover:bg-green-100 transition-colors">
                       <Volume2 className="w-5 h-5" />
                     </button>
                     <div className="flex-1 text-sm text-gray-600">
                       [ Audio line {lineId} ] Nghe nội dung để đoán đoạn thoại
                     </div>
                     <div className="flex flex-col gap-1 shrink-0">
                       <button 
                         onClick={() => moveLine(index, -1)}
                         disabled={index === 0 || isChecked}
                         className="p-1 text-gray-400 hover:text-[#C45827] disabled:opacity-30 disabled:hover:text-gray-400"
                       >
                         ▲
                       </button>
                       <button 
                         onClick={() => moveLine(index, 1)}
                         disabled={index === orderedLines.length - 1 || isChecked}
                         className="p-1 text-gray-400 hover:text-[#C45827] disabled:opacity-30 disabled:hover:text-gray-400"
                       >
                         ▼
                       </button>
                     </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            {!isChecked && (
              <div className="w-full flex justify-center mt-auto pt-10">
                <button 
                  onClick={handleCheck} 
                  disabled={(exerciseId === 1 && availableWords.length > 0) || ((exerciseId === 2 || exerciseId === 3 || exerciseId === 5) && !selectedOption)}
                  className="px-16 py-4 bg-[#C45827] text-white font-bold rounded-[20px] shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 text-lg"
                >
                  KIỂM TRA
                </button>
              </div>
            )}
         </div>
      </div>
      
      {/* Bottom Result Bar */}
      {isChecked && (
        <div className={`p-4 md:p-6 flex items-center justify-between border-t ${isCorrect ? 'bg-[#d7ffb8] border-[#a5e173]' : 'bg-[#ffdfe0] border-[#ffb3b8]'}`}>
          <div className="flex flex-col">
            <div className={`flex items-center gap-2 ${isCorrect ? 'text-[#58a700]' : 'text-[#ea2b2b]'} font-bold text-xl sm:text-2xl`}>
              {isCorrect ? <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" /> : <XCircle className="w-6 h-6 sm:w-8 sm:h-8" />}
              {isCorrect ? 'Chính xác!' : 'Chưa đúng'}
            </div>
            {!isCorrect && exerciseId === 1 && (
              <div className="text-[#ea2b2b] text-sm mt-1">Đáp án đúng: 这条路很长</div>
            )}
            {!isCorrect && (exerciseId === 2 || exerciseId === 3 || exerciseId === 5) && (
              <div className="text-[#ea2b2b] text-sm mt-1">Đáp án đúng: {exerciseId === 5 ? '老' : (exerciseId === 3 ? '忘' : '六')}</div>
            )}
          </div>
          <button 
            onClick={handleNext}
            className={`px-8 sm:px-12 py-3 sm:py-4 rounded-[20px] font-bold text-white shadow-sm transition-transform active:scale-95 text-lg ${isCorrect ? 'bg-[#58a700] hover:bg-[#4d9200]' : 'bg-[#ea2b2b] hover:bg-[#d12424]'}`}
          >
            Tiếp
          </button>
        </div>
      )}
    </div>
  );
};
