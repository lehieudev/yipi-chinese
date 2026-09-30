import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { User, Settings, Shield, Key, LogOut, BookOpen, Globe, CreditCard, Trophy, Link as LinkIcon, Download, Check, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const { profile, setProfile, onLogout } = useOutletContext<any>();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const updates = {
        id: session.user.id,
        full_name: fullName,
        email: profile?.email || session.user.email,
        updated_at: new Date()
      };
      const { error } = await supabase.from('profiles').upsert(updates);
      if (!error) {
        setProfile({ ...profile, full_name: fullName });
        // Optional: show a toast or success message here
        alert("Lưu thông tin thành công!");
      } else {
        alert("Có lỗi xảy ra: " + error.message);
      }
    } else {
      // Demo mode
      setProfile({ ...profile, full_name: fullName });
      alert("Lưu thông tin thành công (Demo)!");
    }
    setIsSaving(false);
  };


  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: <User className="w-4 h-4" /> },
    { id: 'learning', label: 'Học tập', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'language', label: 'Ngôn ngữ', icon: <Globe className="w-4 h-4" /> },
    { id: 'security', label: 'Bảo mật', icon: <Shield className="w-4 h-4" /> },
    { id: 'payment', label: 'Thanh toán', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'rewards', label: 'XP & Phần thưởng', icon: <Trophy className="w-4 h-4" /> },
    { id: 'connections', label: 'Kết nối', icon: <LinkIcon className="w-4 h-4" /> },
    { id: 'data', label: 'Xuất dữ liệu', icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 min-h-screen pb-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Cài đặt</h1>
          <p className="text-gray-500 text-sm">Quản lý tài khoản và tùy chỉnh trải nghiệm học tập của bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#4A190F]/5">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-orange-50 text-[#C45827]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    {React.cloneElement(tab.icon, { 
                      className: `w-4 h-4 ${activeTab === tab.id ? 'text-[#C45827]' : 'text-gray-400'}` 
                    })}
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="my-4 border-t border-gray-100"></div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                  <HelpCircle className="w-4 h-4 text-gray-400" /> Trợ giúp
                </button>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4 text-red-400" /> Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6 min-w-0">
            
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                 <h2 className="text-lg font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>
                 <div className="flex flex-col sm:flex-row gap-8">
                    <div className="w-full sm:w-1/3 flex flex-col items-center">
                       <div className="w-32 h-32 bg-[#C45827]/10 rounded-full flex items-center justify-center text-4xl font-bold text-[#C45827] mb-4 overflow-hidden border border-gray-100 shadow-sm">
                         <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = ''; e.currentTarget.parentElement!.innerHTML = 'L'; }} />
                       </div>
                       <p className="text-xs font-bold text-gray-500 mb-2">JPG, PNG hoặc GIF (Tối đa 2MB)</p>
                       <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
                         Thay đổi ảnh
                       </button>
                    </div>
                    <div className="flex-1 space-y-4">
                       <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên</label>
                         <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827]" />
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                         <input type="email" value={profile?.email || "Chưa có email"} readOnly className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed outline-none" />
                       </div>
                       <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Cấp độ hiện tại</label>
                         <div className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium flex items-center justify-between">
                            <span>Level 1 - Tân binh</span>
                            <span className="text-[#C45827]">0%</span>
                         </div>
                       </div>
                       <div className="pt-4 border-t border-gray-100 flex justify-end">
                         <button onClick={handleSaveProfile} disabled={isSaving} className="px-6 py-2.5 bg-[#C45827] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#A5471E] transition-colors disabled:opacity-50">
                           {isSaving ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
                         </button>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-800">Mục tiêu học tập</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Mục tiêu HSK</label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((level) => (
                          <button key={level} className={`py-2 rounded-xl text-sm font-bold transition-all ${level === 1 ? 'bg-[#C45827] text-white shadow-md' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>
                            HSK {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <label className="block text-sm font-bold text-gray-700 mb-3">Thời gian học mỗi ngày</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border-2 border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#C45827] transition-colors">
                          <h3 className="font-bold text-gray-800 mb-1">15 phút <span className="text-xs text-gray-500 font-normal ml-1">Dễ dàng</span></h3>
                          <p className="text-xs text-gray-500">Dành cho người bận rộn</p>
                        </div>
                        <div className="border-2 border-[#C45827] bg-orange-50/50 rounded-2xl p-4 cursor-pointer relative">
                          <div className="absolute -top-3 right-3 px-2 py-0.5 bg-[#C45827] text-white text-[10px] font-bold rounded-full">ĐỀ XUẤT</div>
                          <h3 className="font-bold text-[#C45827] mb-1">30 phút <span className="text-xs text-[#C45827]/70 font-normal ml-1">Vừa phải</span></h3>
                          <p className="text-xs text-gray-600">Đảm bảo tiến độ ổn định</p>
                        </div>
                        <div className="border-2 border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#C45827] transition-colors">
                          <h3 className="font-bold text-gray-800 mb-1">60 phút <span className="text-xs text-gray-500 font-normal ml-1">Cường độ cao</span></h3>
                          <p className="text-xs text-gray-500">Học nhanh, tiến bộ nhanh</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6 flex justify-end">
                      <button className="px-6 py-2.5 bg-[#C45827] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#A5471E] transition-colors">LƯU THAY ĐỔI</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Nhắc nhở học tập</h3>
                    <p className="text-sm text-gray-500">Nhận thông báo qua email hoặc thiết bị để không bỏ lỡ ngày học nào.</p>
                  </div>
                  <div className="w-12 h-6 bg-[#C45827] rounded-full relative cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-800">Ngôn ngữ hiển thị</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border-2 border-[#C45827] bg-orange-50/30 rounded-2xl cursor-pointer">
                      <div>
                        <p className="font-bold text-gray-800">Tiếng Việt</p>
                        <p className="text-xs text-gray-500">Ngôn ngữ giao diện chính</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-[#C45827]" />
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 border-gray-100 hover:border-gray-200 rounded-2xl cursor-pointer transition-colors">
                      <div>
                        <p className="font-bold text-gray-800">English</p>
                        <p className="text-xs text-gray-500">Interface language</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <h3 className="font-bold text-gray-800 mb-4">Tùy chọn hiển thị Pinyin</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="pinyin" defaultChecked className="w-4 h-4 text-[#C45827] focus:ring-[#C45827]" />
                      <span className="text-sm font-medium text-gray-700">Luôn hiển thị Pinyin bên trên chữ Hán</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="pinyin" className="w-4 h-4 text-[#C45827] focus:ring-[#C45827]" />
                      <span className="text-sm font-medium text-gray-700">Chỉ hiển thị khi nhấp vào từ mới</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="pinyin" className="w-4 h-4 text-[#C45827] focus:ring-[#C45827]" />
                      <span className="text-sm font-medium text-gray-700">Ẩn hoàn toàn (Chế độ thử thách)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-800">Đổi mật khẩu</h2>
                  </div>
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu hiện tại</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C45827]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu mới</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C45827]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Nhập lại mật khẩu mới</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C45827]" />
                    </div>
                    <button className="px-6 py-2.5 bg-gray-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-gray-900 transition-colors mt-2">CẬP NHẬT MẬT KHẨU</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Xác thực 2 yếu tố (2FA)</h3>
                    <p className="text-sm text-gray-500">Bảo vệ tài khoản an toàn hơn khi đăng nhập từ thiết bị lạ.</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer transition-colors hover:bg-gray-300">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#4A190F] to-[#682315] rounded-3xl p-6 lg:p-8 shadow-lg text-white">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider uppercase mb-3">Gói hiện tại</div>
                      <h2 className="text-3xl font-bold font-serif mb-1">Yipi Cơ bản</h2>
                      <p className="text-white/70 text-sm">Học giới hạn 5 bài tập mỗi ngày.</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm">
                     <span className="font-medium text-sm">Nâng cấp Yipi Premium để mở khóa toàn bộ tính năng và không giới hạn lượt luyện tập.</span>
                     <button className="px-6 py-2 bg-yellow-500 text-[#4A190F] font-bold rounded-xl hover:bg-yellow-400 transition-colors whitespace-nowrap ml-4 shadow-lg shadow-yellow-500/20">
                       NÂNG CẤP NGAY
                     </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <h3 className="font-bold text-gray-800 mb-4">Lịch sử giao dịch</h3>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">Chưa có giao dịch nào.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="bg-yellow-50 border border-yellow-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                      <Trophy className="w-12 h-12 text-yellow-500 mb-3" />
                      <span className="text-3xl font-bold text-yellow-700 mb-1">0</span>
                      <span className="text-sm font-bold text-yellow-600/80 uppercase">Tổng điểm XP</span>
                   </div>
                   <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                      <div className="text-4xl mb-2">🔥</div>
                      <span className="text-3xl font-bold text-orange-700 mb-1">0</span>
                      <span className="text-sm font-bold text-orange-600/80 uppercase">Chuỗi ngày học liên tiếp</span>
                   </div>
                </div>

                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <h3 className="font-bold text-gray-800 mb-6">Cửa hàng vật phẩm</h3>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-[#C45827]/30 transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="text-3xl">❄️</div>
                        <div>
                           <h4 className="font-bold text-gray-800">Đóng băng chuỗi</h4>
                           <p className="text-sm text-gray-500">Bảo vệ chuỗi Streak của bạn nếu lỡ quên học 1 ngày.</p>
                        </div>
                     </div>
                     <button className="px-4 py-2 bg-gray-100 text-gray-800 font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-200">
                        <Trophy className="w-4 h-4 text-yellow-500" /> 200
                     </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'connections' && (
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                <div className="flex items-center gap-3 mb-6">
                  <LinkIcon className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-bold text-gray-800">Tài khoản liên kết</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                           <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-800">Google</h4>
                           <p className="text-sm text-gray-500">Đã liên kết với hieule***@gmail.com</p>
                        </div>
                     </div>
                     <button className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors">Hủy liên kết</button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                           <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-800">Facebook</h4>
                           <p className="text-sm text-gray-500">Chưa liên kết</p>
                        </div>
                     </div>
                     <button className="text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">Liên kết ngay</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Download className="w-5 h-5 text-gray-600" />
                    <h2 className="text-lg font-bold text-gray-800">Tải xuống dữ liệu</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Yêu cầu một bản sao dữ liệu cá nhân, lịch sử học tập và tiến độ của bạn. Tệp dữ liệu sẽ được gửi qua email dưới dạng JSON.
                  </p>
                  <button className="px-6 py-2.5 bg-gray-800 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-gray-900 transition-colors">YÊU CẦU DỮ LIỆU</button>
                </div>

                <div className="bg-red-50 rounded-3xl p-6 lg:p-8 border border-red-100">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h2 className="text-lg font-bold text-red-700">Xóa tài khoản</h2>
                  </div>
                  <p className="text-sm text-red-600/80 mb-6 leading-relaxed">
                    Cảnh báo: Hành động này sẽ xóa vĩnh viễn tài khoản Yipi, bao gồm toàn bộ tiến độ học tập, điểm XP và thông tin cá nhân. Bạn không thể hoàn tác hành động này.
                  </p>
                  <button className="px-6 py-2.5 bg-red-100 text-red-700 text-sm font-bold rounded-xl hover:bg-red-200 border border-red-200 transition-colors">XÓA TÀI KHOẢN VĨNH VIỄN</button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
