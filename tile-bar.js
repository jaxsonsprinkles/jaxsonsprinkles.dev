(function () {
  var SWATCHES = [
    { bg: "#0a0a0a", fg: "#ffffff" },
    { bg: "#ff2e20", fg: "#0a0a0a" },
    { bg: "#f0c2f7", fg: "#0a0a0a" },
    { bg: "#22e58b", fg: "#0a0a0a" },
    { bg: "#7c4dff", fg: "#ffffff" },
    { bg: "#ffe14d", fg: "#0a0a0a" },
    { bg: "#18b6ff", fg: "#0a0a0a" },
  ];

  function randomSwatchAvoiding(used) {
    var free = SWATCHES.filter(function (s) {
      return used.indexOf(s) === -1;
    });
    var pool = free.length > 0 ? free : SWATCHES;
    return pool[(Math.random() * pool.length) | 0];
  }

  function init() {
    var bar = document.getElementById("tileBar");
    if (!bar) return;
    var tiles = Array.prototype.slice.call(bar.querySelectorAll(".tile"));
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var state = tiles.map(function (el) {
      return { el: el, swatch: null, timer: null };
    });

    function paint(t, sw) {
      t.swatch = sw;
      t.el.style.backgroundColor = sw.bg;
      t.el.style.color = sw.fg;
    }

    function recolor(t) {
      var used = state
        .filter(function (o) {
          return o !== t;
        })
        .map(function (o) {
          return o.swatch;
        });
      paint(t, randomSwatchAvoiding(used));
    }

    function scheduleShuffle(t) {
      if (reduced) return;
      var delay = 1300 + Math.random() * 1900;
      t.timer = window.setTimeout(function () {
        recolor(t);
        scheduleShuffle(t);
      }, delay);
    }

    state.forEach(function (t, i) {
      t.el.textContent = t.el.dataset.word;
      paint(t, SWATCHES[i % SWATCHES.length]);
      t.el.addEventListener("pointerenter", function () {
        if (t.timer) window.clearTimeout(t.timer);
        recolor(t);
        scheduleShuffle(t);
      });
    });

    if (reduced) {
      bar.classList.add("revealed");
      return;
    }

    state.forEach(function (t, i) {
      window.setTimeout(function () {
        bar.classList.add("revealed");
      }, 20);
    });

    var assembledAt = tiles.length * 130 + 760;
    state.forEach(function (t) {
      window.setTimeout(function () {
        scheduleShuffle(t);
      }, assembledAt);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
