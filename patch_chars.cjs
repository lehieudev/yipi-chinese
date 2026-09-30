const fs = require('fs');

let file = 'src/pages/CharactersPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add TTS and State
content = content.replace(
  "import { PenTool, Search, Volume2, ChevronDown } from 'lucide-react';",
  "import { PenTool, Search, Volume2, ChevronDown, X, ArrowRight, ArrowLeft } from 'lucide-react';\nimport { speak } from '@/lib/tts';"
);

// Add Modal state
content = content.replace(
  "const characters = [",
  "const [activeChar, setActiveChar] = React.useState<number | null>(null);\n  const characters = ["
);

// Add Volume onClick
content = content.replace(
  /<Volume2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" \/>/g,
  `<Volume2 onClick={(e) => { e.stopPropagation(); speak(item.char); }} className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />`
);

// Add row onClick to open modal
content = content.replace(
  /className="p-4 sm:p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors cursor-pointer"/g,
  `className="p-4 sm:p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setActiveChar(idx)}`
);

// Add Modal render at the bottom before BeginnerRoadmap
const modalRender = `
      {/* Detail Modal / Flashcard */}
      {activeChar !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A0F08]/80 backdrop-blur-sm animate-stagger">
          <div className="bg-white rounded-[32px] overflow-hidden max-w-sm w-full shadow-2xl relative flex flex-col">
            <button
              onClick={() => setActiveChar(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 pb-4 flex flex-col items-center text-center mt-4">
              <div className="text-[120px] leading-none font-oriental text-[#C45827] mb-2 drop-shadow-sm">
                {characters[activeChar].char}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-900">{characters[activeChar].pinyin}</span>
                <button 
                  onClick={() => speak(characters[activeChar].char)}
                  className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <div className="text-lg text-gray-600 mb-8 border-t border-gray-100 w-full pt-6">
                {characters[activeChar].meaning}
              </div>
            </div>

            <div className="flex border-t border-gray-100 divide-x divide-gray-100 bg-gray-50">
              <button 
                onClick={() => setActiveChar(prev => prev! > 0 ? prev! - 1 : characters.length - 1)}
                className="flex-1 py-4 flex justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveChar(prev => prev! < characters.length - 1 ? prev! + 1 : 0)}
                className="flex-1 py-4 flex justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(
  "      <BeginnerRoadmap />\n    </div>\n  );\n};",
  modalRender + "\n      <BeginnerRoadmap />\n    </div>\n  );\n};"
);

fs.writeFileSync(file, content);
