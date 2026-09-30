import React, { useState } from 'react';
import { 
  Headphones, Mic, CheckCircle, HelpCircle, ChevronDown, ChevronRight, Activity
} from 'lucide-react';

export const ShadowingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const levels = [
    { id: 'HSK 1', lessons: '49 Đoạn hội thoại' },
    { id: 'HSK 2', lessons: '116 Đoạn hội thoại' },
    { id: 'HSK 3', lessons: '124 Đoạn hội thoại' },
    { id: 'HSK 4', lessons: '235 Đoạn hội thoại' },
    { id: 'HSK 5', lessons: '253 Đoạn hội thoại' },
    { id: 'HSK 6', lessons: '254 Đoạn hội thoại' },
    { id: 'HSK 7-9', lessons: '169 Đoạn hội thoại' },
  ];

  const faqs = [
    { id: 1, q: 'Shadowing tiếng Trung khác gì với đọc nhắc lại bình thường?', a: 'Shadowing (nói đuổi) yêu cầu bạn nói gần như đồng thời với người bản xứ (chỉ trễ khoảng 0.5-1 giây), trong khi đọc nhắc lại là chờ họ đọc xong câu mới đọc theo.' },
    { id: 2, q: 'Mới học HSK 1 có nên luyện Shadowing không?', a: 'Hoàn toàn nên. Bạn có thể bắt đầu với những câu rất ngắn. Quan trọng là bắt chước được ngữ điệu và nhịp điệu của họ.' },
    { id: 3, q: 'Làm sao để biết mình đang Shadowing đúng?', a: 'Bạn nên ghi âm lại. Khi nghe lại, nếu thấy giọng mình "khớp" với giọng audio gốc về tốc độ và ngắt nghỉ, tức là bạn đang làm tốt.' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-10">
      
      {/* Banner */}
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold text-[#4A190F] mb-3">Shadowing tiếng Trung</h1>
        <p className="text-[#682315]/70 text-sm leading-relaxed max-w-2xl mb-8">
          Phương pháp luyện nói "nói đuổi", giúp cải thiện phát âm, ngữ điệu và tốc độ phản xạ.
        </p>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-600 uppercase mb-1">BƯỚC 1</div>
              <h4 className="font-bold text-[#4A190F] text-sm mb-1">Nghe & Nhẩm</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Nghe hiểu câu, từ vựng và nhẩm nhịp điệu trong đầu.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-600 uppercase mb-1">BƯỚC 2</div>
              <h4 className="font-bold text-[#4A190F] text-sm mb-1">Nhại & Theo âm</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Đọc nói đuổi, nhại âm theo giọng audio chỉ trễ 0.5s.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-green-600 uppercase mb-1">BƯỚC 3</div>
              <h4 className="font-bold text-[#4A190F] text-sm mb-1">Tự nói & Chấm</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">Tự ghi âm và nhận đánh giá từ hệ thống.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {levels.map((level) => (
          <div key={level.id} className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all cursor-pointer flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-500">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#4A190F] text-lg">{level.id}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
            <div className="mt-auto">
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                {level.lessons}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-[#FFF9F6] rounded-[24px] p-8 border border-red-900/5 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
            <Mic className="w-5 h-5" />
          </div>
          <h2 className="text-[17px] font-bold text-[#4A190F]">Học nói tiếng Trung bằng phương pháp shadowing</h2>
        </div>
        
        <div className="space-y-4 text-[13px] text-[#682315]/70 leading-relaxed max-w-5xl">
          <p>
            Shadowing (nói đuổi) là phương pháp thực hành ngoại ngữ bằng cách lặp lại ngay lập tức những gì bạn nghe được. Thay vì đợi người nói câu kết thúc, bạn sẽ cố gắng nói theo họ song song (chỉ chậm hơn một phần nhỏ giây).
          </p>
          <p>
            Lợi ích lớn nhất của việc shadowing tiếng Trung là nó ép bộ não và cơ miệng của bạn phải quen với tốc độ tự nhiên, học được cách luyến láy (liên âm), ngắt nghỉ, và đặc biệt là kiểm soát thanh điệu trong một câu dài. Điều này vượt trội hơn hẳn so với việc chỉ học phát âm từng từ đơn lẻ.
          </p>
          <p>
            Mỗi bài thực hành ở Hanbeego được thiết kế nhỏ gọn, phân theo từng cấp độ HSK. Hệ thống sẽ có chức năng chạy audio lặp lại liên tục, hiện rõ pinyin/chữ Hán để bạn dễ theo dõi. Hãy chuẩn bị 1 tai nghe và một không gian yên tĩnh để đạt hiệu quả cao nhất.
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

    </div>
  );
};
