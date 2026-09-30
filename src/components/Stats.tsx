import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    { value: t('stats.item1.value'), label: t('stats.item1.label') },
    { value: t('stats.item2.value'), label: t('stats.item2.label') },
    { value: t('stats.item3.value'), label: t('stats.item3.label') },
    { value: t('stats.item4.value'), label: t('stats.item4.label') },
  ];

  return (
    <section className="py-20 relative bg-[#C45827] overflow-hidden border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group gsap-reveal">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-oriental font-bold text-white mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#FFD8C4] tracking-wide uppercase drop-shadow-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
