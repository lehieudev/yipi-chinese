const fs = require('fs');

let file = 'src/pages/PronunciationPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Import TTS
content = content.replace(
  "import { Mic, Play, Volume2, Target, CheckCircle2, AlertCircle, RefreshCw, AudioLines } from 'lucide-react';",
  "import { Mic, Play, Volume2, Target, CheckCircle2, AlertCircle, RefreshCw, AudioLines } from 'lucide-react';\nimport { speak } from '@/lib/tts';"
);

// Add Play audio logic to the active item panel
content = content.replace(
  /<button className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">/g,
  '<button onClick={() => speak(activeItem)} className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">'
);

// Add simulated recording logic
content = content.replace(
  "const [isRecording, setIsRecording] = useState(false);",
  `const [isRecording, setIsRecording] = useState(false);
  
  const handleRecord = () => {
    if (isRecording) return;
    setIsRecording(true);
    setScore(null);
    
    // Simulate recording and grading
    setTimeout(() => {
      setIsRecording(false);
      setScore(Math.floor(Math.random() * 20) + 80); // Random score between 80 and 99
    }, 2000);
  };`
);

content = content.replace(
  /<button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500\/30 hover:scale-105 active:scale-95 border-4 border-white">/g,
  '<button onClick={handleRecord} className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:scale-105 active:scale-95 border-4 border-white ${isRecording ? "bg-red-400 animate-pulse" : "bg-red-500 hover:bg-red-600 shadow-red-500/30"}`}>'
);

fs.writeFileSync(file, content);
