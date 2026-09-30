import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { TranslationKey } from '@/i18n/translations';

interface FAQItemProps {
  questionKey: TranslationKey;
  answerKey: TranslationKey;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ questionKey, answerKey, isOpen, onToggle }) => {
  const { t } = useLanguage();

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button 
        onClick={onToggle} 
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <span className="text-lg font-serif font-medium text-white group-hover:text-[#FFD8C4] transition-colors pr-8">
          {t(questionKey)}
        </span>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#C45827] border-[#C45827]' : 'bg-white/5 group-hover:bg-white/10'}`}>
          <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-white/70 font-medium leading-[1.7] text-base max-w-[75ch]">
            {t(answerKey)}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs: { q: TranslationKey; a: TranslationKey }[] = [
    { q: 'faq.q1', a: 'faq.a1' },
    { q: 'faq.q2', a: 'faq.a2' },
    { q: 'faq.q3', a: 'faq.a3' },
    { q: 'faq.q4', a: 'faq.a4' },
  ];

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-[#581F13] relative border-t border-white/5">
      <div className="max-w-[800px] mx-auto w-full relative z-10">
        <div className="text-center mb-16 gsap-reveal">
          <h2 className="text-4xl md:text-5xl font-oriental font-bold text-white mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-[#FFD8C4] text-lg font-medium leading-[1.7]">
            {t('faq.desc')}
          </p>
        </div>

        <div className="bg-[#2A0F08] border-2 border-[#1a0804] border-b-[8px] shadow-xl shadow-black/20 rounded-[32px] p-6 md:p-10 gsap-reveal">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              questionKey={faq.q}
              answerKey={faq.a}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
