import React, { useState } from 'react';
import { 
  BookOpen, HelpCircle, ChevronDown, ChevronRight
} from 'lucide-react';

export const ReadingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const levels = [
    { id: 'HSK 1', lessons: '23 Bài đọc' },
    { id: 'HSK 2', lessons: '36 Bài đọc' },
    { id: 'HSK 3', lessons: '54 Bài đọc' },
    { id: 'HSK 4', lessons: '80 Bài đọc' },
    { id: 'HSK 5', lessons: '84 Bài đọc' },
    { id: 'HSK 6', lessons: '92 Bài đọc' },
    { id: 'HSK 7-9', lessons: '20 Bài đọc' },
  ];

  const faqs = [
    { id: 1, q: 'Luyện đọc hiểu tiếng Trung có thực sự cần thiết không?', a: 'Đọc hiểu là kỹ năng nền tảng để bạn tiếp thu từ vựng và cấu trúc ngữ pháp một cách tự nhiên nhất. Nó cũng là phần chiếm tỷ trọng lớn trong các bài thi HSK.' },
    { id: 2, q: 'Làm sao để đọc hiểu tiếng Trung mà không phải tra từ điển liên tục?', a: 'Hãy bắt đầu với các bài đọc có độ khó phù hợp (cấp độ HSK bạn đang học). Hệ thống của chúng tôi hỗ trợ tra từ trực tiếp bằng cách click vào chữ, giúp bạn không bị ngắt quãng mạch đọc.' },
    { id: 3, q: 'Các bài đọc ở Hanbeego có phân loại độ khó không?', a: 'Có. Bài đọc được chia chính xác theo các cấp độ HSK từ 1 đến 9, sử dụng đúng lượng từ vựng và ngữ pháp của cấp độ đó.' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-10">
      
      {/* Banner */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-[#4A190F] mb-3">Đọc hiểu <span className="text-red-600">HSK</span></h1>
          <p className="text-[#682315]/70 text-sm leading-relaxed max-w-2xl">
            Bài đọc phân loại theo HSK 1-9. Luyện dịch, phân tích ngữ pháp, nhúng từ mới để tra cứu nhanh chạm là dịch, hỗ trợ pinyin và audio.
          </p>
        </div>
      </div>

      {/* Grid of Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {levels.map((level) => (
          <div key={level.id} className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all cursor-pointer flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-500">
                  <BookOpen className="w-5 h-5" />
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
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-[17px] font-bold text-[#4A190F]">Đọc hiểu tiếng Trung hiệu quả cho người Việt</h2>
        </div>
        
        <div className="space-y-4 text-[13px] text-[#682315]/70 leading-relaxed max-w-5xl">
          <p>
            Đọc hiểu (阅读) là một trong những kỹ năng quan trọng nhất khi thi HSK cũng như giao tiếp thực tế. Với người Việt Nam, học đọc hiểu có lợi thế lớn về mặt nhận diện nghĩa Hán Việt, nhưng cũng đối mặt với nhiều khó khăn trong cách sắp xếp câu (ngữ pháp) và các từ đa nghĩa.
          </p>
          <p>
            Hệ thống bài đọc của Hanbeego được chia làm nhiều cấp độ. Mỗi bài học đều có chức năng click-to-translate (bấm chạm vào bất kỳ từ nào để xem nghĩa, pinyin, cách đọc) giúp bạn không cần mở từ điển ngoài làm gián đoạn quá trình đọc. Hơn thế nữa, bài đọc được thiết kế bám sát các chủ điểm ngữ pháp cốt lõi để bạn ôn tập ngay trong ngữ cảnh.
          </p>
          <p>
            Bạn nên áp dụng phương pháp đọc lướt (skimming) để lấy ý chính trước, sau đó mới đọc kỹ (scanning) để tìm thông tin chi tiết. Đừng quên thử tự dịch đoạn văn sang tiếng Việt trước khi xem bản dịch mẫu.
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
