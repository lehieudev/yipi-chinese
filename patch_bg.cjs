const fs = require('fs');

const pages = [
  'src/pages/GrammarPage.tsx',
  'src/pages/TopicVocabPage.tsx',
  'src/pages/RadicalsPage.tsx',
  'src/pages/SyllablesPage.tsx'
];

pages.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(
      /className="sticky top-\[72px\] z-30 bg-\[#FAFAFA\]/g,
      'className="sticky top-[72px] z-30 bg-[#FAEDE6]'
    );
    fs.writeFileSync(file, content);
  }
});
