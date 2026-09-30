const fs = require('fs');
let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "       setShowNamePrompt(false);",
  "       sessionStorage.setItem('has_seen_welcome', 'true');\n       setShowNamePrompt(false);"
);

fs.writeFileSync(file, content);
