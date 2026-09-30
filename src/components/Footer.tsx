import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#2A0F08] pt-24 pb-12 px-6 sm:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20 gsap-reveal">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif font-bold text-white mb-4 whitespace-pre-line">{t('footer.title')}</h2>
            <p className="text-[#FFD8C4]/70 max-w-sm font-light text-base leading-[1.6]">{t('footer.desc')}</p>
          </div>
          <div className="w-full lg:w-auto flex-1 lg:max-w-lg lg:ml-auto">
            {isSubmitted ? (
              <div className="flex items-center gap-3 bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] px-6 py-4 rounded-full animate-stagger" style={{ animationDuration: '0.4s' }}>
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{t('footer.newsletter.success')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <input
                  type="email"
                  required
                  placeholder={t('footer.newsletter.ph')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#4A190F]/30 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#C45827] focus:bg-[#4A190F]/50 transition-colors text-sm"
                />
                <button 
                  type="submit"
                  className="bg-[#C45827] hover:bg-[#D96634] text-white px-8 py-4 rounded-full text-sm font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-sm shrink-0"
                >
                  <span>{t('footer.cta')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mb-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 gsap-reveal">
          <div className="flex items-center gap-3 opacity-90">
            <div className="w-8 h-8 rounded bg-[#682315] flex items-center justify-center border border-[#FFD8C4]/20">
              <span className="text-[12px] font-serif text-[#FFD8C4] font-bold">易</span>
            </div>
            <span className="text-white font-serif font-semibold tracking-wider">YIPI CHINESE</span>
          </div>
          <div className="text-white/40 text-sm font-light">
            &copy; {new Date().getFullYear()} Yipi Education. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-5 sm:gap-6 text-white/50 text-sm font-light">
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a 
              id="footer-contact-support"
              href="mailto:support@yipichinese.com?subject=Inquiry%20from%20Potential%20Student%20-%20Yipi%20Chinese&body=Hello%20Yipi%20Team,%0A%0AI%20am%20interested%20in%20learning%20Chinese%20with%20Yipi.%20Could%20you%20please%20provide%20more%20details%20about%20the%20curriculum%20and%20enrollment?%0A%0AThank%20you!"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#FFD8C4] border border-white/10 hover:border-[#FFD8C4]/30 transition-all duration-200 text-xs font-medium tracking-wide group"
              title="Email Yipi Student Support"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFD8C4]/80 group-hover:text-[#FFD8C4] transition-colors" />
              <span>{t('footer.contact_support')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
