const fs = require('fs');
let file = 'src/pages/BeginnerPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace everything inside the main div before Tips section with BeginnerRoadmap
content = content.replace(
  /<div className="w-full max-w-5xl rounded-\[32px\] bg-\[#FFF8F5\][\s\S]*?(?=<!-- Tips Section -->|<\/div>\s*\{\/\* Tips Section \*\/\}|<div className="w-full max-w-4xl">)/g,
  '<BeginnerRoadmap />\n      '
);

content = "import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';\n" + content;

fs.writeFileSync(file, content);
