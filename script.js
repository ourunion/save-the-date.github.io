$(function () {

  const music = document.getElementById("bgMusic");

  const hintTimer = setTimeout(() => {
    $(".hint-msg").addClass("show");
  }, 5000);

  $("#openInvite").on("click", function () {
    clearTimeout(hintTimer);
    $(".hint-msg").removeClass("show");

    music.volume = 0.6;
    music.play().catch(() => {});

    $(".fade").css("opacity", 1);

    setTimeout(() => {
      $(".envelope").fadeOut(600);
    }, 400);

    setTimeout(() => {
      $(".fade").css("opacity", 0);
      $(".slides").addClass("active");

      const firstSlide = document.querySelector(".slide.invite");
      firstSlide.classList.remove("show");
      void firstSlide.offsetHeight;
      firstSlide.classList.add("show");

      document.querySelector(".slides").scrollTop = 1;
    }, 1200);
  });

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

  const slidesEl = document.querySelector(".slides");

  slidesEl.addEventListener("scroll", () => {
    slidesEl.classList.add("scrolled");

    document.querySelectorAll(".image-slide").forEach(slide => {
      const bg = slide.querySelector(".image-bg");
      const rect = slide.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        Math.max((windowHeight - rect.top) / windowHeight, 0),
        1
      );

      const translateY = (progress - 0.5) * 30;
      bg.style.transform = `translateY(${translateY}px) scale(1.12)`;
    });
  }, { once: false });

});

function startCountdown() {
  const weddingDate = new Date("March 10, 2026 19:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    if (diff < 0) return;

    $("#days").text(String(Math.floor(diff / 86400000)).padStart(2, "0"));
    $("#hours").text(String(Math.floor(diff / 3600000) % 24).padStart(2, "0"));
    $("#minutes").text(String(Math.floor(diff / 60000) % 60).padStart(2, "0"));
    $("#seconds").text(String(Math.floor(diff / 1000) % 60).padStart(2, "0"));
  }, 1000);
}

startCountdown();

document.addEventListener("visibilitychange", () => {
  const music = document.getElementById("bgMusic");
  if (document.hidden && music && !music.paused) {
    music.pause();
  }
});