const fs = require('fs');

let file = 'src/pages/CharactersPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// The issue is that the sticky header has bg-[#FAFAFA] while the page background is bg-[#FAEDE6] (from DashboardLayout).
// We need to change the sticky header background to match or be transparent/blur.
content = content.replace(
  'className="sticky top-[72px] z-30 bg-[#FAFAFA] pt-2 pb-4 border-b border-gray-100 flex gap-3"',
  'className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5 flex gap-3"'
);

fs.writeFileSync(file, content);
