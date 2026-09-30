const fs = require('fs');
let file = 'src/components/ScrollIndicator.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'className="absolute bottom-10 left-1/2 -translate-x-1/2',
  'className="absolute bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2'
);

fs.writeFileSync(file, content);
