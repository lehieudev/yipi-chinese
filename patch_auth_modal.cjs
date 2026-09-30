const fs = require('fs');

let file = 'src/components/AuthModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Eye and EyeOff imports
content = content.replace(
  "import { X, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';",
  "import { X, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';"
);

// 2. Add state
content = content.replace(
  "const [password, setPassword] = useState('');",
  "const [password, setPassword] = useState('');\n  const [showPassword, setShowPassword] = useState(false);"
);

// 3. Update password input
const oldPasswordBlock = `<div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#FFD8C4]/60">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password')}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#2A0F08] border-2 border-[#1a0804] border-b-4 text-white placeholder-white/40 text-sm font-medium focus:outline-none focus:border-[#C45827] focus:ring-2 focus:ring-[#C45827]/30 transition-all shadow-inner"
                />
              </div>`;

const newPasswordBlock = `<div className="relative">
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
              </div>`;

content = content.replace(oldPasswordBlock, newPasswordBlock);

fs.writeFileSync(file, content);
