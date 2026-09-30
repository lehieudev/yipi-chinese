import React, { useState } from 'react';
import { FileText, Search, Bookmark, Clock, Eye, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const ArticlesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Mới nhất' },
    { id: 'meo-hoc', label: 'Mẹo học tiếng Trung' },
    { id: 'kinh-nghiem', label: 'Kinh nghiệm thi HSK' },
    { id: 'van-hoa', label: 'Văn hóa Trung Quốc' },
    { id: 'tu-vung', label: 'Từ vựng & Ngữ pháp' },
  ];

  const articles = [
    {
      id: 1,
      title: 'HSKK cao cấp: 5 bài mẫu giới thiệu bản thân kèm pinyin',
      desc: 'Giới thiệu bản thân là phần thi bắt buộc trong kỳ thi HSKK mọi cấp độ. Nếu bạn đang chuẩn bị cho kỳ thi HSKK cao cấp, hãy tham khảo ngay 5 bài mẫu giới thiệu bản thân ăn điểm...',
      category: 'Kinh nghiệm thi HSK',
      tag: 'HOT',
      author: 'Yipi Admin',
      date: '20 Thg 8, 2024',
      views: '12k',
      comments: 45
    },
    {
      id: 2,
      title: 'Phân biệt 4 cặp từ đồng nghĩa dễ nhầm lẫn trong HSK 3',
      desc: 'Trong tiếng Trung có rất nhiều cặp từ đồng nghĩa khiến người học đau đầu. Bài viết này sẽ giúp bạn phân biệt rõ ràng cách sử dụng 4 cặp từ thường gặp nhất...',
      category: 'Từ vựng & Ngữ pháp',
      tag: 'NEW',
      author: 'Cô giáo Linh',
      date: '18 Thg 8, 2024',
      views: '5.2k',
      comments: 12
    },
    {
      id: 3,
      title: 'Lộ trình tự học HSK 1-4 tại nhà cho người mất gốc',
      desc: 'Học tiếng Trung không khó nếu bạn có một lộ trình đúng đắn. Yipi xin chia sẻ lộ trình tự học từ con số 0 đến HSK 4 chỉ trong 6 tháng...',
      category: 'Mẹo học tiếng Trung',
      tag: 'Hữu ích',
      author: 'Minh Tuấn',
      date: '15 Thg 8, 2024',
      views: '8.9k',
      comments: 34
    },
    {
      id: 4,
      title: 'Tìm hiểu về văn hóa trà đạo Trung Hoa',
      desc: 'Trà không chỉ là một thức uống mà còn là một nét văn hóa đặc sắc của người Trung Quốc. Hãy cùng tìm hiểu về lịch sử và cách thưởng trà...',
      category: 'Văn hóa Trung Quốc',
      author: 'Lan Anh',
      date: '10 Thg 8, 2024',
      views: '3.1k',
      comments: 8
    }
  ];

  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <FileText className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#C45827] text-sm font-bold uppercase tracking-wider">Blog</span>
              </div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Mẹo & phương pháp học tiếng Trung</h1>
              <p className="text-[#682315]/60 text-sm">
                Cập nhật liên tục các mẹo học, kinh nghiệm thi cử, từ vựng ngữ pháp, và văn hóa Trung Hoa.
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-64 shrink-0">
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C45827]/20 focus:border-[#C45827]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
             <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#4A190F] text-white font-bold shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl bg-[#C45827]/10 flex items-center justify-center relative overflow-hidden">
             <div className="text-6xl font-serif text-[#C45827] opacity-20">说</div>
             <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full">HOT</span>
             </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C45827] uppercase tracking-wider mb-2">
              <span>{articles[0].category}</span>
              <span>•</span>
              <span className="text-gray-400 font-medium">{articles[0].date}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#4A190F] mb-4 leading-snug hover:text-[#C45827] cursor-pointer transition-colors">
              {articles[0].title}
            </h2>
            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
              {articles[0].desc}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="font-medium text-gray-800">{articles[0].author}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {articles[0].views}</span>
              <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {articles[0].comments}</span>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          <h3 className="text-lg font-bold text-[#4A190F] mb-6">Tất cả bài viết</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-2xl p-6 shadow-sm border border-[#4A190F]/5 hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#C45827] uppercase tracking-wider bg-[#C45827]/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  {article.tag && (
                    <span className="text-[10px] font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full">
                      {article.tag}
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-[#4A190F] mb-3 group-hover:text-[#C45827] transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1">
                  {article.desc}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
