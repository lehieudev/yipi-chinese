const fs = require('fs');

// 1. Features.tsx
let file = 'src/components/Features.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('import { Sparkles', 'import { Layers, Landmark');
content = content.replace('<Sparkles className="w-4 h-4" />', '<Layers className="w-4 h-4" />');
content = content.replace('<Sparkles className="w-8 h-8', '<Landmark className="w-8 h-8');
fs.writeFileSync(file, content);

// 2. SideNavigation.tsx
file = 'src/components/SideNavigation.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace('Sparkles', 'Layers');
content = content.replace('<Sparkles className="w-5 h-5" />', '<Layers className="w-5 h-5" />');
fs.writeFileSync(file, content);

// 3. AITutorPage.tsx
file = 'src/pages/AITutorPage.tsx';
if (fs.existsSync(file)) {
  content = fs.readFileSync(file, 'utf8');
  content = content.replace('Sparkles', 'Crown');
  content = content.replace('<Sparkles className="w-3.5 h-3.5" />', '<Crown className="w-3.5 h-3.5" />');
  content = content.replace('<Sparkles className="w-6 h-6', '<Bot className="w-6 h-6');
  fs.writeFileSync(file, content);
}

// 4. ExercisesPage.tsx
file = 'src/pages/ExercisesPage.tsx';
if (fs.existsSync(file)) {
  content = fs.readFileSync(file, 'utf8');
  content = content.replace(', Sparkles', '');
  fs.writeFileSync(file, content);
}
