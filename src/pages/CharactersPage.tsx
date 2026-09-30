import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';
import React from 'react';
import { PenTool, Search, Volume2, ChevronDown, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { speak } from '@/lib/tts';

export const CharactersPage = () => {
  const [activeChar, setActiveChar] = React.useState<number | null>(null);
  const characters = [
    { char: '爱', pinyin: 'ài', meaning: 'yêu; thích' },
    { char: '八', pinyin: 'bā', meaning: 'số tám' },
    { char: '爸', pinyin: 'bà', meaning: 'bố; cha' },
    { char: '吧', pinyin: 'ba', meaning: 'quán bar; (từ tượng thanh)' },
    { char: '白', pinyin: 'bái', meaning: 'trắng; sạch sẽ, tinh khiết' },
    { char: '百', pinyin: 'bǎi', meaning: 'trăm' },
    { char: '班', pinyin: 'bān', meaning: 'lớp (học); ca (làm việc)' },
    { char: '半', pinyin: 'bàn', meaning: 'một nửa, phân nửa' },
    { char: '帮', pinyin: 'bāng', meaning: 'giúp đỡ, giúp; hỗ trợ' },
    { char: '包', pinyin: 'bāo', meaning: 'gói, bọc; cái túi, cái bao' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-4 border border-green-200">
          <PenTool className="w-3.5 h-3.5" />
          CHỮ HÁN ĐƠN · 单字
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Bảng chữ Hán HSK 3.0 theo cấp</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed mb-6">
          2.999 chữ Hán đơn của khung HSK 3.0 (9 bậc), phân theo cấp từ HSK 1 đến HSK 7-9. Mỗi chữ có pinyin, nghĩa, một từ ví dụ và phát âm chuẩn.
        </p>
        <p className="text-sm text-gray-700">Mỗi chữ Hán đều thuộc một bộ thủ. <span className="font-bold text-red-600 underline cursor-pointer">Học từ vựng theo bộ thủ</span></p>
      </div>

      <div className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5 flex gap-3">
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm whitespace-nowrap">
          HSK 1 <ChevronDown className="w-4 h-4" />
        </button>
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm trong 300 chữ HSK 1..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827] outline-none text-sm shadow-sm"
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-bold text-gray-500 mb-4">300 chữ</div>
        
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden divide-y divide-gray-100">
          {characters.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setActiveChar(idx)}>
              <div className="text-4xl font-oriental text-red-600 shrink-0 w-12 text-center">{item.char}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900">{item.pinyin}</span>
                  <Volume2 onClick={(e) => { e.stopPropagation(); speak(item.char); }} className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                </div>
                <div className="text-sm text-gray-600">{item.meaning}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    

      {/* Detail Modal / Flashcard */}
      {activeChar !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A0F08]/80 backdrop-blur-sm animate-stagger">
          <div className="bg-white rounded-[32px] overflow-hidden max-w-sm w-full shadow-2xl relative flex flex-col">
            <button
              onClick={() => setActiveChar(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 pb-4 flex flex-col items-center text-center mt-4">
              <div className="text-[120px] leading-none font-oriental text-[#C45827] mb-2 drop-shadow-sm">
                {characters[activeChar].char}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-900">{characters[activeChar].pinyin}</span>
                <button 
                  onClick={() => speak(characters[activeChar].char)}
                  className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <div className="text-lg text-gray-600 mb-8 border-t border-gray-100 w-full pt-6">
                {characters[activeChar].meaning}
              </div>
            </div>

            <div className="flex border-t border-gray-100 divide-x divide-gray-100 bg-gray-50">
              <button 
                onClick={() => setActiveChar(prev => prev! > 0 ? prev! - 1 : characters.length - 1)}
                className="flex-1 py-4 flex justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveChar(prev => prev! < characters.length - 1 ? prev! + 1 : 0)}
                className="flex-1 py-4 flex justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      <BeginnerRoadmap />
    </div>
  );
};
