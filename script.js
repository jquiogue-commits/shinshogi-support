// ShinShogi marketing site — carousel, mobile nav, notify form.
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

  /* ---------- Notify form ---------- */
  var form = document.getElementById("notifyForm");
  var success = document.getElementById("formSuccess");
  if (form && success) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      var email = document.getElementById("notifyEmail").value.trim();

      // No real form endpoint configured yet — fall back to a mailto draft
      // so the CTA is never a dead end. Swap the form's `action` for a real
      // endpoint (e.g. Formspree) to switch to the inline-success path below.
      if (!action || action.indexOf("YOUR_FORM_ID") !== -1) {
        e.preventDefault();
        window.location.href = "mailto:jquiogue.apps.support@gmail.com" +
          "?subject=Notify%20me%20at%20ShinShogi%20launch" +
          "&body=Please%20notify%20me%20at%20" + encodeURIComponent(email) +
          "%20when%20ShinShogi%20launches.";
        return;
      }

      // Real endpoint configured: submit via fetch and show inline success
      // instead of navigating away.
      e.preventDefault();
      fetch(action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      }).then(function (res) {
        if (res.ok) {
          form.style.display = "none";
          success.style.display = "block";
        } else {
          window.location.href = "mailto:jquiogue.apps.support@gmail.com" +
            "?subject=Notify%20me%20at%20ShinShogi%20launch";
        }
      }).catch(function () {
        window.location.href = "mailto:jquiogue.apps.support@gmail.com" +
          "?subject=Notify%20me%20at%20ShinShogi%20launch";
      });
    });
  }
})();
