import React from 'react';
import { Layers } from 'lucide-react';

export const RadicalsPage = () => {
  const radicals = [
    { char: '人', name: 'Nhân', pinyin: 'rén', meaning: 'Người', count: 126, wordCount: 1091 },
    { char: '儿', name: 'Nhi', pinyin: 'ér', meaning: 'Trẻ con, hai chân người', count: 15, wordCount: 177 },
    { char: '力', name: 'Lực', pinyin: 'lì', meaning: 'Sức mạnh', count: 23, wordCount: 301 },
    { char: '卩', name: 'Tiết', pinyin: 'jié', meaning: 'Người quỳ, dấu triện', count: 8, wordCount: 44 },
    { char: '又', name: 'Hựu', pinyin: 'yòu', meaning: 'Lại, bàn tay phải', count: 14, wordCount: 223 },
    { char: '口', name: 'Khẩu', pinyin: 'kǒu', meaning: 'Miệng', count: 139, wordCount: 841 },
    { char: '大', name: 'Đại', pinyin: 'dà', meaning: 'Lớn, to', count: 23, wordCount: 365 },
    { char: '女', name: 'Nữ', pinyin: 'nǚ', meaning: 'Nữ, phụ nữ', count: 53, wordCount: 222 },
  ];

  const filters = [
    { name: 'Con người', count: 43 },
    { name: 'Thiên nhiên', count: 29 },
    { name: 'Động vật', count: 19 },
    { name: 'Hành động', count: 25 },
    { name: 'Phương hướng & Địa điểm', count: 10 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-4 border border-red-100">
          <Layers className="w-3.5 h-3.5" />
          BỘ THỦ KHANG HY
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Học từ vựng theo 214 Bộ thủ Khang Hy</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed mb-6">
          Các chữ Hán có chung bộ thủ có cùng nhóm nghĩa. Nắm bộ thủ, bạn nhớ chữ theo NHÓM thay vì từng chữ rời — và đoán được nghĩa chữ mới mà không cần tra.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Bộ thủ</div>
            <div className="font-bold text-gray-900">214/214</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Chữ Hán</div>
            <div className="font-bold text-gray-900">3.001</div>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Từ vựng</div>
            <div className="font-bold text-gray-900">1.091</div>
          </div>
          
          <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-3 rounded-xl text-sm font-bold transition-colors">
            CHỌN BỘ THỦ ĐỂ HỌC
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 leading-relaxed mb-4">
        Bộ thủ là 'gen' của Hán tự. Hệ thống Khang Hy có 214 bộ thủ, nhưng bạn không cần học hết: Hanbeego chọn 214 bộ thông dụng nhất — đủ phủ hơn 90% chữ Hán trong khung HSK — và mỗi bộ có trang riêng kèm bảng chữ chứa bộ, từ vựng, mẹo nhớ và thể ghi nhớ.
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              idx === 0 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filter.name} <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${idx === 0 ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>{filter.count}</span>
          </button>
        ))}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-4">Bộ thủ liên quan đến cơ thể, bộ phận và hành động của người.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {radicals.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col items-center text-center hover:border-red-200 hover:shadow-md transition-all cursor-pointer">
              <div className="text-4xl font-oriental text-red-600 mb-2">{item.char}</div>
              <div className="font-bold text-gray-900 mb-1">{item.name} <span className="text-gray-400 font-normal">· {item.pinyin}</span></div>
              <div className="text-sm text-gray-600 mb-3">{item.meaning}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.count} chữ · {item.wordCount} từ</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
