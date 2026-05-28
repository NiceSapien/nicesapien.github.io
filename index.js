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

// Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// pfp animation
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('shi');
    const container = document.querySelector('.tilt-container');

    // Safety check to make sure the elements are found
    if (!el || !container) {
        console.error("Could not find #shi or .tilt-container in the DOM!");
        return;
    }

    container.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        
        const rotateX = -(y / (rect.height / 2)) * 20; 
        const rotateY = (x / (rect.width / 2)) * 20;
        
        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});