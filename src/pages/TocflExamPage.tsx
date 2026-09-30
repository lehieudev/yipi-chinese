import React, { useState } from 'react';
import { 
  Play, Trophy, Clock, CheckCircle2, History,
  FileText, Lightbulb, Target, BookOpen, AlertCircle,
  Landmark, Lock
} from 'lucide-react';

export const TocflExamPage = () => {
  const [activeLevel, setActiveLevel] = useState('Level 1');
  const [activeTab, setActiveTab] = useState('co_ban');

  const levels = [
    { id: 'Level 1', label: 'Nhập môn - A1', active: true, locked: false },
    { id: 'Level 2', label: 'Cơ sở - A2', active: false, locked: true },
    { id: 'Level 3', label: 'Tiến cấp - B1', active: false, locked: true },
    { id: 'Level 4', label: 'Cao cấp - B2', active: false, locked: true },
    { id: 'Level 5', label: 'Lưu loát - C1', active: false, locked: true },
    { id: 'Level 6', label: 'Tinh thông - C2', active: false, locked: true },
  ];

  const exams = [
    { id: 1, title: 'Đề luyện 1', band: 'TOCFL BAND A - LEVEL 1 (A1)', time: '120 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 2, title: 'Đề luyện 2', band: 'TOCFL BAND A - LEVEL 1', time: '120 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 3, title: 'Đề luyện 3', band: 'TOCFL BAND A - LEVEL 1', time: '120 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 4, title: 'Đề luyện 4', band: 'TOCFL BAND A - LEVEL 1', time: '120 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 5, title: 'Đề luyện 5', band: 'TOCFL BAND A - LEVEL 1', time: '120 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
    { id: 6, title: 'Đề luyện 6', band: 'TOCFL BAND A - LEVEL 1', time: '120 phút', score: '100 điểm', difficulty: 'CƠ BẢN', highestScore: '-' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Banner */}
        <div className="flex-1 bg-[#FFF9F6] rounded-[24px] border border-red-900/5 overflow-hidden flex flex-col sm:flex-row items-center relative min-h-[180px]">
          <div className="p-6 sm:p-8 z-10 w-full sm:max-w-[60%] relative">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              ĐÀI LOAN - PHỒN THỂ
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4A190F] mb-2">Luyện thi <span className="text-red-600">TOCFL</span></h1>
            <p className="text-[#682315]/70 text-sm">Luyện đề Nghe + Đọc chuẩn SC-TOP bằng chữ phồn thể, chấm điểm tự động</p>
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
                  <span className="font-bold text-[#4A190F]">0 / 21</span>
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
              className={`relative flex flex-col items-center justify-center min-w-[80px] h-[60px] rounded-xl border transition-all px-4 ${
                isActive 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`font-bold text-sm ${isActive ? 'text-red-600' : 'text-gray-700'}`}>{level.id}</span>
              <span className={`text-[10px] ${isActive ? 'text-red-500' : 'text-gray-400'}`}>{level.label}</span>
              
              {/* Active Checkmark Indicator */}
              {isActive && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}

              {/* Locked Indicator */}
              {level.locked && !isActive && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center border border-gray-200">
                  <Lock className="w-2 h-2" />
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
          <h2 className="font-bold text-gray-800 mb-4">Đề thi thử TOCFL {activeLevel}</h2>
          
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
              <span className="text-lg leading-none">😌</span> Cơ bản <span className={activeTab === 'co_ban' ? 'text-green-700' : 'text-gray-400'}>6</span>
            </button>
            <button 
              onClick={() => setActiveTab('tieu_chuan')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors border flex items-center justify-center gap-1.5 ${
                activeTab === 'tieu_chuan' 
                  ? 'bg-orange-50 border-orange-200 text-orange-600' 
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg leading-none">😐</span> Tiêu chuẩn <span className={activeTab === 'tieu_chuan' ? 'text-orange-700' : 'text-gray-400'}>5</span>
            </button>
            <button 
              onClick={() => setActiveTab('nang_cao')}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-colors border flex items-center justify-center gap-1.5 ${
                activeTab === 'nang_cao' 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg leading-none">😫</span> Nâng cao <span className={activeTab === 'nang_cao' ? 'text-red-700' : 'text-gray-400'}>10</span>
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
                      <span className="text-[10px] font-medium text-gray-400 tracking-wider">
                        {exam.band}
                      </span>
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
            <h3 className="font-bold text-gray-800 text-sm mb-4 text-left">Phân tích Nghe / Đọc</h3>
            <div className="py-6 px-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Làm ít nhất 1 đề để xem phân tích phần<br/>Nghe và Đọc của bạn.
              </p>
            </div>
          </div>

          {/* Exam Tips */}
          <div className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-orange-500">
                 <Lightbulb className="w-4 h-4" />
                 <h3 className="font-bold text-gray-800 text-sm">Mẹo luyện thi TOCFL</h3>
               </div>
            </div>

            <div className="space-y-4">
              {[
                'Làm quen mặt chữ phồn thể trước — nhiều chữ khác hẳn giản thể.',
                'Phần Nghe: đọc trước câu hỏi để biết cần nghe thông tin gì.',
                'Sai ở đâu, xem giải thích tiếng Việt từng câu để học từ lỗi.'
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

      {/* Info Section */}
      <div className="mt-8 bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-[#4A190F]">TOCFL — tấm vé du học và làm việc tại Đài Loan</h2>
        </div>
        
        <div className="space-y-4 text-[13px] text-[#682315]/70 leading-relaxed">
          <p>
            TOCFL (華語文能力測驗) là kỳ thi năng lực tiếng Trung chính thức của Đài Loan, do Ủy ban SC-TOP tổ chức. Khác với HSK của Trung Quốc đại lục, TOCFL sử dụng chữ phồn thể và là chứng chỉ được yêu cầu khi xin học bổng MOE, học bổng ICDF, xét tuyển đại học hoặc xin việc tại Đài Loan.
          </p>
          <p>
            Kỳ thi chia thành 3 band: Band A (Level 1-2) cho người mới bắt đầu với khoảng 500-1.000 từ vựng, Band B (Level 3-4) trung cấp với 2.500-5.000 từ, và Band C (Level 5-6) cao cấp với hơn 8.000 từ — tương ứng khung CEFR từ A1 đến C2. Bài thi chính gồm hai phần Nghe hiểu và Đọc hiểu, toàn bộ là câu hỏi trắc nghiệm.
          </p>
          <p>
            Nếu bạn đã quen học giản thể theo HSK, luyện TOCFL ở Hanbeego là cách nhanh nhất để làm quen mặt chữ phồn thể: làm đề Level 1 miễn phí, xem giải thích tiếng Việt từng câu và theo dõi phần Nghe / Đọc nào cần ôn thêm trước kỳ thi thật.
          </p>
        </div>
      </div>
    </div>
  );
};
