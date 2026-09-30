import React from 'react';
import { Globe2, MessageCircle, Target } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Methodology() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#4A190F] relative">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="text-center mb-20 gsap-reveal">
          <h2 className="text-4xl md:text-5xl font-oriental font-bold text-white mb-6 drop-shadow-md">{t('meth.title')}</h2>
          <p className="text-[#FFD8C4] max-w-[65ch] mx-auto text-lg font-medium leading-[1.7] drop-shadow-sm">
            {t('meth.desc')}
          </p>
        </div>
        
        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Wide Layout */}
          <div className="col-span-1 lg:col-span-7 bg-[#2A0F08] border-2 border-[#1a0804] border-b-[8px] rounded-[32px] p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-b-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer gsap-reveal shadow-xl shadow-black/20 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C45827] border-2 border-[#8A3814] border-b-[4px] flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-[#C45827]/20">
              <Globe2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD8C4]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-oriental font-bold text-white mb-4 drop-shadow-sm">{t('meth.card1.title')}</h3>
            <p className="text-white/80 font-medium leading-[1.7] text-base max-w-[50ch]">
              {t('meth.card1.desc')}
            </p>
          </div>

          {/* Card 2: Square Layout */}
          <div className="col-span-1 lg:col-span-5 bg-[#2A0F08] border-2 border-[#1a0804] border-b-[8px] rounded-[32px] p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-b-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer gsap-reveal shadow-xl shadow-black/20 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C45827] border-2 border-[#8A3814] border-b-[4px] flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-[#C45827]/20">
              <Target className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD8C4]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-oriental font-bold text-white mb-4 drop-shadow-sm">{t('meth.card2.title')}</h3>
            <p className="text-white/80 font-medium leading-[1.7] text-base">
              {t('meth.card2.desc')}
            </p>
          </div>

          {/* Card 3: Full Width Horizontal Layout */}
          <div className="col-span-1 lg:col-span-12 bg-[#2A0F08] border-2 border-[#1a0804] border-b-[8px] rounded-[32px] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col md:flex-row md:items-center gap-6 sm:gap-8 lg:gap-14 hover:border-b-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer gsap-reveal shadow-xl shadow-black/20 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-[#C45827] border-2 border-[#8A3814] border-b-[4px] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-lg shadow-[#C45827]/20">
              <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFD8C4]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-oriental font-bold text-white mb-4 drop-shadow-sm">{t('meth.card3.title')}</h3>
              <p className="text-white/80 font-medium leading-[1.7] text-base max-w-[75ch]">
                {t('meth.card3.desc')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
