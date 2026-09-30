import React from 'react';
import { HelpCircle, FileText, Briefcase, Mail, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const AffiliatePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Mua mã rồi tôi báo cho học viên như thế nào?',
      a: 'Sau khi mua, bạn sẽ nhận được danh sách mã kích hoạt qua email. Bạn có thể gửi mã đó cho học viên để họ tự kích hoạt trên ứng dụng.'
    },
    {
      q: 'Giá cụ thể là bao nhiêu?',
      a: 'Giá phụ thuộc vào gói bạn chọn và số lượng mua. Vui lòng để lại email để chúng tôi gửi bảng giá chi tiết.'
    },
    {
      q: 'Được trả lại nếu chưa sử dụng không?',
      a: 'Có, các mã chưa kích hoạt có thể được hoàn lại trong vòng 30 ngày kể từ ngày mua.'
    },
    {
      q: 'Từ cô giáo đổi thành đại lý hay đại sứ được không?',
      a: 'Hoàn toàn được. Chúng tôi có các chính sách hỗ trợ nâng cấp tài khoản cho đối tác.'
    }
  ];

  return (
    <div className="flex-1 min-h-screen pb-20 bg-gray-50/50">
      <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
               <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Giới thiệu bạn bè</h1>
              <p className="text-gray-500 text-sm">Quảng bá Yipi, theo dõi số lượng bạn bè đăng ký và nhận hoa hồng hoặc tài khoản Premium.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col md:flex-row items-center gap-4">
             <div className="flex-1 text-sm font-medium text-gray-700">
               Link giới thiệu của bạn
             </div>
             <div className="flex-1 w-full relative">
                <input type="text" readOnly value="https://hanyupipi.com/ref/hieule4467" className="w-full pl-4 pr-24 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 outline-none" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors">
                  <FileText className="w-3.5 h-3.5" /> SAO CHÉP
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
             <div className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-gray-500 text-xs mb-1">Lượt click link:</span>
                <span className="text-xl font-bold text-gray-800">0</span>
             </div>
             <div className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-gray-500 text-xs mb-1">Đăng ký thành công:</span>
                <span className="text-xl font-bold text-gray-800">0</span>
             </div>
             <div className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-gray-500 text-xs mb-1">Hoa hồng kiếm được:</span>
                <span className="text-xl font-bold text-green-600">0đ</span>
             </div>
          </div>
        </div>

        {/* Withdrawal */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Rút tiền</h2>
           <p className="text-sm text-gray-500 mb-6">Chỉ rút được tiền khi bạn có ít nhất 100.000đ trong số dư. Bạn cần thiết lập thông tin thanh toán trước khi rút tiền.</p>
           
           <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                 <p className="font-bold text-orange-800 mb-1">Tài khoản ngân hàng/Ví điện tử</p>
                 <p className="text-xs text-orange-600/80">Chưa có thông tin nhận tiền. Vui lòng thêm để rút hoa hồng.</p>
              </div>
              <button className="px-4 py-2 bg-white text-orange-700 text-sm font-bold rounded-xl shadow-sm border border-orange-200 hover:bg-orange-100 transition-colors whitespace-nowrap">
                THÊM THÔNG TIN
              </button>
           </div>
        </div>

        {/* Partner Program */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
           <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                 <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">HỢP TÁC</div>
                 <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-snug">Bạn dạy tiếng Trung, chúng tôi lo phần nền tảng</h2>
                 <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    HanyuYipi đồng hành cùng các trung tâm ngoại ngữ, giáo viên và gia sư tiếng Trung tối ưu hóa thời gian soạn bài giảng, theo dõi tiến độ học viên dễ dàng và nâng cao chất lượng dạy học.
                 </p>
                 <button className="px-6 py-3 bg-[#C45827] text-white font-bold rounded-xl shadow-md shadow-[#C45827]/20 hover:bg-[#A5471E] transition-colors">
                    ĐĂNG KÝ TRỞ THÀNH ĐỐI TÁC
                 </button>
              </div>
              <div className="w-full md:w-1/3 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                 <p className="font-bold text-gray-800 mb-4">Cần tư vấn trực tiếp?</p>
                 <div className="space-y-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> partner@hanyuyipi.com</p>
                 </div>
              </div>
           </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Câu hỏi thường gặp</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
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

          <div className="mt-8 bg-orange-50 rounded-2xl p-6 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-4">
             <div>
                <h3 className="font-bold text-orange-900 mb-1">Sẵn sàng hợp tác?</h3>
                <p className="text-sm text-orange-700/80">Để lại email để nhận tài liệu và trao đổi chi tiết.</p>
             </div>
             <button className="px-6 py-3 bg-[#C45827] text-white font-bold rounded-xl shadow-md shadow-[#C45827]/20 hover:bg-[#A5471E] transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                GỬI EMAIL CHO CHÚNG TÔI
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};
