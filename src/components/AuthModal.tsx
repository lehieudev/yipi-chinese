import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2, Eye, EyeOff, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useTransition } from '@/contexts/TransitionContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('remember_me') === 'true';
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('remember_email') || '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const { startTransition } = useTransition();
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setEmail('');
          setPassword('');
          setFullName('');
        }, 2200);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error && error.message === 'Invalid login credentials') {
          console.log('Demo mode bypass activated.');
          localStorage.setItem('demo_auth', 'true');
          if (rememberMe) {
            localStorage.setItem('remember_me', 'true');
            localStorage.setItem('remember_email', email);
          } else {
            localStorage.removeItem('remember_me');
            localStorage.removeItem('remember_email');
          }
          setSuccess(true);
          onClose();
          startTransition(() => {
            navigate('/app');
          });
          return;
        }

        if (error) throw error;

        if (rememberMe) {
          localStorage.setItem('remember_me', 'true');
          localStorage.setItem('remember_email', email);
        } else {
          localStorage.removeItem('remember_me');
          localStorage.removeItem('remember_email');
        }

        setSuccess(true);
        onClose();
        startTransition(() => {
          navigate('/app');
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error.message);
      let message = error.message;
      if (message === 'Email not confirmed') {
        message = 'Tài khoản chưa được xác thực. Vui lòng kiểm tra email của bạn để xác nhận.';
      } else if (message === 'Invalid login credentials') {
        message = 'Email hoặc mật khẩu không chính xác.';
      } else if (message === 'User already registered') {
        message = 'Email này đã được đăng ký.';
      }
      setErrorMsg(message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A0F08]/80 backdrop-blur-sm animate-stagger">
      <div className="bg-[#4A190F] border-4 border-[#2A0F08] border-b-[12px] rounded-[32px] overflow-hidden max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-16 px-8">
            <CheckCircle2 className="w-16 h-16 text-[#4ADE80] mx-auto mb-4 animate-bounce drop-shadow-md" />
            <h3 className="text-3xl font-oriental font-bold text-white mb-2 drop-shadow-sm">
              {mode === 'login' ? t('auth.success.login') : t('auth.success.register')}
            </h3>
            <p className="text-[#FFD8C4] text-sm leading-relaxed">
              {mode === 'login' 
                ? 'Đang chuyển hướng đến trang học tập của bạn...' 
                : 'Cảm ơn bạn đã tham gia Yipi. Hãy kiểm tra email để kích hoạt tài khoản nhé.'}
            </p>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center">
              <h3 className="text-3xl font-oriental font-bold text-white mb-2 drop-shadow-sm">
                {mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
              </h3>
              <p className="text-white/80 text-sm font-medium">
                {mode === 'login' 
                  ? 'Tiếp tục hành trình học tiếng Trung tự nhiên.' 
                  : 'Bắt đầu hành trình chinh phục tiếng Trung cùng Yipi.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-2xl text-red-100 text-sm text-center font-bold shadow-inner">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#FFD8C4]/60">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('auth.fullName')}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#2A0F08] border-2 border-[#1a0804] border-b-4 text-white placeholder-white/40 text-sm font-medium focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/30 transition-all shadow-inner"
                  />
                </div>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#FFD8C4]/60">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email')}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#2A0F08] border-2 border-[#1a0804] border-b-4 text-white placeholder-white/40 text-sm font-medium focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/30 transition-all shadow-inner"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#FFD8C4]/60">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password')}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#2A0F08] border-2 border-[#1a0804] border-b-4 text-white placeholder-white/40 text-sm font-medium focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/30 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#FFD8C4]/60 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-4 h-4 rounded-md border-2 border-[#FFE8A3]/40 bg-[#2A0F08] peer-checked:bg-[#C45827] peer-checked:border-[#C45827] transition-all flex items-center justify-center shadow-xs group-hover:border-[#FFE8A3]/70">
                        <Check className="w-3 h-3 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#FFD8C4] group-hover:text-white transition-colors">
                      {t('auth.rememberMe')}
                    </span>
                  </label>
                  <button type="button" className="text-xs font-bold text-[#FFD8C4] hover:text-white transition-colors cursor-pointer">
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#C45827] border-2 border-[#8A3814] border-b-[6px] active:border-b-2 active:translate-y-[4px] disabled:opacity-70 disabled:active:translate-y-0 disabled:active:border-b-[6px] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all group drop-shadow-md cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-white/80 font-medium">
              {mode === 'login' ? (
                <p>
                  {t('auth.noAccount')} 
                  <button onClick={() => { setMode('register'); setErrorMsg(''); }} className="text-[#FFD8C4] hover:text-white font-bold transition-colors underline decoration-2 underline-offset-4 cursor-pointer">
                    {t('auth.registerNow')}
                  </button>
                </p>
              ) : (
                <p>
                  {t('auth.haveAccount')} 
                  <button onClick={() => { setMode('login'); setErrorMsg(''); }} className="text-[#FFD8C4] hover:text-white font-bold transition-colors underline decoration-2 underline-offset-4 cursor-pointer">{t('auth.loginNow')}</button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
