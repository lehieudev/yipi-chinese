import React from 'react';
import { Trophy, Star, TrendingUp, Medal, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export const LeaderboardPage = () => {
  const topPlayers = [
    { rank: 1, name: 'Trọng Minh', xp: '179.6k', avatar: 'M', color: 'bg-yellow-400', textColor: 'text-yellow-700' },
    { rank: 2, name: 'Thùy Trang', xp: '80.002', avatar: 'T', color: 'bg-gray-300', textColor: 'text-gray-700' },
    { rank: 3, name: 'Lê Nguyễn', xp: '55.085', avatar: 'L', color: 'bg-orange-300', textColor: 'text-orange-800' },
  ];

  const players = [
    { rank: 4, name: 'Kim Chi', xp: '52.875' },
    { rank: 5, name: 'Phương Hà Trần', xp: '49.045' },
    { rank: 6, name: 'Thu Uyên Trần', xp: '37.812' },
    { rank: 7, name: 'Huy Phan', xp: '34.596' },
    { rank: 8, name: 'JHN', xp: '33.155' },
  ];

  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <Trophy className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Bảng xếp hạng</h1>
              <p className="text-[#682315]/60 text-sm">
                Cố gắng mỗi ngày, vươn lên dẫn đầu! Học tiếng Trung - Nhận ngay XP.
              </p>
            </div>
          </div>

          <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-100">
            <button className="px-6 py-2 rounded-full text-sm font-bold bg-white text-[#4A190F] shadow-sm">Tổng điểm</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Chuỗi ngày</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700">Tuần này</button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 lg:gap-8 mt-12 mb-8 h-48">
          {/* Top 2 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className={`w-16 h-16 rounded-full ${topPlayers[1].color} flex items-center justify-center text-2xl font-bold text-white border-4 border-white shadow-lg`}>
                {topPlayers[1].avatar}
              </div>
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-bold ${topPlayers[1].textColor}`}>
                2
              </div>
            </div>
            <div className="w-24 lg:w-32 h-24 bg-gradient-to-b from-gray-100 to-white rounded-t-2xl border-t-4 border-gray-300 flex flex-col items-center justify-start pt-4">
              <span className="font-bold text-[#4A190F] text-sm text-center line-clamp-1 px-2">{topPlayers[1].name}</span>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {topPlayers[1].xp}
              </span>
            </div>
          </div>

          {/* Top 1 */}
          <div className="flex flex-col items-center">
             <div className="relative mb-4">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <div className={`w-20 h-20 rounded-full ${topPlayers[0].color} flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-xl`}>
                {topPlayers[0].avatar}
              </div>
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-yellow-100 flex items-center justify-center text-sm font-bold ${topPlayers[0].textColor}`}>
                1
              </div>
            </div>
            <div className="w-28 lg:w-36 h-32 bg-gradient-to-b from-yellow-50 to-white rounded-t-2xl border-t-4 border-yellow-400 flex flex-col items-center justify-start pt-4 shadow-[0_-10px_30px_rgba(250,204,21,0.15)] relative z-10">
              <span className="font-bold text-[#4A190F] text-sm text-center line-clamp-1 px-2">{topPlayers[0].name}</span>
              <span className="text-xs text-yellow-600 font-bold flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {topPlayers[0].xp}
              </span>
            </div>
          </div>

          {/* Top 3 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className={`w-16 h-16 rounded-full ${topPlayers[2].color} flex items-center justify-center text-2xl font-bold text-white border-4 border-white shadow-lg`}>
                {topPlayers[2].avatar}
              </div>
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-orange-100 flex items-center justify-center text-xs font-bold ${topPlayers[2].textColor}`}>
                3
              </div>
            </div>
            <div className="w-24 lg:w-32 h-20 bg-gradient-to-b from-orange-50 to-white rounded-t-2xl border-t-4 border-orange-300 flex flex-col items-center justify-start pt-4">
              <span className="font-bold text-[#4A190F] text-sm text-center line-clamp-1 px-2">{topPlayers[2].name}</span>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {topPlayers[2].xp}
              </span>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#4A190F]/5">
          <div className="space-y-2">
            {players.map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-bold text-gray-400">{player.rank}</span>
                  <div className="w-10 h-10 rounded-full bg-[#C45827]/10 flex items-center justify-center text-[#C45827] font-bold">
                    {player.name.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-800">{player.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-600">{player.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
