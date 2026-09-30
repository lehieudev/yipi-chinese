import React, { useState } from 'react';
import { Flame, Trophy, Check, ChevronRight, Sparkles, Calendar, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DailyStreakWidgetProps {
  profile: any;
  setProfile?: React.Dispatch<React.SetStateAction<any>>;
}

export const DailyStreakWidget: React.FC<DailyStreakWidgetProps> = ({ profile, setProfile }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Helper date strings (YYYY-MM-DD)
  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = formatLocalDate(new Date());

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatLocalDate(yesterday);

  // Extract streak values from profile or metadata
  const streakCount = Number(profile?.streak ?? profile?.user_metadata?.streak ?? 0);
  const longestStreak = Number(profile?.longest_streak ?? profile?.user_metadata?.longest_streak ?? streakCount);
  const lastStudyDate = profile?.last_study_date ?? profile?.user_metadata?.last_study_date ?? null;
  const studiedDates: string[] = profile?.studied_dates ?? profile?.user_metadata?.studied_dates ?? [];

  const isCompletedToday = lastStudyDate === todayStr || studiedDates.includes(todayStr);

  // Calculate days of current week (Monday to Sunday)
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  // Distance from Monday
  const diffToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const mondayDate = new Date(now);
  mondayDate.setDate(now.getDate() + diffToMonday);

  const weekDays = [
    { label: 'T2', offset: 0 },
    { label: 'T3', offset: 1 },
    { label: 'T4', offset: 2 },
    { label: 'T5', offset: 3 },
    { label: 'T6', offset: 4 },
    { label: 'T7', offset: 5 },
    { label: 'CN', offset: 6 },
  ].map((day) => {
    const dayObj = new Date(mondayDate);
    dayObj.setDate(mondayDate.getDate() + day.offset);
    const dateKey = formatLocalDate(dayObj);
    const isToday = dateKey === todayStr;
    const isPast = dayObj < new Date(todayStr + 'T00:00:00');
    const isStudied = studiedDates.includes(dateKey) || (isToday && isCompletedToday);

    return {
      label: day.label,
      dateKey,
      isToday,
      isPast,
      isStudied,
    };
  });

  // Handle Check-in / Study action
  const handleCheckIn = async () => {
    if (isCompletedToday || isUpdating) return;
    setIsUpdating(true);

    try {
      let newStreak = 1;
      if (lastStudyDate === yesterdayStr) {
        newStreak = streakCount + 1;
      } else if (lastStudyDate === todayStr) {
        newStreak = streakCount;
      } else {
        newStreak = 1;
      }

      const newLongest = Math.max(longestStreak, newStreak);
      const newStudiedDates = Array.from(new Set([...studiedDates, todayStr]));
      const addedXp = 10;
      const newXp = (Number(profile?.xp || 0)) + addedXp;

      // Update local profile state immediately
      if (setProfile) {
        setProfile((prev: any) => ({
          ...prev,
          streak: newStreak,
          longest_streak: newLongest,
          last_study_date: todayStr,
          studied_dates: newStudiedDates,
          xp: newXp,
        }));
      }

      // Sync with Supabase Auth Metadata & DB Table
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.updateUser({
          data: {
            streak: newStreak,
            longest_streak: newLongest,
            last_study_date: todayStr,
            studied_dates: newStudiedDates,
            xp: newXp,
          },
        });

        try {
          await supabase.from('profiles').upsert({
            id: session.user.id,
            updated_at: new Date().toISOString(),
          });
        } catch {
          // ignore table column errors if schema differs
        }
      }

      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3500);
    } catch (err) {
      console.error('Failed to update streak:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Motivational message based on streak count
  const getMotivationalMessage = () => {
    if (streakCount === 0) return 'Bắt đầu thắp lửa học tập ngay hôm nay!';
    if (streakCount === 1) return 'Khởi đầu tuyệt vời! Hãy giữ vững ngọn lửa!';
    if (streakCount < 3) return 'Tuyệt vời! Bạn đang hình thành thói quen tốt!';
    if (streakCount < 7) return 'Đỉnh quá! Chuỗi ngày học liên tục không ngừng!';
    return 'Bậc thầy kiên trì! Bạn là tấm gương học tập xuất sắc!';
  };

  return (
    <div id="daily-streak-card" className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      {/* Subtle background glow when active */}
      {streakCount > 0 && (
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[#C45827]">
          <div className="relative">
            <Flame className={`w-5 h-5 ${streakCount > 0 ? 'fill-[#C45827] text-[#C45827] animate-pulse' : 'text-gray-400'}`} />
          </div>
          <h3 className="font-bold text-gray-800 text-sm">Streak hàng ngày</h3>
        </div>

        {streakCount > 0 && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#C45827] border border-orange-200">
            <Zap className="w-3 h-3 fill-current" />
            Đang cháy
          </span>
        )}
      </div>

      {/* Main Counter Display */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm ${
            streakCount > 0
              ? 'bg-gradient-to-br from-amber-400 to-[#C45827] text-white shadow-orange-500/20 scale-105'
              : 'bg-gray-100 text-gray-400 border border-gray-200'
          }`}
        >
          <Flame className={`w-8 h-8 ${streakCount > 0 ? 'fill-white text-white drop-shadow-sm' : 'text-gray-400'}`} />
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {streakCount}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              ngày liên tiếp
            </span>
          </div>
          <p className="text-xs font-semibold text-[#C45827] mt-0.5">
            {getMotivationalMessage()}
          </p>
        </div>
      </div>

      {/* Week Calendar Row */}
      <div className="flex justify-between items-center px-1 mb-6">
        {weekDays.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className={`text-[10px] font-bold ${day.isToday ? 'text-[#C45827]' : 'text-gray-400'}`}>
              {day.label}
            </span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                day.isStudied
                  ? 'bg-[#C45827] text-white shadow-xs shadow-orange-500/30'
                  : day.isToday
                  ? 'border-2 border-dashed border-[#C45827] text-[#C45827] bg-orange-50/50'
                  : 'bg-gray-50 border border-gray-100 text-gray-400'
              }`}
            >
              {day.isStudied ? (
                <Flame className="w-4 h-4 fill-white" />
              ) : day.isToday ? (
                <span className="text-[11px] font-extrabold">•</span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Action Button */}
      {isCompletedToday ? (
        <div className="w-full bg-emerald-50 text-emerald-800 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border border-emerald-200 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <p className="leading-tight">Đã điểm danh hôm nay!</p>
              <p className="text-[10px] font-medium text-emerald-600">Ngọn lửa học tập đã được thắp sáng</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
            +10 XP
          </span>
        </div>
      ) : (
        <button
          id="checkin-streak-btn"
          onClick={handleCheckIn}
          disabled={isUpdating}
          className="w-full bg-gradient-to-r from-[#C45827] to-[#E07A4A] hover:from-[#A3431A] hover:to-[#C45827] active:scale-[0.98] text-white py-3 px-4 rounded-xl font-bold transition-all text-sm shadow-sm shadow-orange-500/20 mb-3 flex items-center justify-between group disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start leading-none text-left">
              <span>Điểm danh học hôm nay</span>
              <span className="text-[10px] font-normal opacity-90 mt-1">Giữ ngọn lửa chuỗi ngày • +10 XP</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Celebration Notification */}
      {showCelebration && (
        <div className="mb-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl text-xs text-[#682315] flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-bounce" />
          <span className="font-semibold">
            Xuất sắc! Chuỗi của bạn đã tăng lên <strong>{streakCount} ngày</strong> (+10 XP)!
          </span>
        </div>
      )}

      {/* Longest Record Footer */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FAEDE6]/50 rounded-xl border border-[#4A190F]/10">
        <div className="flex items-center gap-2 text-[#4A190F]">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-semibold">
            Kỷ lục cao nhất: <strong className="text-[#C45827]">{longestStreak} ngày</strong>
          </span>
        </div>
        <span className="text-[10px] text-gray-500">
          Mục tiêu: 7 ngày
        </span>
      </div>
    </div>
  );
};
