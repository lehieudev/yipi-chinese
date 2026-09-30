const fs = require('fs');
let file = 'src/components/SideNavigation.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the return statement
content = content.replace(/return \([\s\S]*\);/g, `return (
    <>
      {/* Desktop Side Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] hidden lg:flex flex-col gap-4 items-end pointer-events-none">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          
          return (
            <div 
              key={section.id} 
              className="group flex items-center gap-4 cursor-pointer pointer-events-auto"
              onClick={() => scrollToSection(section.id)}
            >
              {/* Label */}
              <span className={\`text-sm font-oriental transition-all duration-300 \${
                isActive 
                  ? 'text-[#FFD8C4] opacity-100 translate-x-0 font-bold drop-shadow-md' 
                  : 'text-white/50 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }\`}>
                {t(section.labelKey)}
              </span>
              
              {/* Indicator Dot */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className={\`absolute rounded-full transition-all duration-500 \${
                  isActive 
                    ? 'w-6 h-6 bg-[#C45827]/20 border border-[#C45827]/50 shadow-[0_0_10px_rgba(196,88,39,0.5)]' 
                    : 'w-2 h-2 bg-white/20 group-hover:bg-white/40 group-hover:w-3 group-hover:h-3'
                }\`} />
                <div className={\`w-1.5 h-1.5 rounded-full transition-all duration-300 z-10 \${
                  isActive ? 'bg-[#FFD8C4]' : 'bg-transparent'
                }\`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex lg:hidden items-center justify-center pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#2A0F08]/80 backdrop-blur-xl border border-[#FFD8C4]/20 p-2 rounded-full shadow-2xl">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={\`relative px-3 py-2 rounded-full text-xs font-oriental whitespace-nowrap transition-all duration-300 \${
                  isActive ? 'text-[#2A0F08] font-bold shadow-md' : 'text-white/70 hover:text-white'
                }\`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD8C4] to-[#FFF0E6] rounded-full z-0" />
                )}
                <span className="relative z-10">
                  {/* Keep texts short on mobile by using split if needed, or just full text if it fits. Actually let's just use the translation. */}
                  {t(section.labelKey)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );`);

fs.writeFileSync(file, content);
