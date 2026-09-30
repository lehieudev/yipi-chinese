const fs = require('fs');

let file = 'src/components/WelcomeOnboarding.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
content = content.replace(
  "import { ArrowRight, Sparkles, Book, Target, Loader2, CheckCircle2 } from 'lucide-react';",
  "import { ArrowRight, BookOpen, Book, Target, Loader2, CheckCircle2, MessageCircle, Compass } from 'lucide-react';"
);

// Replace Step 0 Sparkles -> BookOpen
content = content.replace(
  '<Sparkles className="w-12 h-12 text-[#C45827]" />',
  '<BookOpen className="w-12 h-12 text-[#C45827]" />'
);

// Replace Step 3 Sparkles -> MessageCircle
content = content.replace(
  "{ id: 'communication', icon: <Sparkles className=\"w-8 h-8 mb-3\" />, label: 'Giao tiếp' }",
  "{ id: 'communication', icon: <MessageCircle className=\"w-8 h-8 mb-3\" />, label: 'Giao tiếp' }"
);

// Replace Step 4 Sparkles -> Compass
content = content.replace(
  '<Sparkles className="w-8 h-8 text-[#C45827] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />',
  '<Compass className="w-8 h-8 text-[#C45827] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />'
);

fs.writeFileSync(file, content);
