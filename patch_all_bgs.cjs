const fs = require('fs');

const pages = [
  'src/pages/ConversationPage.tsx',
  'src/pages/QuantifiersPage.tsx',
  'src/pages/TopicVocabPage.tsx', // ensure border is the same
  'src/pages/SyllablesPage.tsx' // ensure border is the same
];

pages.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace bg-[#FAFAFA] with bg-[#FAEDE6]
    content = content.replace(
      /className="sticky top-\[72px\] z-30 bg-\[#FAFAFA\] pt-2 pb-4 border-b border-gray-100/g,
      'className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5'
    );
    
    // Also fix the ones that already got the bg color but still have border-gray-100 instead of border-[#4A190F]/5
    content = content.replace(
      /className="sticky top-\[72px\] z-30 bg-\[#FAEDE6\] pt-2 pb-4 border-b border-gray-100/g,
      'className="sticky top-[72px] z-30 bg-[#FAEDE6] pt-2 pb-4 border-b border-[#4A190F]/5'
    );
    
    fs.writeFileSync(file, content);
  }
});
