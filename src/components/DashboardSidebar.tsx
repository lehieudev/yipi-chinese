import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Baby, Book, PlaySquare, Mic, PenTool, AudioLines, Repeat, Bot, Notebook, Library, Lightbulb, Hash, Type, Baseline, Music, MessageCircle, 
  Smartphone, 
  GraduationCap, 
  Headphones, 
  Target, 
  BookText, 
  Languages, 
  Dumbbell, 
  Gamepad2, 
  BookOpen, 
  FolderOpen, 
  Wrench, 
  Trophy, 
  Users, 
  FileText, 
  Share2, 
  Handshake, 
  Settings,
  ChevronDown,
  LogOut,
  X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

import { useTransition } from '@/contexts/TransitionContext';

export const DashboardSidebar = ({ isOpen = false, onClose, onLogout }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'khoa_hoc': true,
    'ky_nang': true,
    'luyen_tap': true,
    'tu_vung': true,
    'chu_han': true
  });

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }
    localStorage.removeItem('demo_auth');
    sessionStorage.setItem('just_logged_out', 'true');
    supabase.auth.signOut().catch(console.error);
    startTransition(() => {
      navigate('/', { replace: true, state: { skipLoading: true, fromLogout: true } });
    }, 'goodbye');
  };

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNavClick = (path: string) => {
    if (path !== '#') {
      navigate(path);
      if (onClose) onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] lg:w-72 bg-white lg:bg-white/95 lg:backdrop-blur-xl border-r border-[#4A190F]/10 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* LOGO */}
        <div className="p-4 lg:p-6 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => handleNavClick('/')}>
            <div data-flip-id="brand-logo" className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center shrink-0 will-change-transform">
              <img src="/logo.png" alt="Yipi Logo" className="w-full h-full object-contain" />
            </div>
            <span data-flip-id="brand-title" className="font-oriental font-bold text-xl lg:text-2xl text-[#4A190F] tracking-wide will-change-transform">YIPI</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 lg:hidden">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* NAV MENU */}
        <nav className="flex-1 px-3 lg:px-4 pb-6 overflow-y-auto space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* TOP LEVEL */}
          <button onClick={() => handleNavClick('/app')} className={`w-full flex items-center gap-3 px-4 py-2.5 font-semibold rounded-xl transition-colors ${location.pathname === '/app' ? 'bg-[#C45827]/10 text-[#C45827]' : 'text-[#682315]/80 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm">Dashboard</span>
          </button>
          <div className="flex items-center justify-between px-4 py-2.5 text-[#682315]/50 bg-gray-50/50 font-medium rounded-xl border border-transparent cursor-not-allowed group">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 opacity-70" />
              <span className="text-sm opacity-70">Tải ứng dụng</span>
            </div>
            <span className="text-[9px] font-bold text-[#C45827] bg-[#C45827]/10 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
              Sắp có
            </span>
          </div>

          {/* HỌC TẬP */}
          <div className="pt-4 pb-1">
            <p className="px-4 text-[10px] font-bold text-[#682315]/40 tracking-widest uppercase">Học tập</p>
          </div>
          
          <div>
            <button 
              onClick={() => toggleSection('khoa_hoc')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold rounded-xl transition-colors ${expanded['khoa_hoc'] ? 'bg-[#4A190F]/5 text-[#682315]' : 'text-[#682315]/80 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[#C45827]" />
                <span className="text-sm">Khóa học</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded['khoa_hoc'] ? 'rotate-180 text-[#C45827]' : 'text-[#682315]/40'}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${expanded['khoa_hoc'] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1">
                {[
                  { label: 'Người mới bắt đầu', path: '/app/beginner', icon: <Baby className="w-4 h-4" /> },
                  { label: 'Giáo trình HSK 1-9', path: '/app/hsk', icon: <Book className="w-4 h-4" /> },
                  { label: 'Bài tập', path: '/app/exercises', icon: <Dumbbell className="w-4 h-4" /> },
                  { label: 'Luyện thi HSK', path: '/app/exam', icon: <GraduationCap className="w-4 h-4" /> },
                  { label: 'Luyện thi TOCFL', path: '/app/tocfl', icon: <GraduationCap className="w-4 h-4" /> },
                  { label: 'Tiếng Trung qua Video', path: '/app/videos', icon: <PlaySquare className="w-4 h-4" /> }
                ].map((item, idx) => (
                  <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-2 py-1.5 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60 hover:text-[#C45827]'}`}>
                    <div className={`shrink-0 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/40'}`}>{item.icon}</div>
                    <span className="truncate text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KỸ NĂNG SECTION */}
          <div>
            <button 
              onClick={() => toggleSection('ky_nang')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold rounded-xl transition-colors ${expanded['ky_nang'] ? 'bg-[#4A190F]/5 text-[#682315]' : 'text-[#682315]/80 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5 text-[#C45827]" />
                <span className="text-sm">Kỹ năng</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded['ky_nang'] ? 'rotate-180 text-[#C45827]' : 'text-[#682315]/40'}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${expanded['ky_nang'] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1">
                {[
                  { label: 'Luyện nghe', path: '/app/listening', icon: <Headphones className="w-4 h-4" /> },
                  { label: 'Luyện nói', path: '/app/speaking', icon: <Mic className="w-4 h-4" /> },
                  { label: 'Đọc hiểu', path: '/app/reading', icon: <BookOpen className="w-4 h-4" /> },
                  { label: 'Luyện viết', path: '/app/writing', icon: <PenTool className="w-4 h-4" /> },
                  { label: 'Luyện phát âm', path: '/app/pronunciation', icon: <AudioLines className="w-4 h-4" /> },
                  { label: 'Shadowing', path: '/app/shadowing', icon: <Repeat className="w-4 h-4" /> }
                ].map((item, idx) => (
                  <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-2 py-1.5 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60 hover:text-[#C45827]'}`}>
                    <div className={`shrink-0 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/40'}`}>{item.icon}</div>
                    <span className="truncate text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LUYỆN TẬP SECTION */}
          <div>
            <button 
              onClick={() => toggleSection('luyen_tap')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold rounded-xl transition-colors ${expanded['luyen_tap'] ? 'bg-[#4A190F]/5 text-[#682315]' : 'text-[#682315]/80 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#C45827]" />
                <span className="text-sm">Luyện tập</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded['luyen_tap'] ? 'rotate-180 text-[#C45827]' : 'text-[#682315]/40'}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${expanded['luyen_tap'] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1">
                {[
                  { label: 'Ngữ pháp', path: '/app/grammar', icon: <BookText className="w-4 h-4" /> },
                  { label: 'Hội thoại', path: '/app/conversation', icon: <MessageCircle className="w-4 h-4" /> },
                  { label: 'Luyện dịch', path: '/app/translation', icon: <Languages className="w-4 h-4" /> },
                  { label: 'AI Tutor', path: '/app/ai-tutor', icon: <Bot className="w-4 h-4" /> }
                ].map((item, idx) => (
                  <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-2 py-1.5 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60 hover:text-[#C45827]'}`}>
                    <div className={`shrink-0 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/40'}`}>{item.icon}</div>
                    <span className="truncate text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TỪ VỰNG & NỀN TẢNG */}
          <div className="pt-4 pb-1">
            <p className="px-4 text-[10px] font-bold text-[#682315]/40 tracking-widest uppercase">Từ vựng & nền tảng</p>
          </div>
          
          <div>
            <button 
              onClick={() => toggleSection('tu_vung')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold rounded-xl transition-colors ${expanded['tu_vung'] ? 'bg-[#4A190F]/5 text-[#682315]' : 'text-[#682315]/80 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}
            >
              <div className="flex items-center gap-3">
                <BookText className="w-5 h-5 text-[#C45827]" />
                <span className="text-sm">Từ vựng</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded['tu_vung'] ? 'rotate-180 text-[#C45827]' : 'text-[#682315]/40'}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${expanded['tu_vung'] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1">
                {[
                  { label: 'Sổ tay từ vựng', path: '/app/notebook', icon: <Notebook className="w-4 h-4" /> },
                  { label: 'Từ vựng theo chủ đề', path: '/app/topic-vocab', icon: <Library className="w-4 h-4" /> },
                  { label: 'Mẹo nhớ từ vựng', path: '/app/vocab-tips', icon: <Lightbulb className="w-4 h-4" /> },
                  { label: 'Lượng từ', path: '/app/quantifiers', icon: <Hash className="w-4 h-4" /> }
                ].map((item, idx) => (
                  <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-2 py-1.5 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60 hover:text-[#C45827]'}`}>
                    <div className={`shrink-0 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/40'}`}>{item.icon}</div>
                    <span className="truncate text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button 
              onClick={() => toggleSection('chu_han')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold rounded-xl transition-colors ${expanded['chu_han'] ? 'bg-[#4A190F]/5 text-[#682315]' : 'text-[#682315]/80 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}
            >
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-[#C45827]" />
                <span className="text-sm">Chữ Hán & âm tiết</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded['chu_han'] ? 'rotate-180 text-[#C45827]' : 'text-[#682315]/40'}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${expanded['chu_han'] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-11 pr-4 py-1 space-y-1">
                {[
                  { label: 'Chữ Hán', path: '/app/characters', icon: <Type className="w-4 h-4" /> },
                  { label: 'Bộ thủ', path: '/app/radicals', icon: <Baseline className="w-4 h-4" /> },
                  { label: 'Âm tiết', path: '/app/syllables', icon: <Music className="w-4 h-4" /> }
                ].map((item, idx) => (
                  <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-2 py-1.5 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60 hover:text-[#C45827]'}`}>
                    <div className={`shrink-0 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/40'}`}>{item.icon}</div>
                    <span className="truncate text-left">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ÔN LUYỆN & CỘNG ĐỒNG */}
          <div className="pt-4 pb-1">
            <p className="px-4 text-[10px] font-bold text-[#682315]/40 tracking-widest uppercase">Ôn luyện & cộng đồng</p>
          </div>
          
          {[
            { icon: <Dumbbell className="w-5 h-5" />, label: 'Luyện tập tổng hợp', path: '/app/general-practice' },
            { icon: <Gamepad2 className="w-5 h-5" />, label: 'Trò chơi', path: '/app/games' },
            { icon: <BookOpen className="w-5 h-5" />, label: 'Truyện song ngữ', path: '/app/stories' },
            { icon: <FolderOpen className="w-5 h-5" />, label: 'Tài liệu học tập', path: '/app/materials' },
            { icon: <Trophy className="w-5 h-5" />, label: 'Bảng xếp hạng', path: '/app/leaderboard' },
            { icon: <Users className="w-5 h-5" />, label: 'Bạn bè', path: '/app/friends' },
            { icon: <FileText className="w-5 h-5" />, label: 'Bài viết', path: '/app/articles' },
          ].map((item, idx) => (
            <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-3 px-4 py-2.5 font-medium rounded-xl transition-colors ${location.pathname === item.path ? 'bg-[#C45827]/10 text-[#C45827]' : 'text-[#682315]/70 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}>
              {React.cloneElement(item.icon, { className: `w-5 h-5 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60'}` })}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}

          <div className="my-2 border-t border-[#4A190F]/5"></div>

          {[
            { icon: <Share2 className="w-5 h-5" />, label: 'Giới thiệu bạn bè', path: '/app/affiliate' },
            { icon: <Handshake className="w-5 h-5" />, label: 'Hợp tác', path: '/app/affiliate' },
            { icon: <Settings className="w-5 h-5" />, label: 'Cài đặt', path: '/app/settings' },
          ].map((item, idx) => (
            <button key={idx} onClick={() => handleNavClick(item.path)} className={`w-full flex items-center gap-3 px-4 py-2.5 font-medium rounded-xl transition-colors ${location.pathname === item.path ? 'bg-[#C45827]/10 text-[#C45827]' : 'text-[#682315]/70 hover:bg-[#4A190F]/5 hover:text-[#682315]'}`}>
              {React.cloneElement(item.icon, { className: `w-5 h-5 ${location.pathname === item.path ? 'text-[#C45827]' : 'text-[#682315]/60'}` })}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}

        </nav>

        <div className="p-4 border-t border-[#4A190F]/10 bg-white/50 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600/70 hover:bg-red-50 hover:text-red-700 font-medium rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
};
