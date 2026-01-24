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

// font changing ahh
const nika = document.getElementById('nikaspin');
const nameText = nika.textContent;
const letters = nameText.split("");

// Clear the original text
nika.textContent = "";

const randomFonts = ['f-alt-1', 'f-alt-2', 'f-alt-3'];

letters.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    nika.appendChild(span);

    span.addEventListener('mouseenter', () => {
        // Pick a random style
        const randomClass = randomFonts[Math.floor(Math.random() * randomFonts.length)];
        span.classList.add(randomClass);
        
        // Optional: Small Anime.js pop
        anime({
            targets: span,
            translateY: -10,
            duration: 400
        });
    });

    span.addEventListener('mouseleave', () => {
        // Remove all extra font classes
        randomFonts.forEach(c => span.classList.remove(c));
        
        anime({
            targets: span,
            translateY: 0,
            duration: 600
        });
    });
});