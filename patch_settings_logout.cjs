const fs = require('fs');
let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Pass handleLogoutClick through context
content = content.replace(
  "<Outlet context={{ profile, setProfile }} />",
  "<Outlet context={{ profile, setProfile, onLogout: handleLogoutClick }} />"
);
fs.writeFileSync(file, content);

let file2 = 'src/pages/SettingsPage.tsx';
let content2 = fs.readFileSync(file2, 'utf8');

content2 = content2.replace(
  "const { profile, setProfile } = useOutletContext<any>();",
  "const { profile, setProfile, onLogout } = useOutletContext<any>();"
);

content2 = content2.replace(
  /<button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">\s*<LogOut className="w-4 h-4 text-red-400" \/> Đăng xuất\s*<\/button>/g,
  `<button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">\n                  <LogOut className="w-4 h-4 text-red-400" /> Đăng xuất\n                </button>`
);

fs.writeFileSync(file2, content2);
