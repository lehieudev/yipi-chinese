const fs = require('fs');
let file = 'src/components/SideNavigation.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync(file, content);

file = 'src/i18n/translations.ts';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\'/g, "'");
fs.writeFileSync(file, content);
