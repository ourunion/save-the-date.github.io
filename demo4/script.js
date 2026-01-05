// script.js
$(function () {
  const music = document.getElementById("bgMusic");
  $("#openInvite").on("click", function () {
    music.volume = 0.6;
    music.play().catch(() => {});
    $(".fade").css("opacity", 1);

    setTimeout(() => {
      $(".envelope").fadeOut(600);
    }, 400);

    setTimeout(() => {
      $(".fade").css("opacity", 0);

      // show slides container
      $(".slides").addClass("active");

      // 🔑 CRITICAL FIX:
      // force reflow BEFORE adding .show so animations run
      const firstSlide = document.querySelector(".slide.invite");
      firstSlide.classList.remove("show");
      void firstSlide.offsetHeight; // force browser reflow
      firstSlide.classList.add("show");

      // mobile scroll activation
      const slides = document.querySelector(".slides");
      slides.scrollTop = 1;

    }, 1200);
  });

  // reveal animation for other slides on scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".slide:not(.invite)").forEach(slide => {
    observer.observe(slide);
  });

});

// script.js  (ADD BELOW YOUR EXISTING CODE)

const slidesContainer = document.querySelector(".slides");

slidesContainer.addEventListener("scroll", () => {
  document.querySelectorAll(".image-slide").forEach(slide => {
    const bg = slide.querySelector(".image-bg");
    const rect = slide.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // how far the slide is in view (0 → 1)
    const progress = Math.min(
      Math.max((windowHeight - rect.top) / windowHeight, 0),
      1
    );

    // subtle parallax movement
    const translateY = (progress - 0.5) * 30; // px (keep subtle)
    bg.style.transform = `translateY(${translateY}px) scale(1.12)`;
  });
});

// COUNTDOWN TIMER
function startCountdown() {
  const weddingDate = new Date("March 10, 2026 19:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    $("#days").text(days.toString().padStart(2, "0"));
    $("#hours").text(hours.toString().padStart(2, "0"));
    $("#minutes").text(minutes.toString().padStart(2, "0"));
    $("#seconds").text(seconds.toString().padStart(2, "0"));
  }, 1000);
}

startCountdown();

/* ---------- STOP MUSIC & ANIMATIONS WHEN PAGE HIDDEN ---------- */

document.addEventListener("visibilitychange", () => {
  const music = document.getElementById("bgMusic");

  if (document.hidden) {
    // tab switched / browser minimized
    if (music && !music.paused) {
      music.pause();
    }
  }
});
