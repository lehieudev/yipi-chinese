const fs = require('fs');
let file = 'src/pages/DashboardHome.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace(
  "import { useOutletContext } from 'react-router-dom';",
  "import { useOutletContext } from 'react-router-dom';\nimport { CircularProgress } from '@/components/CircularProgress';"
);

// Replace the Thống kê học tập grid
const oldStats = `<div className="grid grid-cols-2 gap-3 flex-1">
                  {[
                    { label: 'Bài học đã học', val: '0', icon: <BookOpen className="w-5 h-5 text-red-500" />, bg: 'bg-red-50' },
                    { label: 'Từ vựng đã học', val: '0', icon: <span className="font-serif font-bold text-gray-500 text-lg">A</span>, bg: 'bg-gray-50' },
                    { label: 'XP tuần này', val: '0', icon: <Flame className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50' },
                    { label: 'Từ thành thạo', val: '0', icon: <Trophy className="w-5 h-5 text-green-500" />, bg: 'bg-green-50' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                      <div className={\`w-10 h-10 rounded-xl \${stat.bg} flex items-center justify-center shrink-0\`}>
                        {stat.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-xl leading-none mb-1">{stat.val}</span>
                        <span className="text-[10px] text-gray-500 font-semibold">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>`;

const newStats = `
                <div className="flex items-center justify-between flex-1 bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-gray-800">12</span>
                      <span className="text-sm font-semibold text-gray-500">Bài học đã học</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-800">120</span>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Từ vựng</span>
                      </div>
                      <div className="w-px bg-gray-200"></div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-[#C45827]">450</span>
                        <span className="text-[10px] font-semibold text-[#C45827] uppercase tracking-wider">XP</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 drop-shadow-sm">
                    <CircularProgress 
                      progress={35} 
                      size={110} 
                      strokeWidth={10} 
                      label="35%" 
                      subLabel="Hoàn thành" 
                      color="#C45827" 
                      trackColor="#FFEFE8" 
                    />
                  </div>
                </div>
`;

content = content.replace(oldStats, newStats);

fs.writeFileSync(file, content);
