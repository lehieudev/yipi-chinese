const fs = require('fs');

let file = 'src/pages/LandingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldParallax = `      // 3. Parallax scroll effect
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
      });`;

const newParallax = `      // 3. Parallax scroll effect (Desktop Only to prevent layout breaking on mobile)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
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
      });`;

if (content.includes(oldParallax)) {
  content = content.replace(oldParallax, newParallax);
  fs.writeFileSync(file, content);
  console.log('Patched LandingPage successfully');
} else {
  console.log('Old parallax code not found exactly as expected.');
}
