import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';
import React, { useState } from 'react';
import { 
  Play, BookOpen, MessageSquare, BookA, 
  MessageCircle, Users, Clock, Utensils, ShoppingCart, 
  Home, HeartPulse, MapPin, Plane, GraduationCap, 
  Briefcase, Gamepad2, CloudSun, Globe, Laptop,
  ChevronRight, ArrowRight
} from 'lucide-react';

export const HskCurriculumPage = () => {
  const [activeLevel, setActiveLevel] = useState('HSK 1');
  const [activeTopic, setActiveTopic] = useState(1);

  const levels = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7-9'];
  const levelKanji = ['一', '二', '三', '四', '五', '六', '柒'];

  const topics = [
    { id: 1, title: 'Chào hỏi & Làm quen', icon: <MessageCircle className="w-5 h-5" />, progress: '0/7' },
    { id: 2, title: 'Gia đình & Người thân', icon: <Users className="w-5 h-5" />, progress: '0/4' },
    { id: 3, title: 'Số đếm, Thời gian & Ngày tháng', icon: <Clock className="w-5 h-5" />, progress: '0/4' },
    { id: 4, title: 'Ăn uống hằng ngày', icon: <Utensils className="w-5 h-5" />, progress: '0/6' },
    { id: 5, title: 'Mua sắm & Giá cả', icon: <ShoppingCart className="w-5 h-5" />, progress: '0/4' },
    { id: 6, title: 'Nhà ở & Sinh hoạt thường ngày', icon: <Home className="w-5 h-5" />, progress: '0/6' },
    { id: 7, title: 'Sức khỏe & Khám bệnh', icon: <HeartPulse className="w-5 h-5" />, progress: '0/4' },
    { id: 8, title: 'Hỏi đường & Phương hướng', icon: <MapPin className="w-5 h-5" />, progress: '0/9' },
    { id: 9, title: 'Đi lại, Du lịch & Khách sạn', icon: <Plane className="w-5 h-5" />, progress: '0/5' },
    { id: 10, title: 'Trường lớp & Việc học', icon: <GraduationCap className="w-5 h-5" />, progress: '0/7' },
    { id: 11, title: 'Công việc & Nghề nghiệp', icon: <Briefcase className="w-5 h-5" />, progress: '0/3' },
    { id: 12, title: 'Sở thích & Giải trí', icon: <Gamepad2 className="w-5 h-5" />, progress: '0/6' },
    { id: 13, title: 'Thời tiết', icon: <CloudSun className="w-5 h-5" />, progress: '0/4' },
    { id: 14, title: 'Giao tiếp & Quan hệ xã hội', icon: <Globe className="w-5 h-5" />, progress: '0/4' },
    { id: 15, title: 'Mạng & Công nghệ', icon: <Laptop className="w-5 h-5" />, progress: '0/3' },
  ];

  const lessons = [
    { id: 1, title: 'Làm quen lần đầu', vocab: 11, grammar: 2, convo: 1, status: 'active', duration: null },
    { id: 2, title: 'Cảm ơn và xin lỗi', vocab: 7, grammar: 2, convo: 1, status: 'locked', duration: '12 phút' },
    { id: 3, title: 'Lời xin lỗi và lời khen', vocab: 12, grammar: 2, convo: 1, status: 'locked', duration: '12 phút' },
    { id: 4, title: 'Mời bạn uống trà và xin lỗi', vocab: 7, grammar: 2, convo: 1, status: 'locked', duration: '12 phút' },
    { id: 5, title: 'Làm quen và hỏi thông tin cơ bản', vocab: 12, grammar: 2, convo: 1, status: 'locked', duration: '12 phút' },
    { id: 6, title: 'Giới thiệu một đất nước', vocab: 12, grammar: 2, convo: 1, status: 'locked', duration: '11 phút' },
    { id: 7, title: 'Gặp gỡ bạn mới', vocab: 6, grammar: 3, convo: 1, status: 'locked', duration: '14 phút' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Banner */}
        <div className="flex-1 bg-[#FFF9F6] rounded-[24px] border border-red-900/5 overflow-hidden flex flex-col sm:flex-row items-center relative min-h-[180px]">
          <div className="p-6 sm:p-8 z-10 w-full sm:max-w-[60%] relative">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              GIÁO TRÌNH HSK
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-2">Bài học <span className="text-red-600">HSK 1</span></h1>
            <p className="text-[#682315]/70 text-sm">Từ vựng có audio, ngữ pháp tiếng Việt và hội thoại thực tế – mỗi ngày 15 phút</p>
          </div>
          
          {/* Mock Image via CSS Gradients & Shapes */}
          <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[50%] bg-gradient-to-l from-[#FEE5D8] to-transparent items-end justify-end p-6 pointer-events-none">
             <div className="relative w-48 h-32 mr-8">
               <div className="absolute bottom-0 right-0 w-32 h-40 bg-white rounded-md shadow-lg transform rotate-6 border border-gray-100 flex items-center justify-center overflow-hidden">
                 <div className="text-center">
                   <div className="text-2xl font-oriental text-red-800">中文</div>
                   <div className="text-[10px] text-gray-400 mt-1">Zhongwen</div>
                 </div>
                 <div className="absolute top-0 left-0 w-4 h-full bg-red-800/10 border-r border-red-800/20"></div>
               </div>
               <div className="absolute bottom-4 right-16 w-32 h-36 bg-white rounded-md shadow-xl transform -rotate-12 border border-gray-100 flex items-center justify-center overflow-hidden">
                 <div className="text-center">
                   <div className="text-3xl font-oriental text-[#4A190F]">你好</div>
                   <div className="text-[10px] text-gray-400 mt-1">Nǐ hǎo</div>
                 </div>
                 <div className="absolute top-0 right-0 w-full h-8 bg-red-600"></div>
                 <div className="absolute top-0 left-0 w-4 h-full bg-gray-100 border-r border-gray-200"></div>
               </div>
             </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="w-full lg:w-[380px] bg-white rounded-[24px] border border-gray-100 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center gap-6">
            {/* Circular Progress */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-red-500" strokeWidth="4" strokeDasharray="100 100" strokeDashoffset="100" strokeLinecap="round" />
              </svg>
              <span className="absolute text-sm font-bold text-[#4A190F]">0%</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-[#4A190F] mb-2 text-sm">Tiến độ HSK 1</h3>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <BookOpen className="w-3.5 h-3.5" /> Bài học
                  </div>
                  <span className="font-semibold text-[#4A190F]">0 / 76</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MessageCircle className="w-3.5 h-3.5" /> Chủ đề
                  </div>
                  <span className="font-semibold text-[#4A190F]">0 / 15</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <span className="text-[11px] text-gray-400 font-medium">Đã hoàn thành</span>
            <button className="bg-[#D92D20] hover:bg-[#B91C1C] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2 shadow-sm">
              <Play className="w-4 h-4 fill-current" /> BẮT ĐẦU HỌC
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {levels.map((level, idx) => {
          const isActive = level === activeLevel;
          return (
            <button 
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                isActive 
                  ? 'bg-[#D92D20] text-white border-transparent shadow-sm' 
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {levelKanji[idx]}
              </div>
              {level}
            </button>
          )
        })}
      </div>

      {/* CONTENT LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column - Topics */}
        <div className="w-full lg:w-[320px] shrink-0 bg-white rounded-[24px] border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-[#4A190F] text-sm">Lộ trình bài học HSK 1</h2>
            </div>
            <p className="text-xs text-gray-500 ml-11">Hoàn thành từng bài để mở khoá chủ đề tiếp theo</p>
          </div>
          
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white text-[11px] font-bold text-gray-400 tracking-wider">
            <span>CHỦ ĐỀ</span>
            <span>TIẾN ĐỘ</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {topics.map(topic => {
              const isActive = topic.id === activeTopic;
              return (
                <button 
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left ${
                    isActive ? 'bg-red-50 text-[#D92D20]' : 'hover:bg-gray-50 text-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {topic.icon}
                    </div>
                    <span className={`text-sm truncate ${isActive ? 'font-bold' : 'font-medium text-[#4A190F]/70'}`}>
                      {topic.title}
                    </span>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ml-2 ${isActive ? 'text-[#D92D20]' : 'text-gray-400'}`}>
                    {topic.progress}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column - Lessons */}
        <div className="flex-1 w-full bg-white rounded-[24px] border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                 <MessageCircle className="w-5 h-5" />
               </div>
               <div>
                 <h2 className="font-bold text-lg text-[#4A190F]">Chào hỏi & Làm quen</h2>
                 <p className="text-xs text-gray-500 mt-0.5">7 bài học • 0 đã hoàn thành</p>
               </div>
             </div>
             <div className="bg-white px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#4A190F] shadow-sm">
               0/7
             </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full bg-gray-50/20">
             {lessons.map((lesson, idx) => {
               const isActive = lesson.status === 'active';
               
               return (
                 <div key={lesson.id} className={`p-5 rounded-2xl border transition-all ${
                   isActive 
                     ? 'bg-red-50/30 border-red-200 shadow-sm' 
                     : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                 }`}>
                   <div className="flex items-start gap-4">
                     {/* Number/Play Icon */}
                     {isActive ? (
                       <div className="w-10 h-10 rounded-full bg-[#D92D20] text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                         <Play className="w-4 h-4 fill-current ml-0.5" />
                       </div>
                     ) : (
                       <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 font-bold flex items-center justify-center shrink-0 border border-gray-100">
                         {lesson.id}
                       </div>
                     )}

                     {/* Content */}
                     <div className="flex-1">
                       <div className="flex items-start justify-between mb-2">
                         <h3 className={`font-bold text-base ${isActive ? 'text-[#D92D20]' : 'text-[#4A190F]'}`}>
                           Bài {lesson.id}: {lesson.title}
                         </h3>
                         {isActive ? (
                           <span className="text-xs font-bold text-[#D92D20]">Đang học</span>
                         ) : (
                           <button className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                             {lesson.duration} <ArrowRight className="w-3.5 h-3.5" />
                           </button>
                         )}
                       </div>

                       <div className="flex items-center gap-4 text-[11px] font-medium text-gray-500">
                         <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 opacity-70" /> {lesson.vocab} từ vựng</span>
                         <span className="flex items-center gap-1.5"><BookA className="w-3.5 h-3.5 opacity-70" /> {lesson.grammar} ngữ pháp</span>
                         <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 opacity-70" /> {lesson.convo} hội thoại</span>
                       </div>

                       {/* Progress Bar (Only for active) */}
                       {isActive && (
                         <div className="mt-4 flex items-center gap-3">
                           <div className="flex-1 h-1.5 bg-red-100 rounded-full overflow-hidden">
                             <div className="h-full bg-[#D92D20] w-[0%]"></div>
                           </div>
                           <span className="text-[10px] font-bold text-[#D92D20]">0%</span>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
               )
             })}
          </div>
        </div>

      </div>
    
      <BeginnerRoadmap />
    </div>
  );
};
