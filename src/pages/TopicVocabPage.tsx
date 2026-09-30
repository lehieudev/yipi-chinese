import React, { useState } from 'react';
import { BookA, Search, ChevronDown, ListFilter, ChevronRight } from 'lucide-react';

export const TopicVocabPage = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const filters = ['Tất cả', 'HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7-9'];

  const topics = [
    { icon: '☕', name: 'Đời sống', count: 2857, examples: '吧 · 白 · 白天 · 班', levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
    { icon: '👥', name: 'Xã hội', count: 1881, examples: '帮 · 工人 · 见面 · 女朋友', levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
    { icon: '😊', name: 'Cảm xúc', count: 1159, examples: '爱 · 高兴 · 觉得 · 快', levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
    { icon: '🏛️', name: 'Văn hoá', count: 922, examples: '包子 · 新年 · 吹 · 春节', levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
    { icon: '💼', name: 'Công việc', count: 826, examples: '班 · 放假 · 工人 · 工作', levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
    { icon: '💰', name: 'Kinh tế', count: 696, examples: '商人 · 占 · 住房 · 采取', levels: ['HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
    { icon: '🔬', name: 'Khoa học', count: 607, examples: '地球 · 科学 · 温度 · 音节', levels: ['HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7'] },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-4 border border-red-100">
          <BookA className="w-3.5 h-3.5" />
          TỪ VỰNG
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Từ vựng theo chủ đề</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed">
          Học vốn từ thực dụng theo nhóm nghĩa — ẩm thực, du lịch, công việc, sức khỏe — gom toàn bộ HSK 1-9, kèm pinyin và audio bản ngữ.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Chủ đề</div>
          <div className="font-bold text-gray-900">178</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Lượt từ</div>
          <div className="font-bold text-gray-900">18.842</div>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Audio bản ngữ</div>
          <div className="font-bold text-gray-900">Có</div>
        </div>
        <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-3 rounded-xl text-sm font-bold transition-colors">
          KHÁM PHÁ CHỦ ĐỀ
        </button>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5">
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm chủ đề... (ẩm thực, du lịch, công việc)" 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827] outline-none text-sm shadow-sm"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
            <ListFilter className="w-4 h-4" /> Nhiều từ
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
            A-Z
          </button>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter 
                  ? 'bg-[#C45827] text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div>
        <div className="text-sm font-bold text-gray-500 mb-4">178 chủ đề</div>
        
        <div className="space-y-3">
          {topics.map((topic, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex items-center justify-between hover:border-red-200 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{topic.name}</h3>
                  <div className="text-xs font-medium text-gray-500 mb-2">{topic.count} từ</div>
                  <div className="text-sm text-gray-600 mb-3">{topic.examples}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.levels.map((level, lIdx) => (
                      <span key={lIdx} className="text-[10px] font-bold px-1.5 py-0.5 rounded text-gray-500 bg-gray-100 border border-gray-200">
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
