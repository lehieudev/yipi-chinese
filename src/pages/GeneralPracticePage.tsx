import React, { useState } from 'react';
import { Play, Headphones, PenTool, BookOpen, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GeneralPracticePage = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const levels = [
    { id: 1, label: 'HSK 1', desc: '150 từ vựng', color: '#10B981' },
    { id: 2, label: 'HSK 2', desc: '300 từ vựng', color: '#3B82F6' },
    { id: 3, label: 'HSK 3', desc: '600 từ vựng', color: '#F59E0B' },
    { id: 4, label: 'HSK 4', desc: '1200 từ vựng', color: '#EF4444' },
    { id: 5, label: 'HSK 5', desc: '2500 từ vựng', color: '#8B5CF6' },
    { id: 6, label: 'HSK 6', desc: '5000 từ vựng', color: '#EC4899' },
    { id: 7, label: 'HSK 7-9', desc: 'Cao cấp', color: '#111827' },
  ];

  const faqs = [
    {
      q: 'Luyện tập tổng hợp tiếng Trung Yipi bao gồm những dạng bài nào?',
      a: 'Hệ thống cung cấp các dạng bài nghe chép chính tả, dịch câu, điền từ, và trắc nghiệm từ vựng, ngữ pháp ngẫu nhiên giúp bạn ôn luyện toàn diện.'
    },
    {
      q: 'Bắt buộc luyện tổng hợp ở bao nhiêu câu?',
      a: 'Bạn có thể tự do lựa chọn số lượng câu hỏi trong mỗi phiên luyện tập. Hệ thống sẽ lưu lại tiến trình của bạn.'
    },
    {
      q: 'Luyện tập tổng hợp có khác gì so với học từ vựng và ngữ pháp?',
      a: 'Luyện tập tổng hợp là bài kiểm tra tổng hợp kiến thức từ nhiều bài học, giúp bạn xâu chuỗi và phản xạ nhanh hơn trong thực tế.'
    },
    {
      q: 'Luyện tập tổng hợp tiếng Trung Yipi miễn phí hay trả phí?',
      a: 'Các bài luyện tập cơ bản là hoàn toàn miễn phí. Phiên bản trả phí sẽ cung cấp thêm tính năng phân tích lỗi sai và lộ trình cá nhân hóa bằng AI.'
    }
  ];

  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#C45827] text-sm font-bold uppercase tracking-wider">Luyện tập tổng hợp</span>
              </div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Luyện tập Tổng hợp</h1>
              <p className="text-[#682315]/60 text-sm">
                Mỗi buổi 10-20 câu · Suốt hành trình chinh phục tiếng Trung, duy trì luyện tập đều đặn là chìa khóa.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto min-w-[240px]">
            <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-xl">
              <span className="text-gray-500">Cấp độ</span>
              <span className="font-bold text-[#4A190F]">HSK 1</span>
            </div>
            <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-xl">
              <span className="text-gray-500">Đang học</span>
              <span className="font-bold text-[#4A190F]">0/0</span>
            </div>
            <button className="w-full bg-[#C45827] hover:bg-[#A5471E] text-white py-3 px-6 rounded-xl font-medium transition-colors shadow-lg shadow-[#C45827]/20 flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              BẮT ĐẦU LUYỆN TẬP - HSK 1
            </button>
          </div>
        </div>

        {/* Level Selector */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5">
          <h2 className="text-lg font-bold text-[#4A190F] mb-1">Chọn cấp độ</h2>
          <p className="text-sm text-gray-500 mb-6">Mỗi cấp độ sẽ có các dạng bài tập khác nhau. Chọn từ HSK 1 - 9.</p>
          
          <div className="flex flex-wrap gap-4">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`relative flex flex-col items-center justify-center w-[100px] h-[100px] rounded-2xl border-2 transition-all ${
                  selectedLevel === level.id 
                    ? 'border-[#C45827] bg-[#C45827]/5 shadow-md transform -translate-y-1' 
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                {selectedLevel === level.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#C45827] rounded-full flex items-center justify-center text-white border-2 border-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${level.color}15`, color: level.color }}>
                  <span className="font-bold">{level.id}</span>
                </div>
                <span className="font-bold text-gray-800 text-sm">{level.label}</span>
                <span className="text-[10px] text-gray-500">{level.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Practice Types */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#4A190F]/5 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-[#C45827] font-bold uppercase tracking-wider text-sm mb-2">
            <span className="w-8 h-[1px] bg-[#C45827]/30"></span>
            CÁCH LUYỆN
            <span className="w-8 h-[1px] bg-[#C45827]/30"></span>
          </div>
          <h2 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">2 dạng bài trộn ngẫu nhiên</h2>
          <p className="text-gray-500 mb-8">Mỗi buổi 10 câu (mặc định) - Trộn lẫn phân loại để tăng độ nhạy bén</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#C45827]/5 border border-[#C45827]/10 text-left">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-[#C45827]" />
              </div>
              <div>
                <h3 className="font-bold text-[#4A190F] mb-1">Nghe - chép chính tả <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded ml-2">10%</span></h3>
                <p className="text-sm text-gray-600 leading-relaxed">Nghe và ghi lại nội dung đoạn hội thoại - kiểm tra kỹ năng chép chính tả.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-left">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <PenTool className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-900 mb-1">Dịch câu <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded ml-2">90%</span></h3>
                <p className="text-sm text-emerald-700/80 leading-relaxed">Đọc hiểu tiếng Trung và chọn nghĩa tiếng Việt - Luyện phản xạ đọc hiểu.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#C45827]/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#C45827]" />
            </div>
            <h2 className="text-xl font-bold text-[#4A190F] font-oriental">Luyện tập tổng hợp tiếng Trung mỗi ngày</h2>
          </div>
          
          <div className="prose prose-sm text-gray-600 max-w-none space-y-4">
            <p>Học từ vựng ngữ pháp thôi là chưa đủ, bạn cần một môi trường để kích thích khả năng phản xạ và tư duy. Luyện tập tổng hợp sẽ giúp bạn tạo môi trường này.</p>
            <p>Tại Yipi, hệ thống sẽ tự động tổng hợp tất cả từ vựng ngữ pháp ở cấp độ bạn chọn (HSK 1 - 9) và tạo ra các câu hỏi dạng nghe - chép chính tả hoặc dịch câu.</p>
            <p>Chỉ cần mỗi ngày 10-20 câu, bạn sẽ nhận thấy khả năng nghe, đọc hiểu, và vốn từ vựng của mình cải thiện đáng kể.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-[#4A190F] font-oriental">Câu hỏi thường gặp</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
