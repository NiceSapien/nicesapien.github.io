const mojek = document.getElementById("mojek");

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loader-wrapper");
  const audio = document.getElementById("bg-audio");

  const imgs = document.querySelectorAll("img:not(#batman-logo)");
  const totalAssets = imgs.length + 2; 
  let loadedCount = 0;

  function updateProgress() {
    loadedCount++;
    const percentage = (loadedCount / totalAssets) * 100;
    progressBar.style.width = percentage + "%";

    if (loadedCount >= totalAssets) {
      setTimeout(() => {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        mojek.style.display = "block"; 
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 300);
    }
  }

  document.fonts.ready.then(updateProgress);

  if (audio) {
    if (audio.readyState >= 4) { 
      updateProgress();
    } else {
      audio.addEventListener("canplaythrough", updateProgress, { once: true });
      audio.addEventListener("error", updateProgress, { once: true }); 
    }
  } else {
    updateProgress(); 
  }

  if (imgs.length === 0) {
    // No images to handle
  } else {
    imgs.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener("load", updateProgress);
        img.addEventListener("error", updateProgress); 
      }
    });
  }
});// font changing ahh
document.addEventListener("DOMContentLoaded", () => {
  const nika = document.getElementById("nikaspin");

  if (nika) {
    const text = nika.innerText.trim();
    const letters = text.split("");
    nika.innerHTML = ""; // This clears the "NiceSapien." text

    const fonts = ["f-1", "f-2", "f-3"];

    letters.forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char;
      nika.appendChild(span);

      span.addEventListener("mouseover", () => {
        const font = fonts[Math.floor(Math.random() * fonts.length)];
        span.classList.add(font);
        if (window.anime)
          anime({ targets: span, translateY: -10, duration: 400 });
      });

      span.addEventListener("mouseout", () => {
        span.classList.remove("f-1", "f-2", "f-3");
        if (window.anime)
          anime({ targets: span, translateY: 0, duration: 600 });
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

const { words } = splitText("h1");

animate(words, {
  y: [{ to: ["100%", "0%"] }],
  opacity: [0, 1],
  duration: 200,
  delay: stagger(125),
  loop: false,
});

// Scroll Reveal Animation
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Run once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
    },
  );

  reveals.forEach((reveal) => {
    revealOnScroll.observe(reveal);
  });
});

// background music
const audio = document.getElementById("bg-audio");
const video = document.getElementById("bg-video");
const mojekBtn = document.getElementById("bg-audio-btn");
const mojekCenter = document.getElementById("mojekCenter");
const mojekStartTime = 1.2;

mojekBtn.addEventListener("click", () => {
  if (audio.paused) {
    if (audio.currentTime < mojekStartTime) {
      audio.currentTime = mojekStartTime;
      video.currentTime = mojekStartTime;
    }

    video.style.display = "block";

    Promise.all([audio.play(), video.play()])
      .then(() => {
        mojekCenter.style.opacity = "0"; 
        setTimeout(() => {
          mojekCenter.style.display = "none";
        }, 500);
      })
      .catch((error) => {
        console.error("Playback failed:", error);
      });
  }
});

video.addEventListener("ended", () => {
  mojek.style.opacity = "0";

  setTimeout(() => {
    mojek.style.display = "none";
  }, 500);
});