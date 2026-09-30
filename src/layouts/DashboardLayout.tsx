import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Flame, 
  Star,
  PlayCircle,
  Menu,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Trophy,
  ChevronRight,
  X
} from 'lucide-react';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { WelcomeOnboarding } from '@/components/WelcomeOnboarding';
import { useTransition } from '@/contexts/TransitionContext';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();
  const [profile, setProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);

  const handleLogoutClick = () => {
    // 1. Immediately clear authentication markers to prevent double logout or bounce-back
    localStorage.removeItem('demo_auth');
    sessionStorage.setItem('just_logged_out', 'true');

    // 2. Fire sign out in background immediately so it completes while doors close
    supabase.auth.signOut().catch(console.error);

    // 3. Trigger palace door goodbye transition
    startTransition(() => {
      navigate('/', { replace: true, state: { skipLoading: true, fromLogout: true } });
    }, 'goodbye');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const isDemo = localStorage.getItem('demo_auth') === 'true';
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && !isDemo) {
        navigate('/');
        return;
      }
      
      if (isDemo && !session) {
        setProfile({ full_name: 'Khách (Bản Demo)' });
        setShowNamePrompt(false);
        return;
      }
      
      if (session) {
        const userMeta = session.user.user_metadata || {};
        const metaHasSeenWelcome = userMeta.has_seen_welcome === true;

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          const mergedProfile = {
            ...data,
            streak: userMeta.streak ?? data?.streak ?? 0,
            longest_streak: userMeta.longest_streak ?? data?.longest_streak ?? 0,
            last_study_date: userMeta.last_study_date ?? data?.last_study_date ?? null,
            studied_dates: userMeta.studied_dates ?? data?.studied_dates ?? [],
            xp: userMeta.xp ?? data?.xp ?? 0,
            user_metadata: userMeta,
          };
          setProfile(mergedProfile);
          // Account already completed onboarding if marked in user metadata OR profile already has full_name
          const alreadyCompleted = metaHasSeenWelcome || Boolean(data.full_name && data.full_name.trim().length > 0);

          if (!alreadyCompleted) {
            setTempName(session.user.user_metadata?.full_name || '');
            setShowNamePrompt(true);
          } else if (!metaHasSeenWelcome) {
            // Sync to account metadata so future logins on any device recognize this
            supabase.auth.updateUser({
              data: { has_seen_welcome: true }
            }).catch(() => {});
          }
        } else {
          // If profile row missing in table (brand new account)
          const defaultName = session.user.user_metadata?.full_name || '';
          setProfile({
            id: session.user.id,
            email: session.user.email,
            full_name: defaultName,
            streak: userMeta.streak ?? 0,
            longest_streak: userMeta.longest_streak ?? 0,
            last_study_date: userMeta.last_study_date ?? null,
            studied_dates: userMeta.studied_dates ?? [],
            xp: userMeta.xp ?? 0,
            user_metadata: userMeta,
          });
          if (!metaHasSeenWelcome) {
            setTempName(defaultName);
            setShowNamePrompt(true);
          }
        }
      }
    };
    
    fetchUser();
  }, [navigate]);

  const handleSaveOnboarding = async (name: string, level: string, goal: string) => {
    setIsSavingName(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const updates = {
        id: session.user.id,
        full_name: name,
        email: session.user.email,
        updated_at: new Date()
      };
      
      const { error } = await supabase.from('profiles').upsert(updates);
      
      // Update account user_metadata directly in Supabase cloud (permanent per account, no browser storage)
      await supabase.auth.updateUser({
        data: {
          has_seen_welcome: true,
          onboarding_level: level,
          onboarding_goal: goal,
        }
      }).catch((err) => console.error("Error updating user metadata:", err));

      if (!error) {
        setProfile((prev: any) => ({ ...prev, full_name: name, _onboarding_level: level, _onboarding_goal: goal }));
        setShowNamePrompt(false);
      }
    } else {
      // Demo mode fallback without storage
      setProfile((prev: any) => ({ ...prev, full_name: name }));
      setShowNamePrompt(false);
    }
    setIsSavingName(false);
  };


  if (!profile) {
    return <div className="min-h-screen bg-[#2A0F08] flex items-center justify-center text-[#FFD8C4]">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAEDE6] font-sans flex text-[#4A190F] overflow-hidden">
      
      {/* ============================================================== */}
      {/* LEFT SIDEBAR                                                   */}
      {/* ============================================================== */}

      
      {/* WELCOME ONBOARDING (REPLACES OLD NAME MODAL) */}
      {showNamePrompt && (
        <WelcomeOnboarding 
          defaultName={tempName} 
          onComplete={handleSaveOnboarding} 
        />
      )}

      <DashboardSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onLogout={handleLogoutClick} />

      {/* ============================================================== */}
      {/* MAIN CONTENT AREA                                              */}
      {/* ============================================================== */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative min-w-0">
        
        {/* HEADER */}
        <header className="h-20 lg:h-24 bg-[#FAEDE6] border-b border-[#4A190F]/5 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-black/5 active:bg-black/10 transition-colors">
              <Menu className="w-6 h-6 text-[#4A190F]" />
            </button>
            <div className="flex items-center gap-2">
              <div data-flip-id="brand-logo-mobile" className="w-8 h-8 flex items-center justify-center shrink-0 will-change-transform">
                <img src="/logo.png" alt="Yipi Logo" className="w-full h-full object-contain" />
              </div>
              <span data-flip-id="brand-title-mobile" className="font-oriental font-bold text-xl text-[#4A190F] will-change-transform">YIPI</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hidden lg:flex items-center gap-6 bg-white px-5 py-2.5 rounded-[20px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
                <BookOpen className="w-4 h-4 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">HSK hiện tại</span>
                <span className="font-bold text-gray-800 text-sm leading-none">HSK {profile.target_hsk_level || 1}</span>
              </div>
            </div>
            
            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-red-50 flex items-center justify-center relative shrink-0">
                 <svg className="w-full h-full -rotate-90 text-red-50" viewBox="0 0 36 36"><path className="fill-none stroke-current" strokeWidth="2" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                 <div className="absolute inset-0 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">Tiến độ tổng thể</span>
                <span className="font-bold text-gray-800 text-sm leading-none">0%</span>
              </div>
            </div>

            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Flame className={`w-6 h-6 ${Number(profile?.streak || 0) > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-gray-400'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">Streak</span>
                <span className="font-bold text-gray-800 text-sm leading-none">{profile?.streak || 0} ngày</span>
              </div>
            </div>
            
            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">XP</span>
                <span className="font-bold text-gray-800 text-sm leading-none">{profile?.xp || 0}</span>
              </div>
            </div>

            <div className="w-px h-6 bg-gray-100"></div>

            <div className="flex items-center gap-3 pr-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-red-500 text-xl font-bold">
                ❤️
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium leading-none mb-1">Tim</span>
                <span className="font-bold text-gray-800 text-sm leading-none">5</span>
              </div>
            </div>
          </div>

          {/* Profile & Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-tight">{profile.full_name}</p>
                <p className="text-[11px] text-red-500 font-bold">Level 1</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-cover bg-center text-white flex items-center justify-center font-bold text-lg overflow-hidden shadow-sm">
                 {profile.avatar_url ? (
                   <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full bg-[#C45827] flex items-center justify-center">
                     {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                   </div>
                 )}
              </div>
            </div>
          </div>
        </header>

        {/* OUTLET FOR SUB-PAGES WITH SMOOTH PAGE TRANSITION */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="flex-1 flex flex-col min-w-0"
        >
          <Outlet context={{ profile, setProfile, onLogout: handleLogoutClick }} />
        </motion.div>

      </main>

    </div>
  );
};
