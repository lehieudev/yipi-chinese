import React from 'react';
import { Users, UserPlus, Search, ShieldCheck } from 'lucide-react';

export const FriendsPage = () => {
  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <Users className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Bạn bè</h1>
              <p className="text-[#682315]/60 text-sm">
                Kết nối, theo dõi tiến độ và nhắc nhở nhau cùng học mỗi ngày.
              </p>
            </div>
          </div>

          <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100">
            <button className="px-6 py-2 rounded-full text-sm font-bold bg-white text-[#4A190F] shadow-sm">Đã kết bạn (0)</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Đã gửi yêu cầu</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Gợi ý</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Tìm kiếm</button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-[#4A190F]/5 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Chưa có bạn bè nào</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Sang tab "Tìm kiếm" để kết nối với bạn bè hoặc người học khác, cùng nhau học tập hiệu quả hơn.
          </p>
          <button className="px-6 py-3 rounded-xl bg-[#C45827] text-white font-medium hover:bg-[#A5471E] transition-colors flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tìm kiếm bạn bè
          </button>
        </div>

      </div>
    </div>
  );
};
