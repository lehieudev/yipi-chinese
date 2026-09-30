const fs = require('fs');
let file = 'src/components/SideNavigation.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add icon imports
content = content.replace(
  "import { TranslationKey } from '@/i18n/translations';",
  "import { TranslationKey } from '@/i18n/translations';\nimport { Home, Sparkles, BarChart2, BookOpen, HelpCircle } from 'lucide-react';"
);

// Add icons to sections array
content = content.replace(
  "{ id: 'hero', labelKey: 'nav.hero' },",
  "{ id: 'hero', labelKey: 'nav.hero', icon: <Home className=\"w-4 h-4\" /> },"
);
content = content.replace(
  "{ id: 'features', labelKey: 'nav.features' },",
  "{ id: 'features', labelKey: 'nav.features', icon: <Sparkles className=\"w-4 h-4\" /> },"
);
content = content.replace(
  "{ id: 'statistics', labelKey: 'nav.stats' },",
  "{ id: 'statistics', labelKey: 'nav.stats', icon: <BarChart2 className=\"w-4 h-4\" /> },"
);
content = content.replace(
  "{ id: 'methodology', labelKey: 'nav.methodology' },",
  "{ id: 'methodology', labelKey: 'nav.methodology', icon: <BookOpen className=\"w-4 h-4\" /> },"
);
content = content.replace(
  "{ id: 'faq', labelKey: 'nav.faq' },",
  "{ id: 'faq', labelKey: 'nav.faq', icon: <HelpCircle className=\"w-4 h-4\" /> },"
);

// Update interface
content = content.replace(
  "  labelKey: TranslationKey;\n}",
  "  labelKey: TranslationKey;\n  icon?: React.ReactNode;\n}"
);

// Update mobile nav render
content = content.replace(
  /className={`relative px-3 py-2 rounded-full text-xs font-oriental whitespace-nowrap transition-all duration-300 \${[\s\S]*?<\/button>/,
  `className={\`relative px-4 py-3 rounded-full text-xs font-oriental whitespace-nowrap transition-all duration-300 \${
                  isActive ? 'text-[#2A0F08] font-bold shadow-md' : 'text-white/70 hover:text-white'
                }\`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD8C4] to-[#FFF0E6] rounded-full z-0" />
                )}
                <span className="relative z-10 flex items-center justify-center">
                  {section.icon}
                </span>
              </button>`
);

fs.writeFileSync(file, content);
