const fs = require('fs');

let file = 'src/pages/ExercisesPage.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { ExercisePlayer }')) {
  content = content.replace(
    "import { Dumbbell, ArrowRight, Brain, HelpCircle, ChevronDown } from 'lucide-react';",
    "import { Dumbbell, ArrowRight, Brain, HelpCircle, ChevronDown, Lock } from 'lucide-react';\nimport { ExercisePlayer } from '@/components/ExercisePlayer';"
  );
}

// Add state for activeExercise and activeLevel
const stateVars = `
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
`;

content = content.replace(
  "const [openFaq, setOpenFaq] = useState<number | null>(null);",
  "const [openFaq, setOpenFaq] = useState<number | null>(null);\n" + stateVars
);

// We need to change the render logic
const renderLogic = `
  if (activeLevel && activeExercise) {
    return (
      <div className="min-h-screen bg-[#FAEDE6] w-full p-0 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <ExercisePlayer 
          exerciseId={activeExercise} 
          level={activeLevel} 
          onBack={() => setActiveLevel(null)} 
        />
      </div>
    );
  }

  if (activeExercise) {
    const ex = exercises.find(e => e.id === activeExercise);
    return (
      <div className="p-6 lg:p-8 xl:px-12 max-w-[1000px] mx-auto w-full flex flex-col gap-8 bg-transparent">
        <button 
          onClick={() => setActiveExercise(null)}
          className="text-gray-500 hover:text-[#C45827] flex items-center gap-2 text-sm font-bold transition-colors w-fit"
        >
          <span className="text-lg leading-none">&lt;</span> BÀI TẬP - Luyện tập
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#4A190F] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[10px] text-red-600 font-bold shrink-0">
              {ex?.id}
            </span>
            {ex?.title}
          </h1>
          <p className="text-[#682315]/70 text-sm">{ex?.desc}</p>
        </div>

        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">Chọn cấp độ để luyện</h2>
          
          <div className="flex flex-col gap-3">
            {[
              { id: 'HSK 1', isFree: true },
              { id: 'HSK 2', isFree: false },
              { id: 'HSK 3', isFree: false },
              { id: 'HSK 4', isFree: false },
              { id: 'HSK 5', isFree: false },
              { id: 'HSK 6', isFree: false },
              { id: 'HSK 7-9', isFree: false },
            ].map(lvl => (
              <div 
                key={lvl.id} 
                className={\`flex items-center justify-between p-4 rounded-xl border \${lvl.isFree ? 'border-gray-200 bg-white hover:border-[#C45827]' : 'border-yellow-100 bg-yellow-50/30'} transition-colors\`}
              >
                <div className="flex items-center gap-4">
                  <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm \${lvl.isFree ? 'bg-[#4A190F] text-white' : 'bg-yellow-100 text-yellow-700'}\`}>
                    {lvl.id.replace('HSK ', '')}
                  </div>
                  <div>
                    <div className="font-bold text-[#4A190F]">{lvl.id}</div>
                    <div className="text-xs text-gray-500">
                      {lvl.isFree ? 'Sinh đề mới mỗi lần luyện, không lặp lại' : 'Dành cho hội viên Premium'}
                    </div>
                  </div>
                </div>
                {lvl.isFree ? (
                  <button 
                    onClick={() => setActiveLevel(lvl.id)}
                    className="px-6 py-2 rounded-full border border-gray-200 text-sm font-bold text-[#4A190F] hover:bg-gray-50 flex items-center gap-2"
                  >
                    BẮT ĐẦU <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5" /> MỞ KHÓA
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
`;

content = content.replace(
  "return (\n    <div className=\"p-6 lg:p-8 xl:px-12 max-w-[1400px] mx-auto w-full flex flex-col gap-10 bg-transparent\">",
  renderLogic + "\n  return (\n    <div className=\"p-6 lg:p-8 xl:px-12 max-w-[1400px] mx-auto w-full flex flex-col gap-10 bg-transparent\">"
);

// Add onClick to the exercise card
content = content.replace(
  /className="bg-white rounded-\[20px\] p-6 border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full min-h-\[180px\]"/g,
  'className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full min-h-[180px]" onClick={() => setActiveExercise(ex.id)}'
);

fs.writeFileSync(file, content);
