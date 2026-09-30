import React, { useState, useEffect } from 'react';
import { Lunar } from 'lunar-javascript';
import { Moon, CalendarDays, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'motion/react';

export const LunarCalendar: React.FC = () => {
  const { language } = useLanguage();
  const [now, setNow] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Update the time every minute to ensure the date is current
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const lunar = Lunar.fromDate(now);
  // Example: 丙午马年 (Year of the Horse)
  const lunarYearString = `${lunar.getYearInGanZhi()}${lunar.getAnimal()}年`;
  // Example: 八月廿七 (Month 8, Day 27)
  const lunarDateString = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;

  const formatter = new Intl.DateTimeFormat(
    language === 'vi' ? 'vi-VN' : language === 'zh' ? 'zh-CN' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    <div className="absolute top-24 left-0 lg:top-32 z-[50] flex items-start pointer-events-none">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isOpen ? 0 : 'calc(-100% + 40px)', // w-10 = 40px
          opacity: 1 
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="flex items-start pointer-events-auto"
      >
        <div className="pl-4 sm:pl-8 lg:pl-12 xl:pl-16 flex items-start">
          <div className="flex flex-col items-center p-3 rounded-xl bg-[#2A0F08]/40 backdrop-blur-md border border-[#FFD8C4]/20 shadow-xl shadow-black/20 hover:bg-[#2A0F08]/60 transition-colors duration-500 group cursor-default">
            
            {/* Gregorian / Western Date */}
            <div className="flex items-center gap-1.5 text-[#FFD8C4]/80 pb-2.5 border-b border-[#FFD8C4]/20 mb-3 group-hover:text-[#FFD8C4] transition-colors duration-300">
              <Moon className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                {formatter.format(now)}
              </span>
            </div>
            
            {/* Traditional Lunar Date (Vertical) */}
            <div className="flex gap-2.5 sm:gap-3 py-1">
              <div className="[writing-mode:vertical-rl] text-white/70 font-oriental text-sm sm:text-base tracking-[0.25em]">
                {lunarYearString}
              </div>
              <div className="[writing-mode:vertical-rl] text-[#FFD8C4] font-oriental text-lg sm:text-xl font-bold tracking-[0.15em] drop-shadow-md">
                {lunarDateString}
              </div>
            </div>

            {/* Small Decorative Red Stamp */}
            <div className="mt-4 w-6 h-6 rounded-sm bg-[#C45827]/90 border border-[#FFD8C4]/30 flex items-center justify-center transform rotate-3 shadow-md group-hover:-rotate-3 transition-transform duration-500">
              <span className="text-[10px] text-white font-oriental font-bold">历</span>
            </div>

          </div>
        </div>

        {/* Toggle Button / Tab */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 w-10 h-14 bg-[#2A0F08]/60 backdrop-blur-md border border-l-0 border-[#FFD8C4]/20 rounded-r-xl flex items-center justify-center text-[#FFD8C4]/80 hover:bg-[#C45827]/90 hover:text-white hover:border-[#FFD8C4]/40 transition-all duration-300 shadow-lg cursor-pointer group/btn"
          aria-label={isOpen ? "Hide calendar" : "Show calendar"}
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 opacity-80 group-hover/btn:opacity-100" />
          ) : (
            <CalendarDays className="w-5 h-5 opacity-80 group-hover/btn:opacity-100" />
          )}
        </button>

      </motion.div>
    </div>
  );
};
