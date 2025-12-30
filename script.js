$(function () {

  $("#openBtn").on("click", function () {
    $(".scene").addClass("open");
  });

  const items = [
    "🍂", "🍁", "🍃",        // autumn leaves
    "🌼", "🌸", "🍁",        // flowers
    "🌿"                    // greenery
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