// ShinShogi marketing site — carousel, mobile nav.
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.querySelector("nav.main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
    document.querySelectorAll("nav.main-nav a").forEach(function (a) {
      a.addEventListener("click", function () { mainNav.classList.remove("open"); });
    });
  }

  /* ---------- Screenshot carousel ---------- */
  var shots = [
    { src: "assets/screenshots/menu.png", caption: "Home" },
    { src: "assets/screenshots/dark.png", caption: "Dark Theme" },
    { src: "assets/screenshots/minishogi.png", caption: "Minishogi (5×5)" },
    { src: "assets/screenshots/coach.png", caption: "Coach Mode" },
    { src: "assets/screenshots/rivals.png", caption: "Named AI Rivals" },
    { src: "assets/screenshots/analysis.png", caption: "Game Analysis" },
    { src: "assets/screenshots/explorer.png", caption: "Opening Explorer" },
    { src: "assets/screenshots/drills.png", caption: "Drills" },
    { src: "assets/screenshots/study.png", caption: "Model Games" },
    { src: "assets/screenshots/learn.png", caption: "Learn" },
  ];

  var img = document.getElementById("showcaseImg");
  var caption = document.getElementById("showcaseCaption");
  var dotsWrap = document.getElementById("showcaseDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var index = 0;

  if (img && caption && dotsWrap && prevBtn && nextBtn) {
    shots.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to screenshot " + (i + 1));
      dot.addEventListener("click", function () { show(i); });
      dotsWrap.appendChild(dot);
    });

    function show(i) {
      index = (i + shots.length) % shots.length;
      img.src = shots[index].src;
      img.alt = "ShinShogi screenshot: " + shots[index].caption;
      caption.textContent = shots[index].caption;
      Array.prototype.forEach.call(dotsWrap.children, function (dot, di) {
        dot.classList.toggle("active", di === index);
      });
    }

    prevBtn.addEventListener("click", function () { show(index - 1); });
    nextBtn.addEventListener("click", function () { show(index + 1); });
    show(0);
  }
})();
