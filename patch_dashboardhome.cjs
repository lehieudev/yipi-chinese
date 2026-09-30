const fs = require('fs');

let file = 'src/pages/DashboardHome.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('LearningJourney')) {
  content = content.replace(
    "import { CircularProgress } from '@/components/CircularProgress';",
    "import { CircularProgress } from '@/components/CircularProgress';\nimport { LearningJourney } from '@/components/LearningJourney';"
  );
  
  const targetInsertion = "              </div>\n            </div>\n\n            <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">";
  const replacement = "              </div>\n            </div>\n\n            {/* Lộ trình HSK */}\n            <LearningJourney />\n\n            <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">";
  
  if (content.includes(targetInsertion)) {
    content = content.replace(targetInsertion, replacement);
    fs.writeFileSync(file, content);
    console.log('Patched DashboardHome successfully');
  } else {
    // If exact target string isn't found, try a generic regex or just place it before the stats grid
    content = content.replace(
      "{/* Tiếp tục học Card */}",
      "<LearningJourney />\n\n              {/* Tiếp tục học Card */}"
    );
    fs.writeFileSync(file, content);
    console.log('Patched DashboardHome (fallback)');
  }
}
