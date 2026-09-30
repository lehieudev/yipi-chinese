import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { Check, Lock, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const levels = [
  { id: 'hsk1', title: 'HSK 1', status: 'completed', score: 100, xp: 500, desc: 'Tân binh' },
  { id: 'hsk2', title: 'HSK 2', status: 'completed', score: 85, xp: 800, desc: 'Sơ cấp' },
  { id: 'hsk3', title: 'HSK 3', status: 'current', score: 20, xp: 120, desc: 'Trung cấp' },
  { id: 'hsk4', title: 'HSK 4', status: 'locked', score: 0, xp: 0, desc: 'Trung cao cấp' },
  { id: 'hsk5', title: 'HSK 5', status: 'locked', score: 0, xp: 0, desc: 'Cao cấp' },
  { id: 'hsk6', title: 'HSK 6', status: 'locked', score: 0, xp: 0, desc: 'Thành thạo' }
];

// Pre-defined points for a winding mountain path (x: 0-100, y: 0-100 percentages)
// Bottom to top progression
const pathPoints: [number, number][] = [
  [15, 90], // HSK 1
  [85, 75], // HSK 2
  [25, 55], // HSK 3
  [75, 40], // HSK 4
  [30, 20], // HSK 5
  [70, 5],  // HSK 6
];

export const LearningJourney = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const pathData = useMemo(() => {
    const lineGenerator = d3.line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveMonotoneY); // Smooth vertical curve
    
    // Create intermediate points for smoother visual winding
    const smoothPoints: [number, number][] = [];
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const p1 = pathPoints[i];
      const p2 = pathPoints[i + 1];
      smoothPoints.push(p1);
      // Add a control point in the middle
      const midY = (p1[1] + p2[1]) / 2;
      const midX = (p1[0] + p2[0]) / 2 + (i % 2 === 0 ? 10 : -10); // add some bulge
      smoothPoints.push([midX, midY]);
    }
    smoothPoints.push(pathPoints[pathPoints.length - 1]);

    return lineGenerator(smoothPoints) || '';
  }, []);

  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#C45827]" />
            Lộ trình chinh phục HSK
          </h2>
          <p className="text-gray-500 text-sm mt-1">Con đường núi ngàn dặm bắt đầu từ một bước chân.</p>
        </div>
      </div>

      {/* SVG Path Container */}
      <div className="relative w-full h-[600px] sm:h-[500px] mt-4 select-none">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          {/* Base path (locked) */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="#F3F4F6" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="1 3"
          />
          
          {/* Active path (completed) - visually we'd need to cut the path, but for simplicity we draw a solid line on top and use a clip-path or stroke-dasharray trick, but a simple glow behind current is easier. Let's just draw the nodes over it. */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="#FFD8C4" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>

        {/* Nodes */}
        {levels.map((level, i) => {
          const [x, y] = pathPoints[i];
          const isCompleted = level.status === 'completed';
          const isCurrent = level.status === 'current';
          const isLocked = level.status === 'locked';

          return (
            <div 
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setHoveredNode(level.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="relative">
                {/* Node Circle */}
                <div className={`
                  w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                  ${isCompleted ? 'bg-[#C45827] text-white' : ''}
                  ${isCurrent ? 'bg-white border-4 border-[#C45827] text-[#C45827] shadow-md shadow-[#C45827]/20 scale-110' : ''}
                  ${isLocked ? 'bg-gray-100 text-gray-400 border-2 border-gray-200' : ''}
                `}>
                  {isCompleted && <Check className="w-6 h-6" />}
                  {isCurrent && <Star className="w-6 h-6 fill-current" />}
                  {isLocked && <Lock className="w-5 h-5" />}
                </div>

                {/* Gentle focus halo for current node */}
                {isCurrent && (
                  <div className="absolute -inset-1 rounded-full border-2 border-[#C45827]/40 pointer-events-none"></div>
                )}

                {/* Label (always visible on mobile, responsive positioning) */}
                <div className={`absolute ${i % 2 === 0 ? 'left-full ml-4' : 'right-full mr-4'} top-1/2 -translate-y-1/2 whitespace-nowrap`}>
                  <div className="font-bold text-gray-800 text-sm sm:text-base bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md">{level.title}</div>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredNode === level.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className={`absolute z-20 ${i % 2 === 0 ? 'left-full ml-16' : 'right-full mr-16'} top-1/2 -translate-y-1/2 w-48 bg-gray-900 text-white p-4 rounded-2xl shadow-xl`}
                    >
                      <div className={`absolute top-1/2 -mt-2 border-8 border-transparent ${i % 2 === 0 ? '-left-4 border-r-gray-900' : '-right-4 border-l-gray-900'}`}></div>
                      <div className="font-bold text-base mb-1">{level.title}</div>
                      <div className="text-xs text-gray-300 font-medium mb-3">{level.desc}</div>
                      
                      {isLocked ? (
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Cần hoàn thành {levels[i-1]?.title}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#C45827] h-full rounded-full" style={{ width: `${level.score}%` }}></div>
                          </div>
                          <div className="flex justify-between text-xs font-semibold text-gray-300">
                            <span>{level.score}%</span>
                            <span className="text-[#FFD8C4]">{level.xp} XP</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
