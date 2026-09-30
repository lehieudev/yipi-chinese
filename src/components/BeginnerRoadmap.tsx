import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BeginnerRoadmap = () => {
  const navigate = useNavigate();

  const steps = [
    { num: 1, hanzi: '拼', pinyin: 'pīn', title: 'Phát âm - Phiên âm', desc: 'Nắm chắc 4 thanh điệu và 405 âm tiết cơ bản để phát âm chuẩn ngay từ đầu.', path: '/app/pronunciation' },
    { num: 2, hanzi: '字', pinyin: 'zì', title: 'Chữ Hán - Bộ thủ', desc: 'Hiểu cấu trúc chữ Hán qua 214 bộ thủ, tập viết đúng quy tắc bút thuận.', path: '/app/characters' },
    { num: 3, hanzi: '词', pinyin: 'cí', title: 'Từ vựng HSK 1', desc: 'Học 150 từ vựng cơ bản nhất. Sử dụng Flashcard để ghi nhớ từ hiệu quả.', path: '/app/hsk' },
    { num: 4, hanzi: '法', pinyin: 'fǎ', title: 'Mẫu câu & ngữ pháp', desc: 'Học các cấu trúc câu đơn giản, cách đặt câu hỏi và câu phủ định cơ bản.', path: '/app/grammar' },
    { num: 5, hanzi: '听', pinyin: 'tīng', title: 'Luyện nghe', desc: 'Luyện nghe với các đoạn hội thoại ngắn, tốc độ chậm để quen với âm điệu.', path: '/app/listening' },
    { num: 6, hanzi: '说', pinyin: 'shuō', title: 'Giao tiếp & dịch', desc: 'Thực hành giao tiếp với AI Tutor theo các chủ đề quen thuộc hàng ngày.', path: '/app/conversation' },
  ];

  return (
    <div className="w-full mt-24 mb-16 flex flex-col items-center">
      {/* Banner */}
      <div className="w-full max-w-5xl rounded-[32px] bg-[#FFF8F5] border border-red-900/5 p-8 lg:p-12 mb-16 relative overflow-hidden shadow-sm flex items-center justify-between">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-8 bg-red-600"></div>
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest">CHO NGƯỜI MỚI BẮT ĐẦU</span>
          </div>
          <h2 className="text-3xl lg:text-[2.5rem] font-bold text-[#4A190F] mb-4 leading-tight tracking-tight">
            Bắt đầu học tiếng Trung <span className="border-b-4 border-red-500 pb-1">từ con số 0</span>
          </h2>
          <p className="text-[#682315]/80 text-base font-medium">
            Chưa biết gì cũng không sao. Đây là lộ trình 6 bước rõ ràng để bạn đi từ pinyin đến câu nói đầu tiên.
          </p>
        </div>

        <div className="relative z-10 hidden md:flex items-center justify-center w-40 h-40 rounded-full bg-red-50 border-4 border-white shadow-lg shrink-0">
          <span className="text-6xl font-oriental text-[#4A190F]">学</span>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 rounded-lg shadow-md flex items-center justify-center rotate-12">
            <span className="text-white text-sm font-bold">入门</span>
          </div>
        </div>
      </div>

      {/* Roadmap path */}
      <div className="w-full max-w-5xl relative mb-12 mt-8">
        {/* Connection line */}
        <div className="absolute top-[28px] left-[8%] right-[8%] hidden lg:block z-0 pointer-events-none w-[84%]">
           <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" className="overflow-visible">
             <path d="M 0,25 C 180,35 280,45 350,20 C 450,-15 600,0 750,15 C 850,25 950,5 1000,-5" fill="none" stroke="#A31F1F" strokeWidth="3" strokeLinecap="round" />
           </svg>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-3 xl:gap-4 relative z-10 items-start">
          {steps.map((step, idx) => {
            let yOffset = "0px";
            if (idx === 0) yOffset = "25px";
            if (idx === 1) yOffset = "35px";
            if (idx === 2) yOffset = "20px";
            if (idx === 3) yOffset = "-10px";
            if (idx === 4) yOffset = "15px";
            if (idx === 5) yOffset = "-5px";
            
            return (
            <div key={step.num} className="flex flex-col items-center relative transition-all" style={{ top: yOffset }}>
              {/* Node */}
              <div className="w-[52px] h-[52px] rounded-full bg-[#A31F1F] text-white flex items-center justify-center font-bold text-2xl shadow-sm border-[5px] border-white mb-5 z-10 relative">
                {step.num}
              </div>
              
              {/* Card */}
              <div 
                onClick={() => { window.scrollTo(0, 0); navigate(step.path); }}
                className="bg-white rounded-[24px] p-4 lg:p-3 xl:p-4 shadow-sm flex flex-col items-center text-center w-full h-full min-h-[300px] max-w-[220px] relative z-10 border border-transparent hover:border-red-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative mb-4 mt-2">
                  <div className="w-20 h-20 rounded-full border border-gray-100 flex flex-col items-center justify-center bg-transparent">
                    <span className="text-3xl font-oriental text-[#4A190F]">{step.hanzi}</span>
                  </div>
                  <div className="absolute top-0 -right-2 w-7 h-7 bg-[#FE3636] text-white text-xs rounded-md flex items-center justify-center font-bold shadow-sm">
                    {['一', '二', '三', '四', '五', '六'][step.num - 1]}
                  </div>
                </div>
                
                <span className="text-[#FE3636] text-[13px] font-bold mb-1">{step.pinyin}</span>
                <h3 className="font-bold text-[#4A190F] text-[15px] mb-3 leading-tight px-2">{step.title}</h3>
                <p className="text-[11px] text-[#682315]/60 mb-2 leading-relaxed flex-1 px-1">
                  {step.desc}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
