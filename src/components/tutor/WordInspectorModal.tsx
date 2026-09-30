import React from 'react';
import { X, Volume2, Bookmark, Check, Sparkles } from 'lucide-react';

export interface InspectedWord {
  hanzi: string;
  pinyin?: string;
  meaning?: string;
  hanViet?: string;
}

interface WordInspectorModalProps {
  word: InspectedWord | null;
  onClose: () => void;
  onSpeak: (text: string) => void;
  onSaveVocab: (vocab: { hanzi: string; pinyin: string; meaning: string }) => void;
  isSaved: boolean;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({
  word,
  onClose,
  onSpeak,
  onSaveVocab,
  isSaved
}) => {
  if (!word) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C45827] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Tra từ nhanh Tenmin
          </span>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Word Display Card */}
        <div className="bg-gradient-to-br from-[#FAF2EC] to-[#F5E6DC] p-5 rounded-2xl border border-[#C45827]/15 text-center flex flex-col items-center justify-center">
          <div className="text-4xl sm:text-5xl font-bold font-serif text-[#4A190F] tracking-wide mb-1">
            {word.hanzi}
          </div>
          {word.pinyin && (
            <div className="text-base font-mono font-bold text-[#C45827]">
              {word.pinyin}
            </div>
          )}
          {word.hanViet && (
            <div className="text-xs text-gray-500 mt-0.5">
              Hán Việt: <span className="font-semibold text-gray-700">{word.hanViet}</span>
            </div>
          )}
        </div>

        {/* Meaning */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
          <span className="font-semibold text-gray-500 uppercase text-[10px] block mb-0.5">Ý nghĩa tiếng Việt:</span>
          <div className="text-sm font-bold text-gray-800">
            {word.meaning || 'Từ vựng tiếng Trung giao tiếp thông dụng'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSpeak(word.hanzi)}
            className="py-2.5 px-3 bg-orange-100 hover:bg-orange-200 text-[#C45827] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Phát âm</span>
          </button>

          <button
            onClick={() => {
              onSaveVocab({
                hanzi: word.hanzi,
                pinyin: word.pinyin || '',
                meaning: word.meaning || 'Từ vựng giao tiếp'
              });
            }}
            className={`py-2.5 px-3 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C45827] hover:bg-[#A3431A] text-white shadow-xs'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã trong sổ</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Lưu vào sổ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
