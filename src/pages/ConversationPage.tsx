import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Search, 
  MessageSquare, 
  Utensils, 
  ShoppingBag, 
  Users, 
  Clock, 
  MapPin, 
  School, 
  Wallet, 
  Stethoscope, 
  Briefcase, 
  Plane, 
  Target, 
  ChevronRight,
  Shuffle,
  Building,
  Coffee,
  Train,
  CheckCircle2
} from 'lucide-react';

interface TopicItem {
  id: string;
  hsk: string;
  hskLevel: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  category: string;
  title: string;
  pinyin: string;
  desc: string;
  goals: string[];
}

export const ConversationPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const allTopics: TopicItem[] = [
    // HSK 1
    { 
      id: 'friendship', 
      hsk: 'HSK 1',
      hskLevel: 1,
      icon: <Coffee className="w-5 h-5" />, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      category: 'CHÀO HỎI & LÀM QUEN', 
      title: 'Làm quen bạn mới ở quán cà phê', 
      pinyin: 'jiāo péngyou',
      desc: 'Gặp gỡ một người bạn Trung Quốc thân thiện, hỏi thăm quê quán, trường học và xin tài khoản WeChat.',
      goals: ['Chào hỏi và giới thiệu tên tuổi', 'Hỏi quê quán đối phương (你是哪国人 / 哪儿人)', 'Xin phương thức liên lạc WeChat (加微信)']
    },
    { 
      id: 'school', 
      hsk: 'HSK 1',
      hskLevel: 1,
      icon: <School className="w-5 h-5" />, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50', 
      category: 'TRƯỜNG LỚP', 
      title: 'Buổi học đầu tiên trong lớp', 
      pinyin: 'dì yī jié kè',
      desc: 'Bạn là học sinh mới vào lớp, chào thầy cô và làm quen với bạn cùng bàn.',
      goals: ['Chào hỏi cô giáo và bạn cùng bàn', 'Giới thiệu tên tiếng Trung của mình', 'Hỏi vị trí chỗ ngồi và mượn bút']
    },
    { 
      id: 'milktea', 
      hsk: 'HSK 1',
      hskLevel: 1,
      icon: <Wallet className="w-5 h-5" />, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      category: 'ĂN UỐNG & THANH TOÁN', 
      title: 'Gọi trà sữa & Đồ uống HeyTea', 
      pinyin: 'diǎn nǎichá',
      desc: 'Đến quầy đồ uống, chọn loại trà sữa, kích thước ly, lượng đường, đá và thanh toán quét mã.',
      goals: ['Chọn loại trà sữa và size (大杯/中杯)', 'Yêu cầu lượng đường & đá (微糖, 去冰)', 'Hỏi giá tiền và thanh toán (多少钱, 扫码)']
    },
    { 
      id: 'family', 
      hsk: 'HSK 1',
      hskLevel: 1,
      icon: <Users className="w-5 h-5" />, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50', 
      category: 'GIA ĐÌNH', 
      title: 'Giới thiệu các thành viên trong nhà', 
      pinyin: 'wǒ de jiātíng',
      desc: 'Xem ảnh gia đình và giới thiệu bố mẹ, anh chị em cùng nghề nghiệp của từng người.',
      goals: ['Nói về số lượng thành viên (我家有四口人)', 'Giới thiệu nghề nghiệp của bố mẹ', 'Nói tuổi tác của anh chị em']
    },

    // HSK 2
    { 
      id: 'restaurant', 
      hsk: 'HSK 2',
      hskLevel: 2,
      icon: <Utensils className="w-5 h-5" />, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50', 
      category: 'ẨM THỰC', 
      title: 'Đi ăn tại quán lẩu & gọi món', 
      pinyin: 'chī huǒguō',
      desc: 'Vào quán ăn, gọi bàn 2 người, xem menu gọi lẩu hai ngăn, thịt bò nấm và xin hóa đơn.',
      goals: ['Báo số lượng người và chọn bàn', 'Gọi nước lẩu và các món nhúng', 'Nhờ mang thêm gia vị hoặc tính tiền']
    },
    { 
      id: 'time', 
      hsk: 'HSK 2',
      hskLevel: 2,
      icon: <Clock className="w-5 h-5" />, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      category: 'THỜI GIAN', 
      title: 'Hỏi giờ và hẹn gặp bạn cuối tuần', 
      pinyin: 'yuè shíjiān',
      desc: 'Gọi điện thoại hẹn bạn đi xem phim hoặc uống trà vào chiều thứ Bảy lúc mấy giờ.',
      goals: ['Hỏi mấy giờ rồi (现在几点)', 'Đưa ra đề xuất thời gian hẹn cụ thể', 'Thống nhất địa điểm gặp nhau']
    },
    { 
      id: 'taxi', 
      hsk: 'HSK 2',
      hskLevel: 2,
      icon: <MapPin className="w-5 h-5" />, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      category: 'DI CHUYỂN', 
      title: 'Bắt taxi & Chỉ đường đi tham quan', 
      pinyin: 'dǎchē zhǐlù',
      desc: 'Báo bác tài xế điểm đến, hỏi thời gian đến nơi, chỉ hướng rẽ trái/phải và dừng xe.',
      goals: ['Báo điểm cần đến (师傅，我去...)', 'Hỏi thời gian ước tính (要多长时间)', 'Yêu cầu tấp vào lề dừng xe (请靠边停)']
    },
    { 
      id: 'bargain', 
      hsk: 'HSK 2',
      hskLevel: 2,
      icon: <ShoppingBag className="w-5 h-5" />, 
      color: 'text-pink-600', 
      bg: 'bg-pink-50', 
      category: 'MUA SẮM', 
      title: 'Mua sắm áo quần & Mặc cả chợ đêm', 
      pinyin: 'kǎnjià mǎi dōngxi',
      desc: 'Thử quần áo tại cửa hàng, hỏi size, thương lượng giá cả hữu nghị với chủ tiệm.',
      goals: ['Hỏi thử màu sắc hoặc size (有没有大一点的)', 'Mặc cả giảm giá (太贵了，便宜一点吧)', 'Chốt mua và lấy túi đồ']
    },

    // HSK 3
    { 
      id: 'hospital', 
      hsk: 'HSK 3',
      hskLevel: 3,
      icon: <Stethoscope className="w-5 h-5" />, 
      color: 'text-pink-600', 
      bg: 'bg-pink-50', 
      category: 'SỨC KHỎE', 
      title: 'Khám bệnh & Mua thuốc theo đơn', 
      pinyin: 'kànbìng mǎi yào',
      desc: 'Mô tả triệu chứng cảm cúm, sốt, đau họng với bác sĩ và lắng nghe hướng dẫn liều dùng thuốc.',
      goals: ['Kể triệu chứng bệnh rõ ràng (头疼, 发烧, 嗓子疼)', 'Hỏi liều lượng dùng thuốc (一天吃几次)', 'Hỏi về kiêng cữ trong ăn uống']
    },
    { 
      id: 'airport', 
      hsk: 'HSK 3',
      hskLevel: 3,
      icon: <Plane className="w-5 h-5" />, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      category: 'DU LỊCH', 
      title: 'Check-in sân bay & Thủ tục hành lý', 
      pinyin: 'jīchǎng dēngjī',
      desc: 'Đến quầy làm thủ tục bay, xuất trình hộ chiếu, chọn chỗ ngồi gần cửa sổ và gửi hành lý.',
      goals: ['Xuất trình hộ chiếu và vé (护照, 机票)', 'Yêu cầu chỗ ngồi gần cửa sổ (靠窗的座位)', 'Hỏi cửa ra tàu bay và giờ lên máy bay (登机口)']
    },
    { 
      id: 'train', 
      hsk: 'HSK 3',
      hskLevel: 3,
      icon: <Train className="w-5 h-5" />, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      category: 'GIAO THÔNG', 
      title: 'Mua vé tàu cao tốc Ga Bắc Kinh', 
      pinyin: 'mǎi gāotiě piào',
      desc: 'Mua vé tàu cao tốc khứ hồi đi Thượng Hải, chọn khoang hạng hai và xác nhận giờ tàu chạy.',
      goals: ['Hỏi chuyến tàu gần nhất đi Thượng Hải', 'Chọn ghế hạng hai (二等座)', 'Xác nhận giờ khởi hành và ga đến']
    },

    // HSK 4
    { 
      id: 'interview', 
      hsk: 'HSK 4',
      hskLevel: 4,
      icon: <Briefcase className="w-5 h-5" />, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50', 
      category: 'CÔNG VIỆC', 
      title: 'Phỏng vấn tuyển dụng công ty Trung Quốc', 
      pinyin: 'qiúzhí miànshì',
      desc: 'Gặp gỡ nhà tuyển dụng, tự giới thiệu kinh nghiệm học vấn, thế mạnh và giải quyết tình huống nghề nghiệp.',
      goals: ['Giới thiệu quá trình học tập và kinh nghiệm làm việc', 'Nêu rõ sở trường và mục tiêu phát triển bản thân', 'Hỏi về chế độ đãi ngộ hoặc quy trình đào tạo']
    },
    { 
      id: 'rent', 
      hsk: 'HSK 4',
      hskLevel: 4,
      icon: <Building className="w-5 h-5" />, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50', 
      category: 'NHÀ CỬA', 
      title: 'Thương lượng thuê căn hộ chung cư', 
      pinyin: 'zū fángzi',
      desc: 'Liên hệ chủ nhà hoặc môi giới xem căn hộ 1 phòng ngủ, hỏi tiền đặt cọc, điện nước và ký hợp đồng.',
      goals: ['Hỏi giá thuê hàng tháng và tiền cọc (押一付三)', 'Kiểm tra nội thất và đồ điện tử trong phòng', 'Thảo luận điều khoản thời hạn hợp đồng']
    },

    // HSK 5
    { 
      id: 'business', 
      hsk: 'HSK 5',
      hskLevel: 5,
      icon: <Briefcase className="w-5 h-5" />, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50', 
      category: 'THƯƠNG MẠI', 
      title: 'Đàm phán hợp đồng cung ứng hàng hóa', 
      pinyin: 'shāngwù tánpàn',
      desc: 'Họp bàn điều khoản giao hàng, chiết khấu số lượng lớn, phương thức thanh toán L/C hoặc T/T.',
      goals: ['Đề xuất mức chiết khấu theo số lượng đơn đặt', 'Thống nhất thời hạn giao hàng (交货期限)', 'Xác nhận điều khoản bồi thường vi phạm hợp đồng']
    },

    // HSK 6
    { 
      id: 'culture', 
      hsk: 'HSK 6',
      hskLevel: 6,
      icon: <MessageSquare className="w-5 h-5" />, 
      color: 'text-stone-700', 
      bg: 'bg-stone-100', 
      category: 'VĂN HÓA & XÃ HỘI', 
      title: 'Thảo luận xu hướng sống & Văn hóa trà đạo', 
      pinyin: 'wénhuà tǎolùn',
      desc: 'Trao đổi sâu về nghệ thuật trà đạo truyền thống, triết lý sống của người Á Đông và phong cách sống hiện đại.',
      goals: ['Bày tỏ quan điểm cá nhân với vốn từ thành ngữ HSK 6', 'Phân tích nét đặc trưng của văn hóa trà đạo', 'Đúc kết bài học về sự cân bằng trong cuộc sống']
    }
  ];

  const filterOptions = [
    { id: 'Tất cả' },
    { id: 'HSK 1' },
    { id: 'HSK 2' },
    { id: 'HSK 3' },
    { id: 'HSK 4' },
    { id: 'HSK 5' },
    { id: 'HSK 6' },
  ];

  // Functional filtering: actually filters by HSK level & search query
  const filteredTopics = useMemo(() => {
    return allTopics.filter((t) => {
      const matchFilter = activeFilter === 'Tất cả' || t.hsk === activeFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.pinyin.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [allTopics, activeFilter, searchQuery]);

  const handleStartConversation = (topic: TopicItem) => {
    navigate(`/app/ai-tutor?scenario=${topic.id}&hsk=${topic.hskLevel}`);
  };

  const handleRandomTopic = () => {
    const list = filteredTopics.length > 0 ? filteredTopics : allTopics;
    const randomItem = list[Math.floor(Math.random() * list.length)];
    if (randomItem) {
      handleStartConversation(randomItem);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[900px] mx-auto w-full flex flex-col gap-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-3 border border-red-100">
          <MessageCircle className="w-3.5 h-3.5" />
          HỘI THOẠI ĐÓNG VAI 1-1
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-2">Thư viện tình huống đàm thoại 1-1</h1>
        <p className="text-[#682315]/80 text-sm leading-relaxed">
          Bước vào các tình huống thực tế cùng gia sư bản ngữ 1-1. Bạn hoàn thành mục tiêu giao tiếp, được hướng dẫn câu mẫu tự nhiên và sửa lỗi ngữ pháp trực tiếp.
        </p>
      </div>

      {/* Action / Launch Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3 text-center border-b border-gray-100 pb-4">
          <div className="p-2 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 font-medium">Tình huống</div>
            <div className="text-lg font-bold text-gray-900">{allTopics.length} kịch bản</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 font-medium">Phân cấp</div>
            <div className="text-lg font-bold text-gray-900">HSK 1 - 6</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-500 font-medium">Hình thức</div>
            <div className="text-lg font-bold text-gray-900">Đàm thoại 1-1</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => handleStartConversation(allTopics[0])}
            className="flex-1 bg-[#D92D20] hover:bg-[#B91C1C] text-white py-3 px-4 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> BẮT ĐẦU VỚI TÌNH HUỐNG HSK 1
          </button>
          <button 
            onClick={handleRandomTopic}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            title="Hệ thống chọn ngẫu nhiên 1 tình huống để bạn luyện phản xạ"
          >
            <Shuffle className="w-4 h-4 text-[#C45827]" /> Đổi chủ đề ngẫu nhiên
          </button>
        </div>
      </div>

      {/* Search & Active Filter Buttons */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên tình huống, từ khóa, Pinyin..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827] outline-none text-sm shadow-xs bg-white"
          />
        </div>

        {/* Functional filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((filter) => {
            const count = filter.id === 'Tất cả' 
              ? allTopics.length 
              : allTopics.filter((t) => t.hsk === filter.id).length;
            const isSelected = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#C45827] text-white border-[#C45827] shadow-xs' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{filter.id}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic List */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 font-medium">
          <span>Đang hiển thị <strong>{filteredTopics.length}</strong> tình huống ({activeFilter})</span>
          {activeFilter !== 'Tất cả' && (
            <button 
              onClick={() => setActiveFilter('Tất cả')}
              className="text-[#C45827] hover:underline cursor-pointer"
            >
              Xem tất cả cấp độ
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredTopics.map((topic) => (
            <div 
              key={topic.id} 
              onClick={() => handleStartConversation(topic)}
              className="bg-white border border-gray-100 shadow-xs rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-red-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start sm:items-center gap-3.5 flex-1">
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${topic.bg} ${topic.color} border border-black/5`}>
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{topic.category}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-orange-50 text-[#C45827] border border-orange-200">
                      {topic.hsk}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#C45827] transition-colors flex items-center gap-2">
                    <span>{topic.title}</span>
                    <span className="text-xs font-mono font-normal text-gray-400">({topic.pinyin})</span>
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2.5">{topic.desc}</p>
                  
                  {/* Goals preview */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {topic.goals.map((g, gIdx) => (
                      <span key={gIdx} className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="line-clamp-1">{g}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sm:shrink-0 flex items-center justify-end sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                <span className="text-xs font-bold text-[#C45827] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Vào đối thoại <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}

          {filteredTopics.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500 text-sm">
              Không tìm thấy tình huống phù hợp với từ khóa "{searchQuery}".
              <br />
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('Tất cả'); }}
                className="mt-3 text-[#C45827] font-bold hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      <BeginnerRoadmap />
    </div>
  );
};
