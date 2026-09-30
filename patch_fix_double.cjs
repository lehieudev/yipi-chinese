const fs = require('fs');
let file = 'src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "sessionStorage.setItem('has_seen_welcome', 'true');\n        sessionStorage.setItem('has_seen_welcome', 'true');",
  "sessionStorage.setItem('has_seen_welcome', 'true');"
);

fs.writeFileSync(file, content);
