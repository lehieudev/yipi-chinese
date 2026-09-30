const fs = require('fs');
let file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Reduce mobile hero title size from 2.75rem to 4xl
content = content.replace(
  'h1 className="animate-stagger text-[2.75rem]',
  'h1 className="animate-stagger text-4xl'
);

// Fix the 'Khám phá Yipi' hardcode
content = content.replace(
  '<span>Khám phá Yipi</span>',
  "<span>{t('hero.cta.demo')}</span>"
);

fs.writeFileSync(file, content);
