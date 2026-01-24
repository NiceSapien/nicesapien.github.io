document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById('progress-bar');
  const loader = document.getElementById('loader-wrapper');

  // Track images and fonts
  const imgs = document.querySelectorAll('img:not(#batman-logo)');
  const totalAssets = imgs.length + 1; // All images + Fonts
  let loadedCount = 0;

  function updateProgress() {
    loadedCount++;
    const percentage = (loadedCount / totalAssets) * 100;
    progressBar.style.width = percentage + "%";

    if (loadedCount >= totalAssets) {
      // Small delay so the user sees the 100% state
      setTimeout(() => {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
      }, 300);
    }
  }

  // Monitor Fonts
  document.fonts.ready.then(updateProgress);

  // Monitor Images
  if (imgs.length === 0) {
    // If no images, the font load alone will trigger completion via updateProgress
  } else {
    imgs.forEach(img => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress); // Move bar even if image fails
      }
    });
  }
});
// font changing ahh
document.addEventListener("DOMContentLoaded", () => {
    const nika = document.getElementById('nikaspin');
    
    if (nika) {
        const text = nika.innerText.trim();
        const letters = text.split("");
        nika.innerHTML = ""; // This clears the "NiceSapien." text

        const fonts = ['f-1', 'f-2', 'f-3'];

        letters.forEach(char => {
            const span = document.createElement('span');
            span.innerText = char === " " ? "\u00A0" : char;
            nika.appendChild(span);

            span.addEventListener('mouseover', () => {
                const font = fonts[Math.floor(Math.random() * fonts.length)];
                span.classList.add(font);
                if (window.anime) anime({ targets: span, translateY: -10, duration: 400 });
            });

            span.addEventListener('mouseout', () => {
                span.classList.remove('f-1', 'f-2', 'f-3');
                if (window.anime) anime({ targets: span, translateY: 0, duration: 600 });
            });
        });
        console.log("Spans created for:", text);
    } else {
        console.log("Element #nikaspin not found");
    }
});
// lenis/smooth scroll
const lenis = new Lenis({
  autoRaf: true,
});

// pfp animation
const { animate, splitText, stagger } = anime;

const { words } = splitText('h1');


animate(words, {
  y: [
    { to: ['100%', '0%'] },
  ],
  opacity: [0, 1],
  duration: 200,
  delay: stagger(125),
  loop: false,
});

