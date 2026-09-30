import React, { useState } from 'react';
import { Gamepad2, Play, Users, Trophy, ChevronRight, Swords, Brain, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const GamesPage = () => {
  const games = [
    {
      id: 1,
      title: 'Đấu trường PK',
      desc: 'Thi đấu thời gian thực với người chơi khác',
      icon: <Swords className="w-8 h-8 text-rose-500" />,
      color: 'bg-rose-50 border-rose-100',
      textColor: 'text-rose-700',
      tag: 'HOT',
      players: '1.2k đang chơi'
    },
    {
      id: 2,
      title: 'Ghép chữ siêu tốc',
      desc: 'Nối bộ thủ tạo thành chữ Hán có nghĩa',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100',
      textColor: 'text-blue-700',
      tag: 'Luyện tập',
      players: '856 đang chơi'
    },
    {
      id: 3,
      title: 'Đuổi hình bắt chữ',
      desc: 'Nhìn hình đoán từ vựng tiếng Trung',
      icon: <Gamepad2 className="w-8 h-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-100',
      textColor: 'text-emerald-700',
      tag: 'Vui nhộn',
      players: '2.1k đang chơi'
    }
  ];

  return (
    <div className="flex-1 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#4A190F]/5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C45827]/10 flex items-center justify-center shrink-0">
              <Gamepad2 className="w-8 h-8 text-[#C45827]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#C45827] text-sm font-bold uppercase tracking-wider">Học mà chơi</span>
              </div>
              <h1 className="text-2xl font-bold text-[#4A190F] mb-2 font-oriental">Chơi mà giỏi!</h1>
              <p className="text-[#682315]/60 text-sm">
                Vừa giải trí, vừa ôn tập từ vựng, ngữ pháp. Tích lũy điểm kinh nghiệm và nhận phần thưởng hấp dẫn!
              </p>
            </div>
          </div>
        </div>

        {/* Games List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <motion.div 
              key={game.id}
              whileHover={{ y: -5 }}
              className={`relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden group cursor-pointer`}
            >
              <div className={`w-16 h-16 rounded-2xl ${game.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {game.icon}
              </div>
              
              <div className="absolute top-6 right-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${game.color} ${game.textColor}`}>
                  {game.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#4A190F] mb-2">{game.title}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{game.desc}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <Users className="w-4 h-4" />
                  {game.players}
                </div>
                <button className="w-10 h-10 rounded-full bg-[#C45827] text-white flex items-center justify-center shadow-md shadow-[#C45827]/30 group-hover:bg-[#A5471E] transition-colors">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
