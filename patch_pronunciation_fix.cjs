const fs = require('fs');

let file = 'src/pages/PronunciationPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the duplicate handleRecord
content = content.replace(
  `  const handleRecord = () => {
    if (isRecording) return;
    setIsRecording(true);
    setScore(null);
    
    // Simulate recording and grading
    setTimeout(() => {
      setIsRecording(false);
      setScore(Math.floor(Math.random() * 20) + 80); // Random score between 80 and 99
    }, 2000);
  };`,
  ""
);

fs.writeFileSync(file, content);
