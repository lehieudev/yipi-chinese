import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'vi', label: 'VN' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <div className="relative flex flex-col items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-sm font-medium text-white shadow-lg transition-colors hover:bg-white/20"
      >
        {languages.find((l) => l.code === language)?.label}
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col bg-[#682315] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl animate-stagger" style={{ animationDuration: '0.2s' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm text-left transition-colors ${
                language === lang.code
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
