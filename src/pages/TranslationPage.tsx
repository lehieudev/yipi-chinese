import React from 'react';
import { Languages, ChevronRight } from 'lucide-react';

export const TranslationPage = () => {
  const hsk1List = [
    { title: 'Gia đình', count: 6, time: 7 },
    { title: 'Chào hỏi & làm quen', count: 6, time: 7 },
    { title: 'Ăn uống', count: 6, time: 7 },
    { title: 'Thời gian & ngày tháng', count: 6, time: 7 },
    { title: 'Học tập & trường lớp', count: 6, time: 7 },
    { title: 'Mua sắm', count: 6, time: 7 },
    { title: 'Sở thích & giải trí', count: 6, time: 7 },
    { title: 'Nhà cửa & đồ vật', count: 6, time: 7 },
    { title: 'Đi lại & phương tiện', count: 6, time: 7 },
    { title: 'Thời tiết & sức khỏe', count: 6, time: 7 },
  ];

  const hsk2List = [
    { title: 'Công việc & văn phòng', count: 6, time: 7 },
    { title: 'Mua sắm', count: 6, time: 7 },
    { title: 'Sức khỏe', count: 6, time: 7 },
    { title: 'Thời tiết & bốn mùa', count: 6, time: 7 },
    { title: 'Ăn uống & nhà hàng', count: 6, time: 7 },
    { title: 'Sở thích & thể thao', count: 6, time: 7 },
    { title: 'Du lịch & phương tiện', count: 6, time: 7 },
    { title: 'Cảm xúc & bạn bè', count: 6, time: 7 },
    { title: 'Học tập', count: 6, time: 7 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4 border border-blue-100">
          <Languages className="w-3.5 h-3.5" />
          KỸ NĂNG NHẬN DỊCH
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Luyện dịch Trung-Việt & Việt-Trung (HSK 3.0)</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed">
          160 bài luyện dịch theo chủ đề, từ HSK 1 đến HSK 7-9 — kỹ năng Dịch (翻译) đặc trưng của khung 9 bậc. Mỗi bài luyện được cả hai chiều: Trung → Việt và Việt → Trung, kèm pinyin, audio và bản dịch tham khảo.
        </p>
      </div>

      {/* Lists */}
      <div className="flex flex-col gap-8">
        
        {/* HSK 1 */}
        <div>
          <h2 className="font-bold text-lg text-gray-900 mb-4 px-1">HSK 1</h2>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden divide-y divide-gray-100">
            {hsk1List.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <div className="text-xs text-gray-500 font-medium">{item.count} câu - {item.time} phút</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* HSK 2 */}
        <div>
          <h2 className="font-bold text-lg text-gray-900 mb-4 px-1">HSK 2</h2>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden divide-y divide-gray-100">
            {hsk2List.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <div className="text-xs text-gray-500 font-medium">{item.count} câu - {item.time} phút</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
