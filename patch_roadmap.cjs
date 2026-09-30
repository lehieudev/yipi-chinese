const fs = require('fs');
let file = 'src/components/BeginnerRoadmap.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "onClick={() => navigate(step.path)}",
  "onClick={() => { window.scrollTo(0, 0); navigate(step.path); }}"
);

fs.writeFileSync(file, content);
