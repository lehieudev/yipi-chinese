import React from 'react';
import { Volume2, ChevronDown } from 'lucide-react';

export const SyllablesPage = () => {
  const syllables = ['ba', 'bai', 'ban', 'bang', 'bao', 'bei', 'ben', 'beng', 'bi', 'bian', 'biao', 'bie', 'bin', 'bing', 'bo', 'bu', 'ca', 'cai', 'can', 'cang', 'cao', 'ce', 'cen', 'ceng', 'cha', 'chai', 'chan', 'chang', 'chao', 'che', 'chen', 'cheng', 'chi'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-4 border border-red-100">
          <Volume2 className="w-3.5 h-3.5" />
          ÂM TIẾT · 音节
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Bảng âm tiết HSK 3.0 theo cấp</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed mb-6">
          1.082 âm tiết (có dấu thanh) của khung HSK 3.0, xếp theo bậc mà âm tiết xuất hiện lần đầu — một trong 4 trục định lượng của chuẩn.
        </p>
      </div>

      <div className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5 flex gap-3">
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm whitespace-nowrap">
          HSK 1 <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div>
        <div className="text-sm font-bold text-gray-500 mb-4">+266 âm tiết mới</div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {syllables.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex items-center justify-between hover:border-red-200 transition-colors cursor-pointer group">
              <span className="font-bold text-gray-900">{item}</span>
              <Volume2 className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
