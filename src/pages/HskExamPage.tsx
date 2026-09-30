import React, { useState } from 'react';
import { 
  Play, Trophy, Clock, CheckCircle2, History,
  FileText, Lightbulb, Target, BookOpen, AlertCircle
} from 'lucide-react';

export const HskExamPage = () => {
  const [activeLevel, setActiveLevel] = useState('HSK 1');
  const [activeTab, setActiveTab] = useState('co_ban');

  const levels = [
    { id: 'HSK 1', label: 'Cơ bản', active: true },
    { id: 'HSK 2', label: 'Sơ cấp', active: false },
    { id: 'HSK 3', label: 'Trung cấp', active: false },
    { id: 'HSK 4', label: 'Trung cấp cao', active: false },
    { id: 'HSK 5', label: 'Cao cấp', active: false },
    { id: 'HSK 6', label: 'Cao cấp', active: false },
    { id: 'HSK 7-9', label: 'Thành thạo', active: false },
  ];

  const exams = [
    { id: 1, title: 'Đề luyện 1', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 2, title: 'Đề luyện 2', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 3, title: 'Đề luyện 3', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 4, title: 'Đề luyện 4', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 5, title: 'Đề luyện 5', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 6, title: 'Đề luyện 6', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 7, title: 'Đề luyện 7', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 8, title: 'Đề luyện 8', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 9, title: 'Đề luyện 9', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 10, title: 'Đề luyện 10', time: '40 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Banner */}
        <div className="flex-1 bg-[#FFF9F6] rounded-[24px] border border-red-900/5 overflow-hidden flex flex-col sm:flex-row items-center relative min-h-[180px]">
          <div className="p-6 sm:p-8 z-10 w-full sm:max-w-[60%] relative">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              Luyện thi
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-2">Luyện thi <span className="text-red-600">HSK</span></h1>
            <p className="text-[#682315]/70 text-sm">Luyện đề, làm quen cấu trúc và chinh phục HSK</p>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <FileText className="w-3.5 h-3.5" /> Đề đã làm
                  </div>
                  <span className="font-bold text-[#4A190F]">0 / 65</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Target className="w-3.5 h-3.5" /> Điểm trung bình
                  </div>
                  <span className="font-bold text-[#4A190F]">-</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5" /> Thời gian trung bình
                  </div>
                  <span className="font-bold text-[#4A190F]">-</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center mt-4">
            <button className="w-full bg-[#D92D20] hover:bg-[#B91C1C] text-white py-2.5 rounded-full text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm mb-2">
              <Play className="w-4 h-4 fill-current" /> LUYỆN ĐỀ NGAY
            </button>
            <a href="#" className="text-[11px] text-gray-400 font-medium hover:text-gray-600 flex items-center gap-1">
              <History className="w-3 h-3" /> Xem lịch sử thi
            </a>
          </div>
        </div>
      </div>

      {/* TABS - LEVELS */}
      <div className="flex flex-wrap items-center gap-3">
        {levels.map((level) => {
          const isActive = level.id === activeLevel;
          return (
            <button 
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`relative flex flex-col items-center justify-center min-w-[80px] h-[60px] rounded-xl border transition-all ${
                isActive 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`font-bold text-sm ${isActive ? 'text-red-600' : 'text-gray-700'}`}>{level.id}</span>
              <span className={`text-[10px] ${isActive ? 'text-red-500' : 'text-gray-400'}`}>{level.label}</span>
              
              {/* Active Checkmark Indicator (Only for HSK 1 in mockup) */}
              {isActive && level.id === 'HSK 1' && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* CONTENT LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mt-2">
        
        {/* Left Column - Exam List */}
        <div className="flex-1 w-full">
          <h2 className="font-bold text-gray-800 mb-4">Đề thi thử {activeLevel}</h2>
          
          {/* Sub Tabs (Cơ bản, Tiêu chuẩn, Nâng cao) */}
          <div className="flex items-center gap-2 mb-6 w-full max-w-[600px]">
            <button 
              onClick={() => setActiveTab('co_ban')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors border flex items-center justify-center gap-1.5 ${
                activeTab === 'co_ban' 
                  ? 'bg-green-50 border-green-200 text-green-600' 
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg leading-none">😌</span> Cơ bản <span className={activeTab === 'co_ban' ? 'text-green-700' : 'text-gray-400'}>25</span>
            </button>
            <button 
              onClick={() => setActiveTab('tieu_chuan')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors border flex items-center justify-center gap-1.5 ${
                activeTab === 'tieu_chuan' 
                  ? 'bg-orange-50 border-orange-200 text-orange-600' 
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg leading-none">😐</span> Tiêu chuẩn <span className={activeTab === 'tieu_chuan' ? 'text-orange-700' : 'text-gray-400'}>20</span>
            </button>
            <button 
              onClick={() => setActiveTab('nang_cao')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors border flex items-center justify-center gap-1.5 ${
                activeTab === 'nang_cao' 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg leading-none">😫</span> Nâng cao <span className={activeTab === 'nang_cao' ? 'text-red-700' : 'text-gray-400'}>20</span>
            </button>
          </div>

          {/* Exam List */}
          <div className="space-y-3">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-[20px] p-4 flex items-center justify-between border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0 text-gray-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded flex items-center gap-1 uppercase">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
                          <div className="w-1 h-2 bg-green-200 rounded-sm"></div>
                          <div className="w-1 h-2 bg-green-200 rounded-sm"></div>
                        </div>
                        {exam.difficulty}
                      </span>
                      <h3 className="font-bold text-[#4A190F] text-sm">{exam.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.time}</span>
                      <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {exam.score}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-medium">Điểm cao nhất</span>
                    <span className="font-bold text-gray-800">{exam.highestScore}</span>
                  </div>
                  <button className="px-6 py-2 rounded-full border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors">
                    LÀM BÀI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-4">
          
          {/* Weakness Analysis */}
          <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm text-center">
            <h3 className="font-bold text-gray-800 text-sm mb-4 text-left">Phân tích điểm mạnh, yếu</h3>
            <div className="py-6 px-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Làm ít nhất 1 đề thi để xem phân tích<br/>điểm mạnh, điểm yếu của bạn.
              </p>
            </div>
          </div>

          {/* Exam Tips */}
          <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-orange-500">
                 <Lightbulb className="w-4 h-4" />
                 <h3 className="font-bold text-gray-800 text-sm">Mẹo luyện thi</h3>
               </div>
               <a href="#" className="text-xs font-bold text-red-600 hover:underline">Xem thêm</a>
            </div>

            <div className="space-y-4">
              {[
                'Bấm giờ như thi thật để quen áp lực thời gian.',
                'Phần Nghe: đọc trước câu hỏi để biết cần nghe gì.',
                'Sai ở đâu, ôn lại từ vựng & ngữ pháp phần đó ngay.'
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
