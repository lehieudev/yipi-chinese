import React from 'react';
import { Play, Pause, Award, Clock, Sparkles } from 'lucide-react';

interface TenminSessionBarProps {
  secondsLeft: number;
  totalSeconds: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onFinishEarly: () => void;
  turnsCount: number;
}

export const TenminSessionBar: React.FC<TenminSessionBarProps> = ({
  secondsLeft,
  totalSeconds,
  isRunning,
  onToggleTimer,
  onFinishEarly,
  turnsCount
}) => {
  const elapsed = totalSeconds - secondsLeft;
  const progressPercent = Math.min(100, Math.max(0, (elapsed / totalSeconds) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine current phase based on elapsed time (10 min session)
  const getPhase = () => {
    const m = elapsed / 60;
    if (m < 2.5) return { name: 'Giai đoạn 1: Khởi động phản xạ & Chào hỏi', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (m < 6.5) return { name: 'Giai đoạn 2: Tương tác nhập vai đắm chìm', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (m < 8.5) return { name: 'Giai đoạn 3: Bắt bệnh ngữ pháp & Sửa phát âm', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { name: 'Giai đoạn 4: Đích đến lưu loát & Khắc sâu từ vựng', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  };

  const phase = getPhase();

  return (
    <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-amber-50/90 border border-[#C45827]/20 rounded-2xl p-3 sm:p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Tenmin Brand & Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#4A190F] text-amber-100 px-3 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-xs">
            <Clock className="w-4 h-4 text-[#C45827] animate-pulse" />
            <span>{formatTime(secondsLeft)}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-[#4A190F] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C45827]" />
                Phiên Học 10 Phút Tenmin
              </span>
              <span className="text-[10px] font-bold text-[#C45827] bg-[#C45827]/10 px-2 py-0.5 rounded-full border border-[#C45827]/20">
                {turnsCount} lượt đối đáp
              </span>
            </div>
            <div className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
              10 phút tập trung cao độ cùng AI giúp kích hoạt phản xạ tự nhiên
            </div>
          </div>
        </div>

        {/* Right: Controls & Phase Indicator */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className={`hidden md:inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${phase.color}`}>
            {phase.name}
          </span>

          <button
            onClick={onToggleTimer}
            className="p-2 bg-white hover:bg-orange-50 border border-[#C45827]/30 text-[#4A190F] rounded-xl transition-all shadow-xs cursor-pointer"
            title={isRunning ? 'Tạm dừng đếm thời gian' : 'Tiếp tục đếm thời gian'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#C45827]" />}
          </button>

          <button
            onClick={onFinishEarly}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C45827] hover:bg-[#A3431A] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Xem báo cáo lưu loát của phiên học"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Báo cáo 10 phút</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Milestone Markers */}
      <div className="mt-3 relative">
        <div className="w-full h-2 bg-[#4A190F]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-[#C45827] to-rose-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Dots */}
        <div className="flex justify-between items-center text-[10px] text-gray-500 mt-1 px-0.5">
          <span className="font-semibold">0:00 Khởi động</span>
          <span>3:00 Nhập vai</span>
          <span>7:00 Chữa lỗi</span>
          <span className="font-semibold text-[#C45827]">10:00 Lưu loát</span>
        </div>
      </div>
    </div>
  );
};
