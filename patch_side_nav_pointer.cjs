const fs = require('fs');
let file = 'src/components/SideNavigation.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure z-[9999] and pointer events
content = content.replace(
  'className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4 items-end"',
  'className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col gap-4 items-end pointer-events-none"'
);

content = content.replace(
  'className="group flex items-center gap-4 cursor-pointer"',
  'className="group flex items-center gap-4 cursor-pointer pointer-events-auto"'
);

fs.writeFileSync(file, content);
