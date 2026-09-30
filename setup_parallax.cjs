const fs = require('fs');

let file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the parallax setup to something better
const newParallaxLogic = `
      // 3. Parallax scroll effect
      const parallaxElements = gsap.utils.toArray('.gsap-parallax') as HTMLElement[];
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
        gsap.fromTo(el, 
          { y: () => -100 * speed },
          {
            y: () => window.innerHeight * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
      
      const heroParallax = gsap.utils.toArray('.hero-parallax') as HTMLElement[];
      heroParallax.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.3');
        gsap.to(el, {
          y: () => (ScrollTrigger.maxScroll(window) * speed),
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });
`;

// Just replace the whole chunk from "// 3. Parallax elements" to before "}" of the if(!prefersReducedMotion)
const startIdx = content.indexOf('// 3. Parallax elements');
const endIdx = content.indexOf('}', startIdx); // This is risky, let's use replace

content = content.replace(
  /\/\/ 3\. Parallax elements[\s\S]*?(?=\} \/\/ Redirect to dashboard|\}\s*\}, \{ scope: container \}\);)/,
  newParallaxLogic
);

// Apply parallax classes to elements
// For clouds
content = content.replace(/className="absolute top-6 sm:top-12 left-10/g, 'data-speed="0.1" className="gsap-parallax absolute top-6 sm:top-12 left-10');
content = content.replace(/className="absolute -top-4 sm:top-6 right-2/g, 'data-speed="0.2" className="gsap-parallax absolute -top-4 sm:top-6 right-2');
content = content.replace(/className="absolute top-1\/4 sm:top-1\/3 -left-12/g, 'data-speed="0.15" className="gsap-parallax absolute top-1/4 sm:top-1/3 -left-12');
content = content.replace(/className="absolute bottom-16 sm:bottom-24 right-4/g, 'data-speed="0.25" className="gsap-parallax absolute bottom-16 sm:bottom-24 right-4');
content = content.replace(/className="absolute -bottom-10 sm:-bottom-16 left-1\/2/g, 'data-speed="-0.1" className="gsap-parallax absolute -bottom-10 sm:-bottom-16 left-1/2');

// For other sections like Methodology images
content = content.replace(/<div className="relative z-10">/g, '<div className="relative z-10 gsap-parallax" data-speed="0.05">');
content = content.replace(/<div className="relative shrink-0 flex items-center justify-center">/g, '<div className="relative shrink-0 flex items-center justify-center gsap-parallax" data-speed="0.1">');

// Hero specific
content = content.replace(/className="max-w-\[1400px\] mx-auto/g, 'data-speed="0.4" className="hero-parallax max-w-[1400px] mx-auto');

fs.writeFileSync(file, content);
