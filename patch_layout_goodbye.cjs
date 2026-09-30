const fs = require('fs');
let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
if (!content.includes('GoodbyeScreen')) {
  content = content.replace(
    "import { WelcomeOnboarding } from '@/components/WelcomeOnboarding';",
    "import { WelcomeOnboarding } from '@/components/WelcomeOnboarding';\nimport { GoodbyeScreen } from '@/components/GoodbyeScreen';"
  );
}

// Add state
content = content.replace(
  "const [isSavingName, setIsSavingName] = useState(false);",
  "const [isSavingName, setIsSavingName] = useState(false);\n  const [isLoggingOut, setIsLoggingOut] = useState(false);"
);

// Add handleLogout method
const handleLogoutMethod = `
  const handleLogoutClick = () => {
    setIsLoggingOut(true);
  };

  const executeLogout = async () => {
    localStorage.removeItem('demo_auth');
    await supabase.auth.signOut();
    navigate('/', { state: { skipLoading: true } });
  };
`;

content = content.replace(
  "  useEffect(() => {",
  handleLogoutMethod + "\n  useEffect(() => {"
);

// Update DashboardSidebar prop
content = content.replace(
  "<DashboardSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />",
  "<DashboardSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onLogout={handleLogoutClick} />"
);

// Add GoodbyeScreen to the render
const goodbyeJSX = `
      {/* GOODBYE SCREEN */}
      {isLoggingOut && (
        <GoodbyeScreen 
          name={profile?.full_name || 'bạn'} 
          onComplete={executeLogout}
        />
      )}
`;

content = content.replace(
  "      {/* WELCOME ONBOARDING",
  goodbyeJSX + "\n      {/* WELCOME ONBOARDING"
);

fs.writeFileSync(file, content);
