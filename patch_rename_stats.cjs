const fs = require('fs');
let file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/id="stats"/g, 'id="statistics"');
fs.writeFileSync(file, content);

file = 'src/components/SideNavigation.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/id: 'stats'/g, "id: 'statistics'");
fs.writeFileSync(file, content);
