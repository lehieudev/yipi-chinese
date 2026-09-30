import React from 'react';
import { BookOpen, Search, Plus } from 'lucide-react';

export const NotebookPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full mb-4 border border-orange-200">
          <BookOpen className="w-3.5 h-3.5" />
          SỔ TAY
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Sổ tay từ vựng</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed mb-4">
          0/100 từ đã lưu — thêm ghi chú, thẻ phân loại và ôn lại bất cứ lúc nào.
        </p>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#C45827] w-0"></div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="bg-orange-50/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-orange-100">
        <p className="text-sm text-gray-700">
          Gói miễn phí lưu được 100 từ. Nâng cấp Premium để mở rộng sổ tay lên 4000 từ.
        </p>
        <button className="shrink-0 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm whitespace-nowrap hover:from-orange-500 hover:to-orange-600">
          NÂNG CẤP PREMIUM
        </button>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm Hán tự, pinyin, nghĩa hoặc ghi chú..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827] outline-none text-sm shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 shadow-sm whitespace-nowrap">
          <Plus className="w-4 h-4" />
          THÊM TỪ
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-gray-50 rounded-[24px] p-8 sm:p-12 flex flex-col items-center text-center mt-4 border border-gray-100 border-dashed">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 mb-4 shadow-sm">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">Sổ tay còn trống</h3>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          Trong bài học hoặc từ điển, bấm ngôi sao bên cạnh một từ để lưu vào sổ tay — hoặc tự nhập từ bạn gặp ngoài đời.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button className="w-full bg-[#D92D20] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#B91C1C] transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            TỰ NHẬP TỪ ĐẦU TIÊN
          </button>
          <button className="w-full bg-white text-gray-700 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 border border-gray-200 transition-colors">
            Vào học bài
          </button>
        </div>
      </div>

    </div>
  );
};
