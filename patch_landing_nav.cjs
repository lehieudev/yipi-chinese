const fs = require('fs');
const file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
if (!content.includes('import { SideNavigation }')) {
  content = content.replace(
    "import { LunarCalendar } from '@/components/LunarCalendar';",
    "import { LunarCalendar } from '@/components/LunarCalendar';\nimport { SideNavigation } from '@/components/SideNavigation';"
  );
}

// Add hero id
content = content.replace(
  '<section className="relative min-h-screen',
  '<section id="hero" className="relative min-h-screen'
);

// Add stats id
content = content.replace(
  '<div className="gsap-section"><Stats /></div>',
  '<div id="stats" className="gsap-section"><Stats /></div>'
);

// Add methodology id
content = content.replace(
  '<div className="gsap-section"><Methodology /></div>',
  '<div id="methodology" className="gsap-section"><Methodology /></div>'
);

// Add faq id
content = content.replace(
  '<div className="gsap-section"><FAQ /></div>',
  '<div id="faq" className="gsap-section"><FAQ /></div>'
);

// Add component
if (!content.includes('<SideNavigation />')) {
  content = content.replace(
    "<ScrollProgress />",
    "<ScrollProgress />\n      <SideNavigation />"
  );
}

fs.writeFileSync(file, content);
