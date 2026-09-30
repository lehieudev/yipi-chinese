import React from 'react';
import { Layers, Landmark, BrainCircuit, Users, Compass, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-[#FFD8C4]" />,
      title: t('features.item1.title'),
      desc: t('features.item1.desc')
    },
    {
      icon: <Users className="w-8 h-8 text-[#FFD8C4]" />,
      title: t('features.item2.title'),
      desc: t('features.item2.desc')
    },
    {
      icon: <Compass className="w-8 h-8 text-[#FFD8C4]" />,
      title: t('features.item3.title'),
      desc: t('features.item3.desc')
    },
    {
      icon: <Landmark className="w-8 h-8 text-[#FFD8C4]" />,
      title: t('features.item4.title'),
      desc: t('features.item4.desc')
    }
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-[#4A190F] overflow-hidden border-t border-[#FFD8C4]/10">
      {/* Decorative clouds */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C45827]/20 rounded-full blur-[100px] hidden md:block pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C45827]/10 rounded-full blur-[100px] hidden md:block pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 gsap-reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD8C4]/10 border border-[#FFD8C4]/20 text-[#FFD8C4] text-sm font-bold mb-6 drop-shadow-sm">
            <Layers className="w-4 h-4" />
            {t('features.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl font-oriental font-bold text-white leading-tight mb-6 drop-shadow-md">
            {t('features.title.1')} <br className="hidden sm:block" />
            <span className="text-[#C45827]">{t('features.title.2')}</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed font-medium">
            {t('features.desc')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group p-8 sm:p-10 rounded-[32px] bg-[#2A0F08] border-2 border-[#1a0804] border-b-[8px] hover:border-b-[4px] hover:translate-y-[4px] transition-all duration-300 shadow-xl shadow-black/20 gsap-reveal cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#C45827] border-2 border-[#8A3814] border-b-[4px] flex items-center justify-center mb-8 shadow-lg shadow-[#C45827]/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-oriental font-bold text-white mb-4 drop-shadow-sm">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed font-sans font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
