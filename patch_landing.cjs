const fs = require('fs');

let file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const useGsapEnd = content.indexOf('// Redirect to dashboard');
if (useGsapEnd > -1) {
    const parallaxLogic = `
      // 3. Parallax elements
      const parallaxElements = gsap.utils.toArray('.gsap-parallax') as HTMLElement[];
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
        gsap.to(el, {
          y: () => (ScrollTrigger.maxScroll(window) * speed),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      });
      
      // 4. Hero specific parallax
      gsap.to('.hero-parallax-bg', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to('.hero-parallax-text', {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
`;
    // Insert before the closing brace of the if(!prefersReducedMotion) block
    const targetIdx = content.lastIndexOf('}', useGsapEnd) - 4; // approximate
    // Let's just do a string replace on the end of the batch call
    content = content.replace(
      `onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 60, scale: 0.85, duration: 0.4, overwrite: true })
      });`,
      `onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 60, scale: 0.85, duration: 0.4, overwrite: true })
      });
${parallaxLogic}`
    );
}

// Add the classes to some elements to apply the parallax
// 1. Hero text area -> hero-parallax-text
content = content.replace(
  '<div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-24">',
  '<div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-24 hero-parallax-text">'
);

// 2. Some clouds in the hero to be parallax background
content = content.replace(
  '<Cloud ref={cloud10Ref} type={5} className="absolute -top-32 -left-32',
  '<Cloud ref={cloud10Ref} type={5} className="hero-parallax-bg absolute -top-32 -left-32'
);
content = content.replace(
  '<Cloud ref={cloud11Ref} type={4} className="absolute top-1/4 -right-48',
  '<Cloud ref={cloud11Ref} type={4} className="hero-parallax-bg absolute top-1/4 -right-48'
);
content = content.replace(
  '<Cloud ref={cloud12Ref} type={3} className="absolute -bottom-48 left-1/4',
  '<Cloud ref={cloud12Ref} type={3} className="hero-parallax-bg absolute -bottom-48 left-1/4'
);
content = content.replace(
  '<Cloud ref={cloud13Ref} type={2} className="absolute -top-20 left-1/3',
  '<Cloud ref={cloud13Ref} type={2} className="hero-parallax-bg absolute -top-20 left-1/3'
);

fs.writeFileSync(file, content);
