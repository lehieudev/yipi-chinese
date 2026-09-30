const fs = require('fs');

let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add states for forcing name update
content = content.replace(
  "const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);",
  "const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [showNamePrompt, setShowNamePrompt] = useState(false);\n  const [tempName, setTempName] = useState('');\n  const [isSavingName, setIsSavingName] = useState(false);"
);

// Update fetchUser logic
const fetchUserLogic = `
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data) {
          setProfile(data);
          if (!data.full_name || data.full_name.trim() === '') {
            setShowNamePrompt(true);
          }
        } else {
          // If profile missing, try to create it, or at least show prompt
          const defaultName = session.user.user_metadata?.full_name || '';
          setProfile({ id: session.user.id, email: session.user.email, full_name: defaultName });
          if (!defaultName) {
             setShowNamePrompt(true);
          }
        }
      }
`;

content = content.replace(
  /if \(session\) \{[\s\S]*?\} else \{[\s\S]*?\}[\s\S]*?\}/,
  fetchUserLogic.trim()
);

// Add save name function
const saveNameFn = `
  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    
    setIsSavingName(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const updates = {
        id: session.user.id,
        full_name: tempName,
        email: session.user.email,
        updated_at: new Date()
      };
      
      const { error } = await supabase.from('profiles').upsert(updates);
      
      if (!error) {
        setProfile((prev: any) => ({ ...prev, full_name: tempName }));
        setShowNamePrompt(false);
      }
    }
    setIsSavingName(false);
  };
`;

content = content.replace(
  "  if (!profile) {",
  saveNameFn + "\n  if (!profile) {"
);

// Add the modal to the render
const modalJSX = `
      {/* FORCE NAME PROMPT MODAL */}
      {showNamePrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2A0F08]/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white border border-[#4A190F]/10 rounded-[32px] overflow-hidden max-w-md w-full shadow-2xl relative p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 text-[#C45827] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#4A190F] mb-2">Chào mừng bạn!</h3>
              <p className="text-gray-600 text-sm">Vui lòng nhập tên gọi hoặc biệt danh để YIPI có thể xưng hô với bạn nhé.</p>
            </div>
            <form onSubmit={handleSaveName} className="space-y-4">
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Nhập tên của bạn..." 
                autoFocus
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#C45827] focus:ring-1 focus:ring-[#C45827]" 
              />
              <button 
                type="submit" 
                disabled={isSavingName || !tempName.trim()}
                className="w-full bg-[#C45827] border-2 border-[#8A3814] border-b-[6px] active:border-b-2 active:translate-y-[4px] disabled:opacity-70 disabled:active:translate-y-0 disabled:active:border-b-[6px] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center transition-all"
              >
                {isSavingName ? 'Đang lưu...' : 'BẮT ĐẦU HỌC'}
              </button>
            </form>
          </div>
        </div>
      )}
`;

content = content.replace(
  "      <DashboardSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />",
  modalJSX + "\n      <DashboardSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />"
);

// Update header profile display
content = content.replace(
  '<div className="font-bold text-[#4A190F] text-sm leading-tight">Học viên</div>',
  '<div className="font-bold text-[#4A190F] text-sm leading-tight">{profile.full_name || "Học viên"}</div>'
);

// We should also pass profile down and fetchUser
content = content.replace(
  '<Outlet context={{ profile }} />',
  '<Outlet context={{ profile, setProfile }} />'
);
// Wait, the original code doesn't have `<Outlet context={{ profile }} />`. Let's check what it has.
fs.writeFileSync(file, content);
