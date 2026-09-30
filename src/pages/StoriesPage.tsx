import React, { useState } from 'react';
import { BookOpen, Bookmark, ChevronRight, Filter } from 'lucide-react';

export const StoriesPage = () => {
  const [activeLevel, setActiveLevel] = useState('hsk1');
  const [activeCategory, setActiveCategory] = useState('all');

  const levels = [
    { id: 'hsk1', label: 'HSK 1', count: 62 },
    { id: 'hsk2', label: 'HSK 2', count: 18 },
    { id: 'hsk3', label: 'HSK 3', count: 10 },
    { id: 'hsk4', label: 'HSK 4', count: 12 },
    { id: 'hsk5', label: 'HSK 5', count: 5 },
    { id: 'hsk6', label: 'HSK 6', count: 0 },
    { id: 'hsk7-9', label: 'HSK 7-9', count: 0 },
  ];

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'co-tich', label: 'Truyện cổ tích' },
    { id: 'tinh-cam', label: 'Tình cảm' },
    { id: 'truyen-cuoi', label: 'Truyện cười' },
    { id: 'ngu-ngon', label: 'Ngụ ngôn' },
    { id: 'thanh-ngu', label: 'Thành ngữ' },
    { id: 'kinh-di', label: 'Kinh dị' },
    { id: 'xa-hoi', label: 'Xã hội' },
    { id: 'tho', label: 'Thơ' },
  ];

  const stories = [
    {
      id: 1,
      level: 'hsk1',
      tags: ['Tình cảm', 'HSK 1'],
      title: 'Mèo hoa và lợn con kết bạn',
      desc: 'Một buổi sáng trong lành, ở nhà kia có nuôi một chú lợn con, lợn con đang ăn cơm, ăn xong chóp chép miệng ngẩng đầu lên thì thấy một con mèo hoa. Nhìn thấy lợn con, mèo hoa sợ...',
      likes: 212,
      saved: true
    },
    {
      id: 2,
      level: 'hsk1',
      tags: ['Cổ tích', 'HSK 1'],
      title: 'Cô bé quàng khăn đỏ',
      desc: 'Ngày xửa ngày xưa, ở một ngôi làng kia có một cô bé rất đáng yêu. Cô bé luôn quàng một chiếc khăn màu đỏ nên mọi người đều gọi cô là cô bé quàng khăn đỏ...',
      likes: 185,
      saved: false
    },
    {
      id: 3,
      level: 'hsk1',
      tags: ['Cổ tích', 'HSK 1'],
      title: 'Vịt con xấu xí',
      desc: 'Mùa xuân đến, vịt mẹ ấp nở ra một bầy vịt con đáng yêu. Nhưng trong đàn có một chú vịt trông rất khác biệt, lông xám xịt và to lớn...',
      likes: 150,
      saved: false
    },
    {
      id: 4,
      level: 'hsk1',
      tags: ['Truyện cười', 'HSK 1'],
      title: 'Rùa và thỏ',
      desc: 'Một ngày nọ, rùa và thỏ cãi nhau xem ai chạy nhanh hơn. Chúng quyết định tổ chức một cuộc thi chạy để phân thắng bại...',
      likes: 320,
      saved: true
    }
  ];

  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#C45827] text-sm font-bold uppercase tracking-wider">Truyện song ngữ</span>
              </div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Học như đọc một câu chuyện</h1>
              <p className="text-[#682315]/60 text-sm">
                Đọc truyện song ngữ giúp bạn vừa giải trí, vừa tiếp thu từ vựng và ngữ pháp một cách tự nhiên.
              </p>
            </div>
          </div>

          <div className="flex gap-6 min-w-[200px]">
             <div className="text-center">
               <div className="text-2xl font-bold text-[#4A190F]">107</div>
               <div className="text-xs text-gray-500">Truyện ngắn</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-[#C45827]">25</div>
               <div className="text-xs text-gray-500">Đã đọc</div>
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5 sticky top-24">
               <h2 className="text-lg font-bold text-[#4A190F] mb-4">Cấp độ</h2>
               <div className="space-y-2">
                 {levels.map((level) => (
                   <button
                     key={level.id}
                     onClick={() => setActiveLevel(level.id)}
                     className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                       activeLevel === level.id
                         ? 'bg-[#C45827]/10 text-[#C45827]'
                         : 'text-gray-600 hover:bg-gray-50'
                     }`}
                   >
                     <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                         activeLevel === level.id ? 'bg-[#C45827] text-white' : 'bg-gray-100 text-gray-500'
                       }`}>
                         {level.id.replace('hsk', '')}
                       </div>
                       <span>{level.label}</span>
                     </div>
                     <span className={`text-xs ${activeLevel === level.id ? 'text-[#C45827] font-bold' : 'text-gray-400'}`}>
                       {level.count}
                     </span>
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Filter */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#4A190F]/5 flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Filter className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-gray-800 text-white font-medium'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#4A190F] font-oriental mb-4">
                Truyện {levels.find(l => l.id === activeLevel)?.label}
              </h2>
              
              {stories.filter(s => s.level === activeLevel).map((story) => (
                <div key={story.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {story.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-[#4A190F] group-hover:text-[#C45827] transition-colors">{story.title}</h3>
                    </div>
                    <button className={`p-2 rounded-full transition-colors ${story.saved ? 'bg-[#C45827]/10 text-[#C45827]' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}>
                      <Bookmark className="w-5 h-5" fill={story.saved ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {story.desc}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5" />
                      {story.likes} người lưu
                    </span>
                    <button className="text-sm font-bold text-[#C45827] flex items-center gap-1 hover:gap-2 transition-all">
                      Đọc truyện <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
