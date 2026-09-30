import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { TranslationKey } from '@/i18n/translations';
import { Home, Layers, BarChart2, BookOpen, HelpCircle } from 'lucide-react';

interface Section {
  id: string;
  labelKey: TranslationKey;
  icon?: React.ReactNode;
}

const sections: Section[] = [
  { id: 'hero', labelKey: 'nav.hero', icon: <Home className="w-5 h-5" /> },
  { id: 'features', labelKey: 'nav.features', icon: <Layers className="w-5 h-5" /> },
  { id: 'statistics', labelKey: 'nav.stats', icon: <BarChart2 className="w-5 h-5" /> },
  { id: 'methodology', labelKey: 'nav.methodology', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'faq', labelKey: 'nav.faq', icon: <HelpCircle className="w-5 h-5" /> },
];

export const SideNavigation: React.FC = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Find the section currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let currentId = 'hero';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= offsetTop) {
            currentId = section.id;
          }
        }
      }
      
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Side Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col gap-4 items-end pointer-events-none">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          
          return (
            <div 
              key={section.id} 
              className="group flex items-center gap-4 cursor-pointer pointer-events-auto"
              onClick={() => scrollToSection(section.id)}
            >
              {/* Label */}
              <span className={`text-sm font-oriental transition-all duration-300 ${
                isActive 
                  ? 'text-[#FFD8C4] opacity-100 translate-x-0 font-bold drop-shadow-md' 
                  : 'text-white/50 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }`}>
                {t(section.labelKey)}
              </span>
              
              {/* Indicator Dot */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className={`absolute rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'w-6 h-6 bg-[#C45827]/20 border border-[#C45827]/50 shadow-[0_0_10px_rgba(196,88,39,0.5)]' 
                    : 'w-2 h-2 bg-white/20 group-hover:bg-white/40 group-hover:w-3 group-hover:h-3'
                }`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 z-10 ${
                  isActive ? 'bg-[#FFD8C4]' : 'bg-transparent'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex lg:hidden items-center justify-center pointer-events-auto">
        <div className="flex items-center gap-1 sm:gap-2 bg-[#2A0F08]/80 backdrop-blur-xl border border-[#FFD8C4]/20 p-2 rounded-full shadow-2xl">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative p-3 sm:px-4 sm:py-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive ? 'text-[#2A0F08] shadow-md' : 'text-[#FFD8C4]/60 hover:text-[#FFD8C4]'
                }`}
                title={t(section.labelKey)}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD8C4] to-[#FFF0E6] rounded-full z-0" />
                )}
                <span className={`relative z-10 flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {section.icon}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
