const fs = require('fs');

let file = 'src/components/GoodbyeScreen.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
content = content.replace(
  "import { Sparkles } from 'lucide-react';",
  "import { Coffee } from 'lucide-react';"
);

// Replace Sparkles -> Coffee (to symbolize taking a break/rest)
content = content.replace(
  '<Sparkles className="w-10 h-10 text-[#C45827]" />',
  '<Coffee className="w-10 h-10 text-[#C45827]" />'
);

fs.writeFileSync(file, content);
