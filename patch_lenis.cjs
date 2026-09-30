const fs = require('fs');

let file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Lenis import
if (!content.includes("import Lenis from 'lenis'")) {
  content = content.replace(
    "import { gsap } from 'gsap';",
    "import Lenis from 'lenis';\nimport { gsap } from 'gsap';"
  );
}

// 2. Add Lenis useEffect hook before useGSAP
const lenisCode = `
  // Setup Lenis for smooth scrolling
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerObj = {
      update: (time: number) => {
        lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(tickerObj.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerObj.update);
      lenis.destroy();
    };
  }, []);
`;

if (!content.includes('new Lenis({')) {
  content = content.replace(
    "  useGSAP(() => {",
    lenisCode + "\n  useGSAP(() => {"
  );
}

fs.writeFileSync(file, content);
