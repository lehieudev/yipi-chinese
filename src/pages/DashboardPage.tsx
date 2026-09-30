import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Star,
  PlayCircle,
  Menu,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { DashboardSidebar } from '@/components/DashboardSidebar';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (data) {
        setProfile(data);
      } else {
        // Fallback if profile doesn't exist yet but user is logged in
        setProfile({ full_name: session.user.user_metadata?.full_name || 'Học viên' });
      }
    };
    
    fetchUser();
  }, [navigate]);

  if (!profile) {
    return <div className="min-h-screen bg-[#2A0F08] flex items-center justify-center text-[#FFD8C4]">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAEDE6] font-sans flex text-[#4A190F]">
      
      {/* ============================================================== */}
      {/* LEFT SIDEBAR                                                   */}
      {/* ============================================================== */}
      <DashboardSidebar />

      {/* ============================================================== */}
      {/* MAIN CONTENT AREA                                              */}
      {/* ============================================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* HEADER */}
        <header className="h-24 bg-[#FAEDE6] border-b border-[#4A190F]/5 sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4 lg:hidden">
            <Menu className="w-6 h-6 text-[#4A190F]" />
            <span className="font-oriental font-bold text-xl text-[#4A190F]">YIPI</span>
          </div>

          {/* Stats Bar */}
          <div className="hidden lg:flex items-center gap-6 bg-white px-5 py-2.5 rounded-[20px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
                <BookOpen className="w-4 h-4 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">HSK hiện tại</span>
                <span className="font-bold text-gray-800 text-sm leading-none">HSK {profile.target_hsk_level || 1}</span>
              </div>
            </div>
            
            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-red-50 flex items-center justify-center relative shrink-0">
                 <svg className="w-full h-full -rotate-90 text-red-50" viewBox="0 0 36 36"><path className="fill-none stroke-current" strokeWidth="2" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                 <div className="absolute inset-0 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">Tiến độ tổng thể</span>
                <span className="font-bold text-gray-800 text-sm leading-none">0%</span>
              </div>
            </div>

            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">Streak</span>
                <span className="font-bold text-gray-800 text-sm leading-none">0 ngày</span>
              </div>
            </div>
            
            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">XP</span>
                <span className="font-bold text-gray-800 text-sm leading-none">0</span>
              </div>
            </div>

            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3 pr-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-red-500 text-xl font-bold">
                ❤️
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">Tim</span>
                <span className="font-bold text-gray-800 text-sm leading-none">5</span>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-gray-600 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-tight">{profile.full_name}</p>
                <p className="text-[11px] text-red-500 font-bold">Level 1</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-cover bg-center text-white flex items-center justify-center font-bold text-lg overflow-hidden shadow-sm">
                 {profile.avatar_url ? (
                   <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full bg-[#C45827] flex items-center justify-center">
                     {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                   </div>
                 )}
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-6 lg:p-8 xl:px-12 max-w-[1600px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 bg-transparent">
          
          {/* Left / Center Column (Main feed) */}
          <div className="xl:col-span-8 lg:col-span-8 space-y-6">
            
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FFF5F1] to-[#FFEFE8] p-8 lg:p-12 shadow-sm border border-red-900/5">
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <div className="relative z-10 max-w-xl">
                <h1 className="text-3xl lg:text-[2.5rem] font-bold text-[#4A190F] mb-3 leading-tight tracking-tight">
                  Nâng cao mỗi ngày<br/>
                  <span className="text-[#C45827]">Tiến bộ không ngừng!</span>
                </h1>
                <p className="text-[#682315]/80 text-base mb-8 font-medium">
                  Học tiếng Trung mỗi ngày giúp bạn mở<br/>ra những cơ hội mới, {profile.full_name || 'bạn nhé'}.
                </p>
                <button className="bg-[#C45827] hover:bg-[#A3431A] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                  BẮT ĐẦU HỌC NGAY
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative elements to mimic screenshot */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 hidden md:block">
                {/* Mock image placeholder representing the Chinese book & flowers from the screenshot */}
                <div className="w-full h-full bg-contain bg-no-repeat bg-center opacity-80 mix-blend-multiply" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23C45827\' stroke-width=\'1\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\'%3E%3C/path%3E%3Cpath d=\'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\'%3E%3C/path%3E%3C/svg%3E")'}}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tiếp tục học Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-[#C45827]">
                  <PlayCircle className="w-5 h-5 fill-current" />
                  <h3 className="font-bold text-gray-800 text-sm">Tiếp tục học</h3>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                    <span className="text-3xl">🐼</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-base mb-1">Bài 1: Làm quen lần đầu</h4>
                    <p className="text-xs text-gray-500 font-medium">Giáo trình HSK 1 • 11 từ mới</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                    <span>Tiến độ bài học</span>
                    <span className="text-[#C45827]">0%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-5">
                    <div className="h-full bg-[#C45827] w-0"></div>
                  </div>
                  <button className="w-full bg-[#C45827] hover:bg-[#A3431A] text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <PlayCircle className="w-5 h-5" />
                    BẮT ĐẦU HỌC
                  </button>
                </div>
              </div>

              {/* Thống kê học tập */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-[#C45827]">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="font-bold text-gray-800 text-sm">Thống kê học tập</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {[
                    { label: 'Bài học đã học', val: '0', icon: <BookOpen className="w-5 h-5 text-red-500" />, bg: 'bg-red-50' },
                    { label: 'Từ vựng đã học', val: '0', icon: <span className="font-serif font-bold text-gray-500 text-lg">A</span>, bg: 'bg-gray-50' },
                    { label: 'XP tuần này', val: '0', icon: <Flame className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50' },
                    { label: 'Từ thành thạo', val: '0', icon: <Trophy className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                        {stat.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-xl leading-none mb-1">{stat.val}</span>
                        <span className="text-[10px] text-gray-500 font-semibold">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:bg-gray-50 py-3 rounded-xl border border-gray-100 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  Xem thống kê chi tiết
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recommended Video Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center border border-green-100">
                    <PlayCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Học qua video</h2>
                  <div className="hidden md:flex items-center gap-2 ml-4">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md uppercase">MIỄN PHÍ</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md uppercase">Phụ đề đồng bộ</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md uppercase">Luyện nghe</span>
                  </div>
                </div>
                <a href="#" className="text-sm font-bold text-green-600 hover:underline flex items-center gap-1">Tất cả video <ChevronRight className="w-4 h-4" /></a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'Cách gọi trà sữa bằng tiếng Trung', img: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=300&auto=format&fit=crop' },
                  { title: 'Một ngày của tôi', img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=300&auto=format&fit=crop' },
                  { title: 'Trò chuyện năm mới bằng tiếng Trung', img: 'https://images.unsplash.com/photo-1549694200-a4fc8b99dce4?q=80&w=300&auto=format&fit=crop' },
                  { title: 'Ngày đầu tiên đi học', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300&auto=format&fit=crop' }
                ].map((vid, i) => (
                  <div key={i} className="group flex flex-col gap-2 cursor-pointer">
                    <div className="aspect-video bg-gray-100 rounded-xl relative flex items-center justify-center overflow-hidden border border-gray-200">
                       <img src={vid.img} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                       <PlayCircle className="w-10 h-10 text-white opacity-90 drop-shadow-lg z-10" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-tight">{vid.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Bài học đề xuất */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-100">
                    <span className="text-sm">🪄</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">Bài học đề xuất cho bạn</h2>
                </div>
                <a href="#" className="text-sm font-bold text-red-600 hover:underline flex items-center gap-1">Xem tất cả <ChevronRight className="w-4 h-4" /></a>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { tag: 'Từ vựng', title: 'Từ vựng theo chủ đề', desc: 'Học theo nhóm nghĩa', icon: '🐼' },
                  { tag: 'Ngữ pháp', title: 'Cấu trúc câu HSK', desc: 'Ngữ pháp trọng tâm', icon: '🐼' },
                  { tag: 'Luyện nghe', title: 'Hội thoại thực tế', desc: 'Luyện phản xạ nghe', icon: '🐼' },
                  { tag: 'Luyện nói', title: 'Phát âm chuẩn', desc: 'Chấm điểm phát âm', icon: '🐼' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-red-200 transition-colors cursor-pointer group flex flex-col relative overflow-hidden">
                    <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                      <BookOpen className="w-3 h-3" />
                      {item.tag}
                    </div>
                    
                    <div className="w-20 h-20 mx-auto mt-6 mb-2 bg-gray-50 rounded-xl flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    
                    <div className="absolute right-3 top-28 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-md">
                      <PlayCircle className="w-5 h-5" />
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-50">
                      <h3 className="font-bold text-gray-800 text-sm mb-0.5">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-gray-500 font-medium">{item.desc}</p>
                        <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">HSK 1</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Widgets) */}
          <div className="xl:col-span-4 lg:col-span-4 space-y-6">
            
            {/* Streak Widget */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-orange-500">
                <Flame className="w-5 h-5 fill-current" />
                <h3 className="font-bold text-gray-800 text-sm">Streak của bạn</h3>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center shrink-0 shadow-inner">
                  <Flame className="w-7 h-7 text-orange-500 fill-orange-500" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <span className="text-sm font-medium text-gray-600">ngày liên tiếp</span>
                  </div>
                  <p className="text-xs font-bold text-orange-500">Cố gắng quá! 👍</p>
                </div>
              </div>

              <div className="flex justify-between items-center px-1 mb-6">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400">{day}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center bg-gray-50"></div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-bold transition-colors text-sm border border-red-100 mb-3 flex items-center justify-center gap-2">
                <span className="text-lg">📅</span>
                <div className="flex flex-col items-start leading-none">
                  <span>Điểm danh hôm nay</span>
                  <span className="text-[10px] font-medium opacity-80 mt-1">Giữ chuỗi ngày học • +5 XP</span>
                </div>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>

              <div className="flex items-center justify-between px-4 py-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-2 text-yellow-700">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-bold">Kỷ lục: 0 ngày</span>
                </div>
                <ChevronRight className="w-4 h-4 text-yellow-600" />
              </div>
            </div>

            {/* Partners Widget */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-green-600">
                <span className="text-lg">🤝</span>
                <h3 className="font-bold text-gray-800 text-sm">Đối tác & Nhà tài trợ</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                {[
                  { name: 'Giáo viên: Ly Phạm', desc: 'Trung tâm Hoài Ngô: 0933165673', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=100&auto=format&fit=crop' },
                  { name: 'Giáo viên: Mai Quí', desc: 'Dạy tiếng Trung online: 0344682135', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' }
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={p.img} alt={p.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-xs">{p.name}</span>
                        <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase border border-green-200">Đối tác</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-between text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-colors">
                Trở thành đối tác
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Daily Challenge */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-5">
                 <div className="flex items-center gap-2 text-red-500">
                   <span className="text-lg">🎁</span>
                   <h3 className="font-bold text-gray-800 text-sm">Thử thách hằng ngày</h3>
                 </div>
                 <span className="text-red-600 font-bold text-sm tracking-widest">10:03:43</span>
               </div>

               <div className="space-y-5">
                 {[
                   { label: 'Ôn 30 từ', max: 30, current: 0, icon: <BookOpen className="w-4 h-4" /> },
                   { label: 'Ôn 10 từ', max: 10, current: 0, icon: <TrendingUp className="w-4 h-4" /> },
                   { label: 'Kiếm 50 XP', max: 50, current: 0, icon: <Flame className="w-4 h-4 text-orange-500" /> },
                 ].map((c, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                       {c.icon}
                     </div>
                     <div className="flex-1">
                       <div className="flex justify-between text-xs font-bold mb-1.5">
                         <span className="text-gray-700">{c.label}</span>
                         <span className="text-gray-400">{c.current}/{c.max}</span>
                       </div>
                       <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div className="h-full bg-red-500 w-0"></div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-5 text-center text-[11px] font-bold text-gray-500 border-t border-gray-100 pt-4">
                 Hoàn thành tất cả để nhận <span className="text-red-600">135 XP!</span>
               </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
               <div className="flex items-center justify-between mb-5">
                 <div className="flex items-center gap-2 text-yellow-500">
                   <Trophy className="w-5 h-5 fill-current" />
                   <h3 className="font-bold text-gray-800 text-sm">Bảng xếp hạng</h3>
                 </div>
                 <a href="#" className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1">Xem tất cả <ChevronRight className="w-3 h-3" /></a>
               </div>

               <div className="space-y-1">
                 {[
                   { rank: 1, name: 'Thủy nguyễn', level: 8, xp: '1.665', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop' },
                   { rank: 2, name: 'Trung Nguyễn', level: 4, xp: '1.460', avatar: '' },
                   { rank: 3, name: 'Minh Hà Danh', level: 8, xp: '1.410', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' },
                 ].map((u, i) => (
                   <div key={i} className="flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-gray-50 transition-colors">
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                       u.rank === 1 ? 'bg-yellow-400 text-white shadow-sm' : 
                       u.rank === 2 ? 'bg-gray-300 text-white shadow-sm' : 
                       'bg-orange-300 text-white shadow-sm'
                     }`}>
                       {u.rank}
                     </div>
                     <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                       {u.avatar ? <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" /> : u.name.charAt(0)}
                     </div>
                     <div className="flex-1">
                       <h4 className="font-bold text-gray-800 text-xs">{u.name}</h4>
                       <p className="text-[10px] text-gray-500 font-medium">Level {u.level}</p>
                     </div>
                     <div className="text-right">
                       <span className="font-bold text-gray-800 text-xs">{u.xp}</span>
                       <span className="text-[9px] text-gray-400 ml-1 font-bold">XP</span>
                     </div>
                   </div>
                 ))}

                 {/* Current User Rank */}
                 <div className="flex items-center gap-3 py-3 px-3 mt-3 rounded-xl bg-red-50 border border-red-100">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                      -
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                      {profile.avatar_url ? <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" /> : profile.full_name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-xs">{profile.full_name} <span className="text-red-500">(Bạn)</span></h4>
                      <p className="text-[10px] text-gray-500 font-medium">Level 1</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800 text-xs">0</span>
                      <span className="text-[9px] text-gray-400 ml-1 font-bold">XP</span>
                    </div>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};
