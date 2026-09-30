const fs = require('fs');

let file = 'src/pages/DashboardHome.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('PomodoroTimer')) {
  // Add import
  content = content.replace(
    "import { LearningJourney } from '@/components/LearningJourney';",
    "import { LearningJourney } from '@/components/LearningJourney';\nimport { PomodoroTimer } from '@/components/PomodoroTimer';"
  );
  
  // Insert component
  const targetInsertion = "{/* Streak Widget */}";
  const replacement = "{/* Pomodoro Widget */}\n            <PomodoroTimer />\n\n            {/* Streak Widget */}";
  
  if (content.includes(targetInsertion)) {
    content = content.replace(targetInsertion, replacement);
    fs.writeFileSync(file, content);
    console.log('Patched DashboardHome with PomodoroTimer successfully');
  } else {
    console.log('Could not find insertion point.');
  }
}
