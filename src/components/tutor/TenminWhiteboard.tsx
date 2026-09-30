import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Volume2, 
  Layers,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

export interface GrammarBlock {
  role: string;
  text: string;
  color: string;
}

export interface RadicalInfo {
  char: string;
  pinyin?: string;
  radical: string;
  meaning: string;
  story: string;
}

export interface ToneItem {
  char: string;
  tone: number;
  contour: string;
  desc: string;
}

export interface ToneGuideInfo {
  word: string;
  pinyin: string;
  tones: ToneItem[];
}

export interface MiniQuizInfo {
  question: string;
  options: string[];
  correctIndex: number;
  hint?: string;
}

export interface WhiteboardData {
  type: string;
  title: string;
  summary: string;
  grammarBlocks?: GrammarBlock[];
  radical?: RadicalInfo;
  toneGuide?: ToneGuideInfo;
  miniQuiz?: MiniQuizInfo;
}

interface TenminWhiteboardProps {
  data: WhiteboardData | null;
  onSpeak: (text: string) => void;
  onSaveVocab?: (word: { hanzi: string; pinyin: string; meaning: string }) => void;
}

export const TenminWhiteboard: React.FC<TenminWhiteboardProps> = ({
  data,
  onSpeak
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz'>('notes');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  // Reset quiz state when new data comes
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setQuizAnswered(false);
  }, [data]);

  // Color mapping helper for grammar blocks
  const getBadgeStyle = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'purple':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      case 'amber':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'rose':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      case 'blue':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#4A190F]/15 shadow-sm overflow-hidden flex flex-col h-full min-h-[480px]">
      {/* Whiteboard Header */}
      <div className="bg-gradient-to-r from-[#FAF2EC] to-[#F5E6DC] p-3 sm:p-4 border-b border-[#4A190F]/10 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#C45827] text-white flex items-center justify-center text-sm shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#4A190F] flex items-center gap-1.5">
              <span>Bảng Trắng Gia Sư Tenmin</span>
              <span className="text-[10px] font-semibold text-[#C45827] bg-[#C45827]/10 px-2 py-0.2 rounded-md">
                Trực quan hóa thời gian thực
              </span>
            </h3>
            <p className="text-[11px] text-gray-500 line-clamp-1">
              {data?.title || 'Phân tích cấu trúc câu & giải mã chữ Hán'}
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-white/90 p-1 rounded-xl border border-[#4A190F]/10 text-xs">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-[#C45827] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#4A190F]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Giảng bài AI</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#C45827] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#4A190F]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Thử thách</span>
            {data?.miniQuiz && !quizAnswered && (
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col overflow-y-auto">
        {/* TAB 1: AI LESSON NOTES & VISUAL DIAGRAMS */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Summary Banner */}
            <div className="bg-[#FAF2EC]/80 border border-[#C45827]/20 rounded-2xl p-3 sm:p-4">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-[#C45827] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#4A190F]">
                    {data?.title || 'Điểm ngữ pháp then chốt'}
                  </div>
                  <div className="text-xs text-gray-700 mt-1 leading-relaxed">
                    {data?.summary || 'Tập trung vào trật tự từ: Ai làm gì, ở đâu, khi nào trong câu tiếng Trung.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Grammar Blocks Diagram */}
            {data?.grammarBlocks && data.grammarBlocks.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C45827]" />
                    Sơ đồ cấu trúc câu trực quan
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">Trật tự từ chuẩn bản xứ</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {data.grammarBlocks.map((block, idx) => (
                    <React.Fragment key={idx}>
                      <div className={`p-2.5 rounded-xl border flex flex-col items-center min-w-[70px] ${getBadgeStyle(block.color)}`}>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">{block.role}</span>
                        <span className="text-base font-bold mt-0.5">{block.text}</span>
                      </div>
                      {idx < data.grammarBlocks!.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Radical & Hanzi Anatomy */}
            {data?.radical && (
              <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-2xl border border-amber-200/70 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#4A190F] flex items-center gap-1.5">
                    <span className="text-lg">🏮</span>
                    Giải phẫu chữ Hán & Bộ thủ
                  </span>
                  <button
                    onClick={() => onSpeak(data.radical!.char)}
                    className="p-1.5 bg-white text-[#C45827] rounded-lg hover:bg-orange-50 transition-colors cursor-pointer shadow-xs"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-300 flex items-center justify-center text-3xl font-bold text-[#4A190F] shadow-xs shrink-0 font-serif">
                    {data.radical.char}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-gray-900">
                      Bộ thủ: <span className="text-[#C45827] font-semibold">{data.radical.radical}</span>
                      {data.radical.pinyin && <span className="text-gray-500 font-mono ml-2">({data.radical.pinyin})</span>}
                    </div>
                    <div className="text-gray-700">
                      Ý nghĩa: <span className="font-medium text-gray-900">{data.radical.meaning}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 italic bg-white/70 p-2 rounded-xl border border-amber-200/50 mt-1">
                      💡 {data.radical.story}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tone Pitch Wave Guide */}
            {data?.toneGuide && (
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Hướng dẫn cao độ thanh điệu (Tone Pitch Curve)
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{data.toneGuide.pinyin}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.toneGuide.tones.map((t, idx) => (
                    <div key={idx} className="p-3 bg-gray-50/80 rounded-xl border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#4A190F] text-amber-100 font-serif text-lg font-bold flex items-center justify-center">
                          {t.char}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-gray-900">
                            Thanh {t.tone} <span className="text-[10px] text-gray-400 font-mono">({t.contour})</span>
                          </div>
                          <div className="text-[10px] text-gray-600 line-clamp-1">{t.desc}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSpeak(t.char)}
                        className="p-1.5 text-gray-500 hover:text-[#C45827] bg-white rounded-lg border border-gray-200 cursor-pointer"
                        title="Nghe mẫu"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INTERACTIVE MINI QUIZ */}
        {activeTab === 'quiz' && (
          <div className="flex-1 flex flex-col justify-center">
            {data?.miniQuiz ? (
              <div className="bg-[#FAF2EC]/80 border border-[#C45827]/20 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C45827] text-white flex items-center justify-center text-xs font-bold">
                    ?
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C45827]">
                    Thử tài phản xạ ngay trên bảng:
                  </span>
                </div>

                <div className="text-base font-bold text-[#4A190F]">
                  {data.miniQuiz.question}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {data.miniQuiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === data.miniQuiz!.correctIndex;
                    let style = 'bg-white hover:bg-orange-50/60 border-gray-200 text-gray-800';

                    if (quizAnswered) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-50 border-rose-300 text-rose-900';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedQuizAnswer(idx);
                          setQuizAnswered(true);
                        }}
                        className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <span>{opt}</span>
                        {quizAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Hint & Explanation */}
                {quizAnswered && (
                  <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 animate-in fade-in">
                    <span className="font-bold text-[#C45827]">Giải thích: </span>
                    {data.miniQuiz.hint || 'Bạn đã hoàn thành câu hỏi thử tài này!'}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-8 text-gray-400 space-y-2">
                <HelpCircle className="w-10 h-10 mx-auto text-gray-300" />
                <p className="text-xs">Gia sư sẽ tạo thử thách trắc nghiệm khi cuộc hội thoại tiến triển.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
