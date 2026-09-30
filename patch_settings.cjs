const fs = require('fs');

let file = 'src/pages/SettingsPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Import useOutletContext and supabase
if (!content.includes('useOutletContext')) {
  content = content.replace(
    "import React, { useState } from 'react';",
    "import React, { useState } from 'react';\nimport { useOutletContext } from 'react-router-dom';\nimport { supabase } from '@/lib/supabase';"
  );
}

// Add state for form
const stateAddition = `
  const { profile, setProfile } = useOutletContext<any>();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const updates = {
        id: session.user.id,
        full_name: fullName,
        email: profile?.email || session.user.email,
        updated_at: new Date()
      };
      const { error } = await supabase.from('profiles').upsert(updates);
      if (!error) {
        setProfile({ ...profile, full_name: fullName });
        // Optional: show a toast or success message here
        alert("Lưu thông tin thành công!");
      } else {
        alert("Có lỗi xảy ra: " + error.message);
      }
    } else {
      // Demo mode
      setProfile({ ...profile, full_name: fullName });
      alert("Lưu thông tin thành công (Demo)!");
    }
    setIsSaving(false);
  };
`;

content = content.replace(
  "  const [activeTab, setActiveTab] = useState('profile');",
  "  const [activeTab, setActiveTab] = useState('profile');\n" + stateAddition
);

// Update inputs
content = content.replace(
  '<input type="text" defaultValue="Lê Hữu"',
  '<input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}'
);

content = content.replace(
  '<input type="email" defaultValue="hieule4467@gmail.com"',
  '<input type="email" value={profile?.email || "Chưa có email"}'
);

content = content.replace(
  '<button className="px-6 py-2.5 bg-[#C45827] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#A5471E] transition-colors">',
  '<button onClick={handleSaveProfile} disabled={isSaving} className="px-6 py-2.5 bg-[#C45827] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#A5471E] transition-colors disabled:opacity-50">'
);
content = content.replace(
  "LƯU THAY ĐỔI\n                         </button>",
  "{isSaving ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}\n                         </button>"
);

fs.writeFileSync(file, content);
