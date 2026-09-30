import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';
import React, { useState } from 'react';
import { 
  Headphones, Play, CheckCircle2, HelpCircle, ChevronDown, 
  MousePointerClick, Languages, Keyboard, PenTool
} from 'lucide-react';

export const ListeningPage = () => {
  const [activeLevel, setActiveLevel] = useState('HSK 1');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const levels = [
    { id: 'HSK 1', active: true },
    { id: 'HSK 2', active: false },
    { id: 'HSK 3', active: false },
    { id: 'HSK 4', active: false },
    { id: 'HSK 5', active: false },
    { id: 'HSK 6', active: false },
    { id: 'HSK 7-9', active: false },
  ];

  const faqs = [
    { id: 1, q: 'Luyện nghe tiếng Trung khác với đọc như thế nào?', a: 'Nghe yêu cầu não bộ xử lý âm thanh trong thời gian thực, không thể dừng lại suy nghĩ lâu như đọc. Do đó, luyện nghe giúp tăng phản xạ giao tiếp tự nhiên.' },
    { id: 2, q: 'Làm sao để nghe hiểu khi người Trung Quốc nói quá nhanh?', a: 'Bắt đầu từ tốc độ chậm (audio chuẩn), sau đó làm quen dần với tốc độ tự nhiên. Quan trọng nhất là nắm bắt từ khoá (keyword) thay vì cố nghe từng chữ một.' },
    { id: 3, q: 'Phần mềm có tự động chấm điểm bài nghe không?', a: 'Có. Mọi dạng bài nghe (chọn chữ, điền nghĩa, gõ pinyin) đều được hệ thống chấm điểm ngay lập tức.' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-10">
      
      {/* Banner */}
      <div className="bg-white rounded-[24px] border border-red-900/10 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl hidden md:block opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-red-600 font-bold mb-3 uppercase tracking-wider text-xs">
            <Headphones className="w-4 h-4" />
            Luyện nghe
          </div>
          <h1 className="text-2xl font-bold text-[#4A190F] mb-2">Luyện nghe tiếng Trung</h1>
          <p className="text-[#682315]/70 text-sm leading-relaxed">
            100% audio người thật chuẩn giọng Bắc Kinh. Nghe từ tốc độ chậm đến nhanh, đa dạng các giọng nam/nữ, luyện tai nhạy bén với mọi ngữ điệu.
          </p>
        </div>

        <div className="relative z-10 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm shrink-0 min-w-[280px]">
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="text-gray-500">Cấp độ <span className="font-bold text-gray-800 ml-1">7</span></div>
            <div className="w-px h-3 bg-gray-200"></div>
            <div className="text-gray-500">Dạng bài <span className="font-bold text-gray-800 ml-1">4</span></div>
            <div className="w-px h-3 bg-gray-200"></div>
            <div className="text-gray-500">Luyện lại <span className="font-bold text-gray-800 ml-1 text-lg leading-none">∞</span></div>
          </div>
          <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-2.5 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Play className="w-4 h-4 fill-current" /> BẮT ĐẦU NGHE
          </button>
        </div>
      </div>

      {/* Levels */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Chọn cấp độ</h3>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {levels.map((level) => {
            const isActive = level.id === activeLevel;
            return (
              <button 
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`relative px-5 py-2.5 rounded-xl border transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {level.id}
                {isActive && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Stats for active level */}
        <div className="flex items-center gap-8 bg-gray-50/50 py-3 px-6 rounded-xl border border-gray-100 max-w-fit">
          <div className="text-center">
            <div className="font-bold text-[#4A190F]">15</div>
            <div className="text-[10px] text-gray-500 uppercase">Chủ đề</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#4A190F]">76</div>
            <div className="text-[10px] text-gray-500 uppercase">Bài</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#4A190F]">804</div>
            <div className="text-[10px] text-gray-500 uppercase">Từ</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#4A190F]">1.488</div>
            <div className="text-[10px] text-gray-500 uppercase">Câu</div>
          </div>
        </div>
      </div>

      {/* 4 Types */}
      <div>
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-px bg-gray-200"></div>
          <span className="bg-[#FAF9F8] px-4 text-xs font-bold text-red-500 uppercase tracking-wider relative z-10">4 dạng bài luyện tai</span>
        </div>
        
        <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
          Vòng lặp rèn luyện từ âm thanh đến não bộ: nhận diện âm, hiểu nghĩa, ghi nhớ pinyin và cuối cùng là tự viết lại câu chuẩn xác.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <MousePointerClick className="w-5 h-5 text-red-500" />, title: 'Nghe chọn chữ', desc: 'Nghe audio và chọn đáp án chữ Hán tương ứng.', color: 'bg-red-50 border-red-100' },
            { icon: <Languages className="w-5 h-5 text-green-500" />, title: 'Nghe điền nghĩa', desc: 'Nghe audio và chọn đáp án nghĩa tiếng Việt đúng.', color: 'bg-green-50 border-green-100' },
            { icon: <Keyboard className="w-5 h-5 text-orange-500" />, title: 'Nghe gõ pinyin', desc: 'Nghe và gõ lại đúng pinyin của từ/câu vừa nghe.', color: 'bg-orange-50 border-orange-100' },
            { icon: <PenTool className="w-5 h-5 text-purple-500" />, title: 'Chép chính tả câu', desc: 'Nghe cả câu dài, sắp xếp từ hoặc gõ lại toàn bộ.', color: 'bg-purple-50 border-purple-100' },
          ].map((type, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${type.color}`}>
                {type.icon}
              </div>
              <div>
                <h4 className="font-bold text-[#4A190F] text-sm mb-1">{type.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">{type.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
            <Headphones className="w-5 h-5" />
          </div>
          <h2 className="text-[17px] font-bold text-[#4A190F]">Luyện nghe tiếng Trung hiệu quả</h2>
        </div>
        
        <div className="space-y-4 text-[13px] text-[#682315]/70 leading-relaxed max-w-5xl">
          <p>
            Nghe (听) là kỹ năng cốt lõi nhất khi học tiếng Trung vì âm thanh tiếng Trung có nhiều thanh điệu dễ gây nhầm lẫn. Luyện nghe không chỉ giúp bạn giao tiếp tự tin mà còn củng cố việc nhớ mặt chữ và ngữ pháp.
          </p>
          <p>
            Tại Hanbeego, hệ thống bài tập luyện nghe được thiết kế đi từ dễ đến khó: nghe nhận diện âm -&gt; nghe hiểu nghĩa -&gt; nghe viết lại pinyin -&gt; chép lại câu dài. Tất cả đều sử dụng 100% giọng thật của người bản xứ (giọng Bắc Kinh chuẩn).
          </p>
          <p>
            Để đạt hiệu quả tốt nhất, hãy tuân thủ nguyên tắc: <strong>Nghe thụ động</strong> (tắm ngôn ngữ) kết hợp <strong>Nghe chủ động</strong> (làm bài tập). Hãy kiên trì luyện tập mỗi ngày ít nhất 15 phút.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-6 text-red-500">
          <HelpCircle className="w-5 h-5" />
          <h2 className="text-[17px] font-bold text-[#4A190F]">Câu hỏi thường gặp</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 w-5 h-5 rounded flex items-center justify-center shrink-0">Q</span>
                  <span className="font-bold text-[#4A190F] text-sm">{faq.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 text-[13px] text-[#682315]/70 pl-12 leading-relaxed border-t border-gray-50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <BeginnerRoadmap />
    </div>
  );
};
