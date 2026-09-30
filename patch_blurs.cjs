const fs = require('fs');

const filesToUpdate = [
  'src/components/GoodbyeScreen.tsx',
  'src/components/WelcomeOnboarding.tsx',
  'src/pages/SpeakingPage.tsx',
  'src/pages/PronunciationPage.tsx',
  'src/pages/ListeningPage.tsx',
  'src/pages/ExercisesPage.tsx',
  'src/pages/WritingPage.tsx',
  'src/pages/AITutorPage.tsx',
  'src/components/Features.tsx'
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // For background blurs, we hide them on mobile (hidden md:block)
    // or just remove the blur class if it's too much
    content = content.replace(/blur-3xl/g, 'blur-3xl hidden md:block');
    content = content.replace(/blur-2xl/g, 'blur-2xl hidden md:block');
    content = content.replace(/blur-\[100px\]/g, 'blur-[100px] hidden md:block');
    content = content.replace(/blur-md/g, 'blur-md hidden md:block');

    fs.writeFileSync(file, content);
  }
});

// For sidebar backdrop-blur, it's very heavy on mobile Safari. Let's make it solid or change the class
const sidebarFile = 'src/components/DashboardSidebar.tsx';
if (fs.existsSync(sidebarFile)) {
  let content = fs.readFileSync(sidebarFile, 'utf8');
  content = content.replace(
    'bg-white/95 backdrop-blur-xl',
    'bg-white lg:bg-white/95 lg:backdrop-blur-xl'
  );
  fs.writeFileSync(sidebarFile, content);
}

// For Landing Page, lots of blurs on Clouds which are animated. 
// Very heavy on mobile. Let's hide the big blurred clouds on mobile.
const landingFile = 'src/pages/LandingPage.tsx';
if (fs.existsSync(landingFile)) {
  let content = fs.readFileSync(landingFile, 'utf8');
  // Just add hidden md:block to the blurred clouds
  content = content.replace(
    /className="hero-parallax-bg([^"]*)blur-2xl([^"]*)"/g,
    'className="hero-parallax-bg$1blur-2xl hidden md:block$2"'
  );
  content = content.replace(
    /className="hero-parallax-bg([^"]*)blur-\[40px\]([^"]*)"/g,
    'className="hero-parallax-bg$1blur-[40px] hidden md:block$2"'
  );
  content = content.replace(
    /className="hero-parallax-bg([^"]*)blur-3xl([^"]*)"/g,
    'className="hero-parallax-bg$1blur-3xl hidden md:block$2"'
  );
  content = content.replace(
    /className="hero-parallax-bg([^"]*)blur-\[50px\]([^"]*)"/g,
    'className="hero-parallax-bg$1blur-[50px] hidden md:block$2"'
  );
  fs.writeFileSync(landingFile, content);
}

