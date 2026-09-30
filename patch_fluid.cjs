const fs = require('fs');
const file = 'src/hooks/useFluidClouds.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace the updateLoop calculations to have proper depth parallax.
code = code.replace(/const updateLoop = \(\) => \{[\s\S]*?animationFrameId = requestAnimationFrame\(updateLoop\);\n    \};/, `const updateLoop = () => {
      time += 0.01;

      // Smooth linear interpolation for pointer tracking
      currentPointerX += (targetPointerX - currentPointerX) * LERP_TAU;
      currentPointerY += (targetPointerY - currentPointerY) * LERP_TAU;

      // Smooth scroll lerping
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const scrollY = currentScrollY;

      // PARALLAX LAYERS (Depth in Oriental Aesthetic)
      // Positive Y multiplier = translates DOWN relative to container = stays on screen longer = FAR AWAY (Background)
      // Negative Y multiplier = translates UP relative to container = moves off screen faster = CLOSE (Foreground)

      // --- LAYER 1: DEEP BACKGROUND (Slowest, farthest) ---
      if (cloud10Ref.current) {
        const x = Math.sin(time * 0.15) * 40 - scrollY * 0.1;
        const y = Math.cos(time * 0.1) * 30 + scrollY * 0.85; // Deep parallax
        cloud10Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud11Ref.current) {
        const x = Math.cos(time * 0.12) * 50 + scrollY * 0.15;
        const y = Math.sin(time * 0.18) * 40 + scrollY * 0.8;
        cloud11Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud12Ref.current) {
        const x = Math.sin(time * 0.08) * 60 + scrollY * 0.05;
        const y = Math.cos(time * 0.12) * 20 + scrollY * 0.9;
        cloud12Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud13Ref.current) {
        const x = Math.cos(time * 0.1) * 45 - scrollY * 0.08;
        const y = Math.sin(time * 0.08) * 25 + scrollY * 0.85;
        cloud13Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }

      // --- LAYER 2: MID-BACKGROUND ---
      if (cloud9Ref.current) {
        const x = Math.sin(time * 0.4) * 15 + currentPointerX * 10 - scrollY * 0.2;
        const y = Math.cos(time * 0.5) * 10 + currentPointerY * 10 + scrollY * 0.6;
        const scale = 0.8 + Math.sin(time * 0.1) * 0.03;
        cloud9Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }
      if (cloud6Ref.current) {
        const x = Math.cos(time * 0.5) * 20 + currentPointerX * -15 + scrollY * 0.25;
        const y = Math.sin(time * 0.6) * 15 + currentPointerY * -15 + scrollY * 0.5;
        const scale = 0.95 + Math.cos(time * 0.2) * 0.04;
        cloud6Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }
      if (cloud7Ref.current) {
        const x = Math.sin(time * 0.7) * 25 + currentPointerX * -25 + scrollY * 0.3;
        const y = Math.cos(time * 0.5) * 12 + currentPointerY * -25 + scrollY * 0.45;
        const scale = 0.85 + Math.sin(time * 0.25) * 0.05;
        cloud7Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }

      // --- LAYER 3: MID-FOREGROUND ---
      if (cloud4Ref.current) {
        const x = Math.sin(time * 0.3) * 10 + currentPointerX * 15 - scrollY * 0.15;
        const y = Math.cos(time * 0.35) * 8 + currentPointerY * 15 + scrollY * 0.25;
        const scale = 0.85 + Math.sin(time * 0.15) * 0.03;
        cloud4Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }
      if (cloud5Ref.current) {
        const x = Math.cos(time * 0.35) * 12 + currentPointerX * 18 + scrollY * 0.15;
        const y = Math.sin(time * 0.4) * 7 + currentPointerY * 18 + scrollY * 0.2;
        const scale = 0.9 + Math.cos(time * 0.18) * 0.03;
        cloud5Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }
      if (cloud2Ref.current) {
        const x = Math.cos(time * 0.6) * 20 + currentPointerX * -10 - scrollY * 0.2;
        const y = Math.sin(time * 0.7) * 15 + currentPointerY * -10 + scrollY * 0.1;
        cloud2Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }
      if (cloud1Ref.current) {
        const x = Math.sin(time * 0.8) * 15 + currentPointerX * -20 + scrollY * 0.25;
        const y = Math.cos(time * 0.5) * 10 + currentPointerY * -20 + scrollY * 0.05;
        cloud1Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0)\`;
      }

      // --- LAYER 4: EXTREME FOREGROUND (Fastest, closest) ---
      if (cloud3Ref.current) {
        const x = Math.sin(time * 0.4) * 20 + currentPointerX * -20 - scrollY * 0.1;
        const y = Math.cos(time * 0.9) * 10 + currentPointerY * -20 + scrollY * -0.25; // Negative = moves UP faster than scroll
        const scale = 1.05 + Math.sin(time * 0.2) * 0.04;
        cloud3Ref.current.style.transform = \`translate3d(calc(-50% + \${x.toFixed(2)}px), \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }
      if (cloud8Ref.current) {
        const x = Math.cos(time * 0.8) * 18 + currentPointerX * -20 - scrollY * 0.3;
        const y = Math.sin(time * 0.7) * 14 + currentPointerY * -20 + scrollY * -0.3; // Negative = moves UP faster than scroll
        const scale = 1.05 + Math.cos(time * 0.3) * 0.04;
        cloud8Ref.current.style.transform = \`translate3d(\${x.toFixed(2)}px, \${y.toFixed(2)}px, 0) scale(\${scale.toFixed(4)})\`;
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };`);
fs.writeFileSync(file, code);
