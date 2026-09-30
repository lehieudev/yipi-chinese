import React, { useState } from 'react';
import { 
  CheckCircle2, HelpCircle, ChevronDown, 
  Mic, Headphones, Target, ArrowRight
} from 'lucide-react';

export const SpeakingPage = () => {
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
    { id: 1, q: 'Luyện nói trên hệ thống có giống với thi HSKK không?', a: 'Có. Hình thức thi HSKK (thi nói tiếng Trung) yêu cầu bạn nghe và nhắc lại, hoặc trả lời câu hỏi trực tiếp trên máy tính. Việc luyện tập thường xuyên với AI sẽ giúp bạn làm quen.' },
    { id: 2, q: 'AI chấm điểm phát âm có chính xác không?', a: 'Hệ thống sử dụng công nghệ nhận diện giọng nói (Speech-to-Text) tiên tiến, độ chính xác lên tới 95%. Hệ thống sẽ chỉ ra từ nào bạn phát âm sai để sửa.' },
    { id: 3, q: 'Tôi ngại nói vì sợ sai, phải làm sao?', a: 'Đó là lý do bạn nên luyện tập với AI. Bạn có thể sai hàng trăm lần và đọc lại đến khi chuẩn 100% mà không bị ai đánh giá. Hãy thoải mái nhé!' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-10">
      
      {/* Banner */}
      <div className="bg-white rounded-[24px] border border-red-900/10 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl hidden md:block opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-red-600 font-bold mb-3 uppercase tracking-wider text-xs">
            <Mic className="w-4 h-4" />
            Luyện nói
          </div>
          <h1 className="text-2xl font-bold text-[#4A190F] mb-2">Luyện nói tiếng Trung</h1>
          <p className="text-[#682315]/70 text-sm leading-relaxed">
            Luyện phát âm chuẩn theo audio người bản xứ, hệ thống AI tự động chấm điểm và chỉ ra lỗi sai để bạn khắc phục ngay lập tức.
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
            BẮT ĐẦU NÓI <ArrowRight className="w-4 h-4" />
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
        
        {/* Stats */}
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

      {/* 3 Steps */}
      <div>
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-px bg-gray-200"></div>
          <span className="bg-[#FAF9F8] px-4 text-xs font-bold text-red-500 uppercase tracking-wider relative z-10">Nói chuẩn trong 3 bước</span>
        </div>
        
        <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
          Cải thiện phát âm không chỉ qua việc nghe mà phải luyện tập thực hành. Hệ thống AI của chúng tôi sẽ đồng hành cùng bạn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: <Headphones className="w-6 h-6 text-green-500" />, step: '1', title: 'Nghe mẫu', desc: 'Nghe nhiều lần audio chuẩn giọng Bắc Kinh để quen với thanh điệu.', color: 'bg-green-50 border-green-100 text-green-600' },
            { icon: <Mic className="w-6 h-6 text-orange-500" />, step: '2', title: 'Đọc lại', desc: 'Nhấn nút ghi âm và đọc lại to, rõ ràng vào micro của thiết bị.', color: 'bg-orange-50 border-orange-100 text-orange-600' },
            { icon: <Target className="w-6 h-6 text-red-500" />, step: '3', title: 'Chấm điểm', desc: 'Hệ thống nhận diện giọng nói, chấm điểm và bôi đỏ các từ bạn phát âm sai.', color: 'bg-red-50 border-red-100 text-red-600' },
          ].map((type, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border ${type.color}`}>
                {type.step}
              </div>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 mb-4 ${type.color.replace('text', 'text').split(' ')[0]} ${type.color.replace('text', 'text').split(' ')[1]}`}>
                {type.icon}
              </div>
              <h4 className="font-bold text-[#4A190F] mb-2">{type.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
            <Mic className="w-5 h-5" />
          </div>
          <h2 className="text-[17px] font-bold text-[#4A190F]">Luyện nói tiếng Trung hiệu quả</h2>
        </div>
        
        <div className="space-y-4 text-[13px] text-[#682315]/70 leading-relaxed max-w-5xl">
          <p>
            Phát âm đúng (说) là nền tảng để giao tiếp tiếng Trung. Người Việt học tiếng Trung thường gặp khó khăn với các âm bật hơi, âm cuốn lưỡi, và đặc biệt là thanh điệu (thanh 1, thanh 4).
          </p>
          <p>
            Tính năng Luyện Nói của Hanbeego ứng dụng công nghệ AI tiên tiến, cho phép bạn ghi âm giọng nói của mình và nhận được kết quả chấm điểm ngay lập tức. Tính năng này giúp bạn:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nhận biết chính xác những từ mình phát âm sai (hiển thị màu đỏ).</li>
            <li>Nghe lại giọng ghi âm của chính mình để tự so sánh với giọng chuẩn.</li>
            <li>Luyện tập đi luyện lại không giới hạn số lần cho đến khi đạt điểm tối đa.</li>
          </ul>
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

    </div>
  );
};
