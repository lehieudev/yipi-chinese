const fs = require('fs');
let file = 'src/components/LearningJourney.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'className="absolute top-1/2 -mt-2 border-8 border-transparent ${i % 2 === 0 ? \'-left-4 border-r-gray-900\' : \'-right-4 border-l-gray-900\'}"',
  'className={`absolute top-1/2 -mt-2 border-8 border-transparent ${i % 2 === 0 ? \'-left-4 border-r-gray-900\' : \'-right-4 border-l-gray-900\'}`}'
);

fs.writeFileSync(file, content);
