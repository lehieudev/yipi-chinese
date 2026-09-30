const fs = require('fs');

const appendToPage = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('BeginnerRoadmap')) {
    // Add import
    content = content.replace("import React", "import { BeginnerRoadmap } from '@/components/BeginnerRoadmap';\nimport React");
    
    // Append to bottom, right before the last closing </div> tag of the main container
    // Let's just find the last </div> and insert <BeginnerRoadmap /> before it.
    const lastDivIndex = content.lastIndexOf('</div>');
    if (lastDivIndex !== -1) {
      content = content.substring(0, lastDivIndex) + '\n      <BeginnerRoadmap />\n    ' + content.substring(lastDivIndex);
    }
    
    fs.writeFileSync(file, content);
  }
};

appendToPage('src/pages/PronunciationPage.tsx');
appendToPage('src/pages/CharactersPage.tsx');
appendToPage('src/pages/HskCurriculumPage.tsx');
appendToPage('src/pages/GrammarPage.tsx');
appendToPage('src/pages/ListeningPage.tsx');
appendToPage('src/pages/ConversationPage.tsx');
