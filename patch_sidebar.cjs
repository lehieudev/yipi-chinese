const fs = require('fs');

let file = 'src/components/DashboardSidebar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update Interface
content = content.replace(
  "interface DashboardSidebarProps {\n  isOpen?: boolean;\n  onClose?: () => void;\n}",
  "interface DashboardSidebarProps {\n  isOpen?: boolean;\n  onClose?: () => void;\n  onLogout?: () => void;\n}"
);

// Update Component declaration
content = content.replace(
  "export const DashboardSidebar = ({ isOpen = false, onClose }: DashboardSidebarProps) => {",
  "export const DashboardSidebar = ({ isOpen = false, onClose, onLogout }: DashboardSidebarProps) => {"
);

// Update handleLogout
content = content.replace(
  "  const handleLogout = async () => {\n    localStorage.removeItem('demo_auth');\n    await supabase.auth.signOut();\n    startTransition(() => {\n      navigate('/', { state: { skipLoading: true } });\n    });\n  };",
  "  const handleLogout = async () => {\n    if (onLogout) {\n      onLogout();\n      return;\n    }\n    localStorage.removeItem('demo_auth');\n    await supabase.auth.signOut();\n    startTransition(() => {\n      navigate('/', { state: { skipLoading: true } });\n    });\n  };"
);

fs.writeFileSync(file, content);
