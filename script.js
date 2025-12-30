$(function () {

  const music = document.getElementById("bgMusic");
  let musicStarted = false;

  /* ---------- BUTTON CLICK ---------- */
  $("#openBtn").on("click", function () {

    // open the scene (if still used)
    $(".scene").addClass("open");

    // START MUSIC — SAFE (user gesture)
    if (!musicStarted && music) {
      music.volume = 0.4;
      music.play();
      musicStarted = true;
    }
  });

  /* ---------- FALLING ELEMENTS ---------- */
  const items = [
    "🍂", "🍁", "🍃",
    "🌼", "🌸",
    "🌿"
  ];

  const colors = [
    "rgba(190,120,60,0.85)",
    "rgba(160,90,40,0.85)",
    "rgba(210,160,80,0.85)",
    "rgba(200,140,150,0.85)",
    "rgba(120,170,120,0.85)"
  ];

  setInterval(() => {
    const el = $("<div class='fall-item'></div>");
    el.text(items[Math.floor(Math.random() * items.length)]);

    const size = Math.random() * 18 + 18;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 8;

    el.css({
      left: left + "vw",
      fontSize: size + "px",
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: duration + "s"
    });

    $(".falling").append(el);

    setTimeout(() => {
      el.remove();
    }, duration * 1000);

  }, 200);
});