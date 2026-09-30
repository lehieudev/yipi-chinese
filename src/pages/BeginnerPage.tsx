import React from 'react';
import { Flame, Target, Repeat } from 'lucide-react';
import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';

export const BeginnerPage = () => {
  const tips = [
    { icon: <Flame className="w-5 h-5 text-red-500" />, title: 'Học đều mỗi ngày', desc: '15 phút mỗi ngày hiệu quả hơn cày 3 tiếng cuối tuần. Giữ streak để tạo thói quen.' },
    { icon: <Target className="w-5 h-5 text-red-500" />, title: 'Ưu tiên thanh điệu', desc: 'Sai thanh điệu là lỗi khiến người bản xứ khó hiểu nhất. Đọc to và so với audio mẫu.' },
    { icon: <Repeat className="w-5 h-5 text-red-500" />, title: 'Lặp lại ngắt quãng', desc: 'Flashcard SRS tự nhắc bạn ôn từ đúng lúc sắp quên – nhớ lâu mà không cần học vẹt.' },
  ];

  return (
    <div className="p-6 lg:p-8 xl:px-12 max-w-[1400px] mx-auto w-full bg-transparent flex flex-col items-center pb-20">
      <BeginnerRoadmap />
      
      {/* Tips Section */}
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gray-200"></div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">MẸO CHO NGƯỜI MỚI</span>
          <div className="h-px w-12 bg-gray-200"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-[#4A190F] text-center mb-10">3 điều giúp bạn học nhanh hơn</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:border-red-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                {tip.icon}
              </div>
              <h3 className="font-bold text-[#4A190F] mb-2">{tip.title}</h3>
              <p className="text-xs text-[#682315]/70 leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
