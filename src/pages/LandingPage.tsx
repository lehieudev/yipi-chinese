import React, { useState, useRef } from 'react';
import { ArrowRight, BookOpen, Play, CheckCircle2, X, User } from 'lucide-react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { Cloud } from '@/components/Cloud';
import { HeroEmblem } from '@/components/HeroEmblem';
import { useFluidClouds } from '@/hooks/useFluidClouds';
import { Methodology } from '@/components/Methodology';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { PalaceDoorTransition } from '@/components/PalaceDoorTransition';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { BrandLogo } from '@/components/BrandLogo';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { LunarCalendar } from '@/components/LunarCalendar';
import { SideNavigation } from '@/components/SideNavigation';
import { Features } from '@/components/Features';
import { Stats } from '@/components/Stats';
import { AuthModal } from '@/components/AuthModal';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollProgress } from '@/components/ScrollProgress';
import { NaturalParticles } from '@/components/NaturalParticles';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Custom cubic-bezier easing tailored for Yipi's fluid oriental aesthetic (Chinese calligraphy stroke dynamics)
// Starts with deliberate poise, sweeps smoothly, and settles gracefully into place without harsh bounce
CustomEase.create('yipiEase', '0.22, 1, 0.36, 1');
CustomEase.create('yipiSilk', '0.25, 0.95, 0.33, 1');

export const LandingPage = () => {
  const { cloud1Ref, cloud2Ref, cloud3Ref, cloud4Ref, cloud5Ref, cloud6Ref, cloud7Ref, cloud8Ref, cloud9Ref, cloud10Ref, cloud11Ref, cloud12Ref, cloud13Ref } = useFluidClouds();
  const { t } = useLanguage();
  const location = useLocation();
  const [modalMode, setModalMode] = useState<'login' | 'register' | null>(null);
  const [isLoading, setIsLoading] = useState(!location.state?.skipLoading);
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);


  // Setup Lenis for smooth scrolling
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerObj = {
      update: (time: number) => {
        lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(tickerObj.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerObj.update);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // 1. Animate sections that DON'T have specific reveal items
      const sections = gsap.utils.toArray('.gsap-section') as HTMLElement[];
      sections.forEach((section) => {
        const revealElements = section.querySelectorAll('.gsap-reveal');
        if (revealElements.length === 0) {
          gsap.set(section, { willChange: 'opacity, transform' });
          gsap.fromTo(section, 
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "yipiEase",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });

      // 2. Elements fade and translate into view as user scrolls down, using custom cubic-bezier easing
      const revealItems = gsap.utils.toArray('.gsap-reveal') as HTMLElement[];
      gsap.set(revealItems, { opacity: 0, y: 45, willChange: 'opacity, transform' });
      
      ScrollTrigger.batch(revealItems, {
        interval: 0.08,
        batchMax: 4,
        start: "top 85%",
        onEnter: batch => gsap.to(batch, { 
          opacity: 1, 
          y: 0, 
          stagger: 0.12, 
          duration: 0.95, 
          ease: "yipiEase", 
          overwrite: true 
        }),
        onLeaveBack: batch => gsap.to(batch, { 
          opacity: 0, 
          y: 45, 
          stagger: 0.06, 
          duration: 0.55, 
          ease: "yipiEase", 
          overwrite: true 
        })
      });

      
      // 3. Parallax scroll effect (Desktop Only to prevent layout breaking on mobile)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const parallaxElements = gsap.utils.toArray('.gsap-parallax') as HTMLElement[];
        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
          gsap.fromTo(el, 
            { y: () => -100 * speed },
            {
              y: () => window.innerHeight * speed,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        });
        
        const heroParallax = gsap.utils.toArray('.hero-parallax') as HTMLElement[];
        heroParallax.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.3');
          gsap.to(el, {
            y: () => (ScrollTrigger.maxScroll(window) * speed),
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        });
      });
}
  }, { scope: container });

  // Redirect to dashboard if logged in (initial load only)
  React.useEffect(() => {
    // If navigated from logout, prevent any redirection back to /app
    if (location.state?.fromLogout || sessionStorage.getItem('just_logged_out') === 'true') {
      sessionStorage.removeItem('just_logged_out');
      return;
    }

    const isDemo = localStorage.getItem('demo_auth') === 'true';
    if (isDemo) {
      navigate('/app');
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/app');
      }
    });
  }, [navigate, location.state]);

  return (
    <>
      <ScrollProgress />
      <NaturalParticles />
      <SideNavigation />
      {isLoading && <PalaceDoorTransition mode="welcome" onComplete={() => setIsLoading(false)} />}
      <BrandLogo />
    
    {/* Floating Header Actions */}
    <div className="fixed top-4 right-4 lg:top-8 lg:right-10 xl:right-16 z-[60] flex items-center gap-2 sm:gap-4">
      <button 
        onClick={() => setModalMode('login')}
        className="flex items-center px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all backdrop-blur-md shadow-lg"
      >
        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
        {t('nav.login')}
      </button>
      <LanguageSwitcher />
    </div>

    <div ref={container} className="w-full bg-[#C45827] overflow-x-hidden font-sans selection:bg-[#682315]">
      <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-28 lg:pb-24">
        <LunarCalendar />
        
        {/* DEEP BACKGROUND MASSIVE FOG CLOUDS */}
        <Cloud ref={cloud10Ref} type={5} className="hero-parallax-bg absolute -top-32 -left-32 w-[600px] sm:w-[800px] z-0 opacity-15 blur-2xl hidden md:block pointer-events-none" />
        <Cloud ref={cloud11Ref} type={4} className="hero-parallax-bg absolute top-1/4 -right-48 w-[700px] sm:w-[900px] z-0 opacity-20 blur-[40px] hidden md:block pointer-events-none" />
        <Cloud ref={cloud12Ref} type={3} className="hero-parallax-bg absolute -bottom-48 left-1/4 w-[900px] sm:w-[1200px] z-0 opacity-25 blur-3xl hidden md:block pointer-events-none" />
        <Cloud ref={cloud13Ref} type={2} className="hero-parallax-bg absolute -top-20 left-1/3 w-[800px] sm:w-[1000px] z-0 opacity-15 blur-[50px] hidden md:block pointer-events-none" />

        {/* MIDGROUND & FOREGROUND CLOUDS */}
        <Cloud ref={cloud4Ref} type={4} data-speed="0.1" className="gsap-parallax absolute top-6 sm:top-12 left-10 sm:left-1/4 w-32 sm:w-44 z-0 opacity-75" />
        <Cloud ref={cloud1Ref} type={1} data-speed="0.2" className="gsap-parallax absolute -top-4 sm:top-6 right-2 sm:right-12 lg:right-20 w-48 sm:w-64 lg:w-80 z-0 pointer-events-none" />
        <Cloud ref={cloud2Ref} type={2} data-speed="0.15" className="gsap-parallax absolute top-1/4 sm:top-1/3 -left-12 sm:-left-6 lg:left-2 w-44 sm:w-60 lg:w-72 z-0 pointer-events-none" />
        <Cloud ref={cloud5Ref} type={5} data-speed="0.25" className="gsap-parallax absolute bottom-16 sm:bottom-24 right-4 sm:right-16 lg:right-28 w-36 sm:w-52 z-0 opacity-75 pointer-events-none" />
        <Cloud ref={cloud3Ref} type={3} data-speed="-0.1" className="gsap-parallax absolute -bottom-10 sm:-bottom-16 left-1/2 w-72 sm:w-[450px] lg:w-[600px] z-0 opacity-80 pointer-events-none" />
        <Cloud ref={cloud6Ref} type={3} className="absolute -top-12 sm:-top-8 left-1/3 w-56 sm:w-72 lg:w-96 z-0 opacity-60 pointer-events-none" />
        <Cloud ref={cloud7Ref} type={4} className="absolute top-1/2 -right-16 w-52 sm:w-64 lg:w-80 z-0 opacity-60 pointer-events-none" />
        <Cloud ref={cloud8Ref} type={2} className="absolute bottom-4 sm:bottom-12 -left-20 w-60 sm:w-80 lg:w-[400px] z-0 opacity-70 pointer-events-none" />
        <Cloud ref={cloud9Ref} type={5} className="absolute top-1/4 sm:top-1/4 left-1/4 w-40 sm:w-48 lg:w-64 z-0 opacity-50 pointer-events-none" />

      <div data-speed="0.4" className="hero-parallax max-w-[1400px] mx-auto w-full px-6 sm:px-12 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center relative z-20">
        
        <div className="flex flex-col justify-center">
          <h1 className="animate-stagger text-4xl sm:text-[3.5rem] lg:text-[3.25rem] xl:text-[4rem] font-bold font-oriental leading-[1.25] tracking-tight text-white drop-shadow-sm" style={{ animationDelay: '100ms' }}>
            {t('hero.title').split('\n')[0]}
            <br />
            <span className="text-[#FFD8C4] inline-block my-1.5 font-oriental">
              {t('hero.title').split('\n')[1]}
            </span>
            <br />
            {t('hero.title').split('\n')[2]}
          </h1>

          <p className="animate-stagger text-sm tracking-[0.2em] text-[#FFD8C4] mt-6 font-serif" style={{ animationDelay: '200ms' }}>
            {t('hero.subtitle')}
          </p>

          <p className="animate-stagger text-base lg:text-lg font-light text-white/80 leading-relaxed mt-5 max-w-lg font-sans" style={{ animationDelay: '300ms' }}>
            {t('hero.desc')}
          </p>

          <div className="animate-stagger flex flex-wrap gap-4 mt-8 items-center" style={{ animationDelay: '400ms' }}>
            <button type="button" onClick={() => setModalMode('register')} className="bg-[#682315] border-2 border-[#4A190F] border-b-[6px] active:border-b-2 active:translate-y-[4px] text-white px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200 flex items-center gap-2 shadow-xl shadow-black/20 cursor-pointer drop-shadow-md">
              <span>{t('hero.cta.register')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }} className="bg-[#FAEDE6] border-2 border-[#4A190F]/20 border-b-[6px] active:border-b-2 active:translate-y-[4px] text-[#682315] px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200 flex items-center gap-2 shadow-xl shadow-black/10 cursor-pointer drop-shadow-md">
              <BookOpen className="w-5 h-5 text-[#C45827]" />
              <span>{t('hero.cta.demo')}</span>
            </button>
          </div>

          <div className="animate-stagger flex items-center flex-wrap gap-6 mt-10 text-xs text-[#FFD8C4] font-medium" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-2"><span>{t('hero.feat1')}</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            <div className="flex items-center gap-2"><span>{t('hero.feat2')}</span></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            <div className="flex items-center gap-2"><span>{t('hero.feat3')}</span></div>
          </div>
        </div>

        <div className="flex items-center justify-center relative w-full lg:max-w-lg xl:max-w-none mx-auto py-4 lg:py-0">
          <div className="w-full max-w-[500px] lg:max-w-full lg:scale-95 xl:scale-100 origin-center transition-transform duration-300">
            <HeroEmblem />
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-8 lg:bottom-10 lg:left-10 xl:left-16 hidden xl:flex flex-col items-center gap-2.5 z-30 select-none pointer-events-none">
        <div className="w-6 py-2 px-1 bg-[#682315] border border-[#FFD8C4]/40 rounded shadow-md flex items-center justify-center">
          <span className="text-[11px] font-serif text-[#FFD8C4] font-bold leading-tight tracking-widest writing-vertical">易皮中文</span>
        </div>
        <div className="w-px h-5 bg-[#FFD8C4]/25" />
        <span className="text-[9px] tracking-[0.28em] text-[#FFD8C4]/70 uppercase font-sans font-medium writing-vertical">
          {t('hero.stamp.text')}
        </span>
      </div>

      <ScrollIndicator />
      </section>

      <div id="features" className="gsap-section"><Features /></div>
      <div id="statistics" className="gsap-section"><Stats /></div>
      <div id="methodology" className="gsap-section"><Methodology /></div>
      <div id="faq" className="gsap-section"><FAQ /></div>
      <div id="footer" className="gsap-section"><Footer /></div>
    </div>

      <ScrollToTop />
      <AuthModal isOpen={modalMode !== null} onClose={() => setModalMode(null)} initialMode={modalMode || 'login'} />
    </>
  );
};
