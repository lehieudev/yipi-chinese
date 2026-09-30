import React from 'react';
import { 
  X, 
  Award, 
  Volume2, 
  Bookmark, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  RotateCcw,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export interface FluencyReport {
  fluencyScore: number;
  pronunciationScore: number;
  dialogueTurns: number;
  studyDuration: string;
  vocabMastered: Array<{ hanzi: string; pinyin: string; meaning: string }>;
  grammarPoints: string[];
  strengths: string[];
  improvements: string[];
  tutorBadge: string;
  tutorComment: string;
}

interface TenminFluencyModalProps {
  report: FluencyReport | null;
  isLoading: boolean;
  onClose: () => void;
  onRestartSession: () => void;
  onSpeak: (text: string) => void;
  onSaveVocab: (vocab: { hanzi: string; pinyin: string; meaning: string }) => void;
  savedVocabList: string[];
}

export const TenminFluencyModal: React.FC<TenminFluencyModalProps> = ({
  report,
  isLoading,
  onClose,
  onRestartSession,
  onSpeak,
  onSaveVocab,
  savedVocabList
}) => {
  if (!report && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-gray-100 flex flex-col gap-5 my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C45827] to-[#A3431A] text-white flex items-center justify-center text-xl shadow-xs">
              <Award className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#4A190F] flex items-center gap-2">
                <span>Báo Cáo Phản Xạ Tenmin 10 Phút</span>
                <span className="text-[10px] font-extrabold text-[#C45827] bg-[#C45827]/10 px-2 py-0.5 rounded-full">
                  Hoàn Thành
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                Tổng kết độ lưu loát và từ vựng tích lũy sau 10 phút tập trung cao độ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 border-4 border-[#C45827] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-[#4A190F]">Gia sư AI đang tổng hợp báo cáo 10 phút của bạn...</p>
            <p className="text-xs text-gray-500">Đang phân tích độ lưu loát, lỗi ngữ pháp và từ vựng mới.</p>
          </div>
        ) : report ? (
          <>
            {/* Score & Badge Highlight Banner */}
            <div className="bg-gradient-to-br from-[#FAF2EC] via-[#FCEEE3] to-[#F5E6DC] p-5 rounded-3xl border border-[#C45827]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Circular Score Badge */}
                <div className="relative w-20 h-20 rounded-full bg-white border-4 border-[#C45827] flex flex-col items-center justify-center shadow-xs shrink-0">
                  <span className="text-2xl font-black text-[#C45827]">{report.fluencyScore}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Lưu loát</span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#C45827] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Huy hiệu phiên học:
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-[#4A190F]">
                    {report.tutorBadge}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    Thời lượng: <span className="font-semibold text-gray-900">{report.studyDuration}</span> •{' '}
                    <span className="font-semibold text-gray-900">{report.dialogueTurns} lượt đàm thoại</span>
                  </div>
                </div>
              </div>

              {/* Pronunciation score */}
              <div className="bg-white/80 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/60 text-center shadow-xs self-stretch sm:self-auto">
                <div className="text-[10px] text-gray-500 uppercase font-semibold">Phát âm chuẩn</div>
                <div className="text-xl font-bold text-emerald-600">{report.pronunciationScore}/100</div>
              </div>
            </div>

            {/* Tutor Personal Message */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-[#4A190F] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#C45827]" />
                Lời dặn dò từ Gia sư:
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "{report.tutorComment}"
              </p>
            </div>

            {/* Vocab Mastered in this Session */}
            {report.vocabMastered && report.vocabMastered.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Từ vựng then chốt đã lĩnh hội ({report.vocabMastered.length} từ):</span>
                  <span className="text-[11px] text-[#C45827] font-semibold">Bấm để nghe & lưu vào Sổ từ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {report.vocabMastered.map((v, idx) => {
                    const isSaved = savedVocabList.includes(v.hanzi);
                    return (
                      <div
                        key={idx}
                        className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs"
                      >
                        <div className="overflow-hidden">
                          <span className="font-bold text-base text-[#4A190F] mr-1.5">{v.hanzi}</span>
                          <span className="text-gray-500 font-mono text-[11px]">({v.pinyin})</span>
                          <div className="text-[11px] text-gray-600 truncate">{v.meaning}</div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => onSpeak(v.hanzi)}
                            className="p-1.5 text-gray-500 hover:text-[#C45827] bg-white rounded-lg border border-gray-200 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onSaveVocab(v)}
                            className="p-1.5 text-gray-500 hover:text-[#C45827] bg-white rounded-lg border border-gray-200 cursor-pointer"
                            title="Lưu từ vào sổ"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-[#C45827] fill-[#C45827]' : ''}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grammar Points Conquered */}
            {report.grammarPoints && report.grammarPoints.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Điểm ngữ pháp & phản xạ đã rèn luyện:
                </div>
                <div className="space-y-1">
                  {report.grammarPoints.map((gp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{gp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths and Next Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Điểm mạnh hôm nay:
                </span>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                  {report.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Mục tiêu cải thiện ngày mai:
                </span>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                  {report.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tiếp tục trò chuyện
              </button>

              <button
                onClick={() => {
                  onRestartSession();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#C45827] hover:bg-[#A3431A] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Bắt đầu phiên 10 phút mới</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
