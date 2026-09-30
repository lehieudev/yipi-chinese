const fs = require('fs');

let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import for WelcomeOnboarding
if (!content.includes('WelcomeOnboarding')) {
  content = content.replace(
    "import { DashboardSidebar } from '@/components/DashboardSidebar';",
    "import { DashboardSidebar } from '@/components/DashboardSidebar';\nimport { WelcomeOnboarding } from '@/components/WelcomeOnboarding';"
  );
}

// 2. Change handleSaveName to accept parameters and update state
const newSaveNameLogic = `
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
      
      if (!error) {
        setProfile((prev: any) => ({ ...prev, full_name: name, _onboarding_level: level, _onboarding_goal: goal }));
        setShowNamePrompt(false);
      }
    } else {
       // Demo mode fallback
       setProfile((prev: any) => ({ ...prev, full_name: name }));
       setShowNamePrompt(false);
    }
    setIsSavingName(false);
  };
`;

// Replace the old handleSaveName function
content = content.replace(
  /const handleSaveName = async \(e: React\.FormEvent\) => \{[\s\S]*?setIsSavingName\(false\);\n  \};/,
  newSaveNameLogic
);

// 3. Replace the old simple modal with the WelcomeOnboarding component
const oldModalStart = "{/* FORCE NAME PROMPT MODAL */}";
const oldModalEnd = "</form>\n          </div>\n        </div>\n      )}";

const newModal = `      {/* WELCOME ONBOARDING (REPLACES OLD NAME MODAL) */}
      {showNamePrompt && (
        <WelcomeOnboarding 
          defaultName={tempName} 
          onComplete={handleSaveOnboarding} 
        />
      )}`;

content = content.replace(
  new RegExp(oldModalStart.replace(/[.*+?^$\{}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + oldModalEnd.replace(/[.*+?^$\{}()|[\]\\]/g, '\\$&')),
  newModal
);

fs.writeFileSync(file, content);
