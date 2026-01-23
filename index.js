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