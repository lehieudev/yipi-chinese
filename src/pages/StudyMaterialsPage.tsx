import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, Download, PlayCircle, ExternalLink, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const StudyMaterialsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'giao-trinh', label: 'Giáo trình' },
    { id: 'de-thi-hsk', label: 'Đề thi HSK' },
    { id: 'de-thi-tocfl', label: 'Đề thi TOCFL' }
  ];

  const materials = [
    {
      id: 1,
      title: 'Combo Giáo trình + Sổ tay New HSK 1 (HSK 3.0)',
      category: 'giao-trinh',
      desc: 'Combo bao gồm: Giáo trình New HSK 1 (Sách bài học và Sách bài tập), Tập viết chữ Hán, Sổ tay từ vựng chuẩn HSK 3.0, Flashcard. Mua ngay trên Shopee để nhận ưu đãi.',
      links: [
        { label: 'Shopee', url: '#', type: 'buy' },
        { label: 'Video Review', url: '#', type: 'video' }
      ]
    },
    {
      id: 2,
      title: 'Combo Giáo trình + Sổ tay New HSK 2 (HSK 3.0)',
      category: 'giao-trinh',
      desc: 'Combo học tiếng Trung HSK 2 chuẩn mới nhất. Phù hợp cho người đã học qua HSK 1. Tặng kèm audio và bài tập bổ trợ online.',
      links: [
        { label: 'Shopee', url: '#', type: 'buy' },
        { label: 'Video Review', url: '#', type: 'video' }
      ]
    },
    {
      id: 3,
      title: 'Bộ đề thi thử HSK 3 (Mới nhất 2024)',
      category: 'de-thi-hsk',
      desc: 'Bộ 10 đề thi HSK 3 sát với đề thi thật. Có đáp án chi tiết và giải thích cặn kẽ từng câu. Hỗ trợ file PDF và Audio.',
      links: [
        { label: 'Tải miễn phí', url: '#', type: 'download' }
      ]
    },
    {
      id: 4,
      title: 'Tuyển tập đề thi TOCFL Band A',
      category: 'de-thi-tocfl',
      desc: 'Tập hợp đề thi TOCFL Band A (Cấp 1 & 2) đầy đủ các kỹ năng Nghe, Đọc. Giúp bạn làm quen cấu trúc đề thi.',
      links: [
        { label: 'Tải miễn phí', url: '#', type: 'download' }
      ]
    }
  ];

  const faqs = [
    {
      q: 'Tài liệu học tập ở đây có phải trả phí không?',
      a: 'Yipi cung cấp cả tài liệu miễn phí (như các đề thi thử, tài liệu PDF) và các liên kết mua sách bản quyền (giáo trình). Các tài liệu miễn phí có thể tải xuống trực tiếp.'
    },
    {
      q: 'Tôi nhận được gì khi tải đề thi?',
      a: 'Bạn sẽ nhận được file nén (ZIP) bao gồm đề thi định dạng PDF (đề bài và đáp án chi tiết) cùng với các file Audio (MP3) cho phần thi Nghe.'
    },
    {
      q: 'Nên chọn tài liệu học như thế nào?',
      a: 'Nếu bạn mới bắt đầu, hãy chọn Combo Giáo trình HSK 1. Nếu bạn đang chuẩn bị thi chứng chỉ, hãy làm các Đề thi HSK/TOCFL tương ứng với mục tiêu của mình.'
    }
  ];

  const filteredMaterials = activeCategory === 'all' 
    ? materials 
    : materials.filter(m => m.category === activeCategory);

  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <FolderOpen className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#C45827] text-sm font-bold uppercase tracking-wider">Tài liệu tham khảo</span>
              </div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Tài liệu học tiếng Trung</h1>
              <p className="text-[#682315]/60 text-sm">
                Kho tài liệu đa dạng: giáo trình chuyên nghiệp, đề thi sát thực tế, tài liệu luyện thi... hỗ trợ bạn tối đa trong việc tự học tiếng Trung.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#4A190F] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Materials List */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-bold text-[#4A190F] text-lg leading-snug">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        link.type === 'buy'
                          ? 'bg-[#C45827] text-white hover:bg-[#A5471E]'
                          : link.type === 'download'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {link.type === 'buy' && <ExternalLink className="w-4 h-4" />}
                      {link.type === 'download' && <Download className="w-4 h-4" />}
                      {link.type === 'video' && <PlayCircle className="w-4 h-4" />}
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
