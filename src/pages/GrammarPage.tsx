import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';
import React, { useState } from 'react';
import { BookOpen, ListTodo, Target, Volume2, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const GrammarPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const levels = [
    { id: 'HSK 1', points: 48, status: 'BẮT ĐẦU' },
    { id: 'HSK 2', points: 81 },
    { id: 'HSK 3', points: 70 },
    { id: 'HSK 4', points: 75 },
    { id: 'HSK 5', points: 71 },
    { id: 'HSK 6', points: 66 },
    { id: 'HSK 7-9', points: 147 },
  ];

  const faqs = [
    { id: 1, q: 'Ngữ pháp HSK có mấy cấp độ?', a: 'Hệ thống ngữ pháp HSK được chia thành 9 cấp độ, từ cơ bản (HSK 1) đến cao cấp (HSK 9).' },
    { id: 2, q: 'Học ngữ pháp HSK theo thứ tự nào?', a: 'Nên học theo thứ tự từ HSK 1 đến HSK 9 để đảm bảo nền tảng vững chắc.' },
    { id: 3, q: 'Làm sao để nhớ ngữ pháp tiếng Trung lâu?', a: 'Thực hành đặt câu, làm bài tập và giao tiếp thường xuyên là cách tốt nhất.' },
    { id: 4, q: 'Ngữ pháp tiếng Trung có khó không?', a: 'Ngữ pháp tiếng Trung khá tương đồng với tiếng Việt ở cấu trúc SVO, tuy nhiên có một số điểm khác biệt cần lưu ý.' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[800px] mx-auto w-full flex flex-col gap-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-4 border border-green-200">
          <BookOpen className="w-3.5 h-3.5" />
          NGỮ PHÁP
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-3">Mẫu câu & ngữ pháp</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed">
          Toàn bộ ngữ pháp HSK 1-9 trong một chỗ — cấu trúc câu rõ ràng, giải thích tiếng Việt và ví dụ có pinyin, audio bản ngữ.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Điểm ngữ pháp</div>
          <div className="font-bold text-gray-900">558</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Cấp độ HSK</div>
          <div className="font-bold text-gray-900">6</div>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Ví dụ bản ngữ</div>
          <div className="font-bold text-gray-900">Audio</div>
        </div>
        <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-3 rounded-xl text-sm font-bold transition-colors">
          HỌC NGỮ PHÁP - HSK 1
        </button>
      </div>

      {/* Level Selection */}
      <div>
        <h2 className="font-bold text-lg text-[#4A190F] mb-1">Chọn cấp độ</h2>
        <p className="text-sm text-gray-500 mb-4">Từ mẫu câu cơ bản HSK 1 đến cấu trúc nâng cao HSK 7-9.</p>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {levels.map((level, idx) => (
            <button key={idx} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-red-200 hover:shadow-md transition-all relative">
              {level.status && (
                <div className="absolute -top-2 bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {level.status}
                </div>
              )}
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#C45827]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-bold text-sm text-gray-900">{level.id}</div>
                <div className="text-xs text-gray-500">{level.points} điểm</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cách học */}
      <div className="mt-4">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
            <ListTodo className="w-3.5 h-3.5" />
            CÁCH HỌC
          </div>
        </div>
        <h2 className="font-bold text-xl text-center text-[#4A190F] mb-2">Học theo mẫu câu</h2>
        <p className="text-center text-sm text-gray-500 mb-8 max-w-md mx-auto">
          Mỗi điểm ngữ pháp đi kèm cấu trúc rõ ràng, giải thích tiếng Việt và ví dụ có audio.
        </p>

        <div className="space-y-4">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Mẫu câu chuẩn</h3>
              <p className="text-sm text-gray-500">Cấu trúc câu rõ ràng cho từng điểm ngữ pháp - dễ nhận ra, dễ áp dụng.</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <span className="font-oriental text-2xl">文</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Giải thích tiếng Việt</h3>
              <p className="text-sm text-gray-500">Mỗi điểm ngữ pháp được giải thích bằng tiếng Việt dễ hiểu, sát người Việt.</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Ví dụ có audio</h3>
              <p className="text-sm text-gray-500">Câu ví dụ minh họa kèm pinyin và phát âm bản ngữ để nghe ngay.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-green-50/50 rounded-3xl p-6 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-green-600" />
          <h2 className="font-bold text-lg text-gray-900">Học ngữ pháp Tiếng Trung hiệu quả</h2>
        </div>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            Ngữ pháp tiếng Trung (汉语语法) là hệ thống quy tắc cấu trúc câu trong tiếng Quan thoại. Điểm đặc biệt của ngữ pháp tiếng Trung so với tiếng Việt là thứ tự từ (Subject-Verb-Object) và cách sử dụng các trợ từ như 了, 过, 着 để thể hiện thời gian và trạng thái.
          </p>
          <p>
            Hệ thống ngữ pháp HSK được xây dựng theo chuẩn kỳ thi HSK quốc tế, bao gồm 9 cấp độ từ cơ bản đến thành thạo. Mỗi cấp độ bao gồm các điểm ngữ pháp cụ thể mà người học cần nắm vững để đạt điểm cao trong kỳ thi.
          </p>
          <p>
            Tại Hanbeego, chúng tôi cung cấp giải thích chi tiết bằng tiếng Việt cho từng điểm ngữ pháp, kèm theo ví dụ có pinyin và audio phát âm. Điều này giúp bạn hiểu rõ cách sử dụng và luyện tập phát âm cùng lúc.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-[#C45827]" />
          <h2 className="text-xl font-bold text-[#4A190F]">Câu hỏi thường gặp</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-500">Q</span>
                  </div>
                  <span className="font-bold text-gray-800 text-sm">{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-48' : 'max-h-0'}`}>
                <div className="p-5 pt-0 text-sm text-gray-600 pl-14">
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
