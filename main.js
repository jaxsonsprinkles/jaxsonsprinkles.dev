// Active nav link based on current page
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (el) {
    const href = el.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
})();

// Hamburger menu
(function () {
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// GitHub contribution graph
(function () {
  var container = document.getElementById('gh-graph');
  if (!container) return;

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var CELL = 12;
  var GAP = 3;
  var STEP = CELL + GAP;
  var WEEKS = 36;
  var COLORS = ['#e8e8e8', '#b5d9b8', '#6ab978', '#2d8a48', '#1a6b3c'];

  var tip = document.createElement('div');
  tip.className = 'gh-tooltip';
  document.body.appendChild(tip);

  function showTip(e, text) { tip.textContent = text; tip.style.opacity = '1'; moveTip(e); }
  function moveTip(e) { tip.style.left = (e.clientX + 12) + 'px'; tip.style.top = (e.clientY - 34) + 'px'; }
  function hideTip() { tip.style.opacity = '0'; }

  function fmtDate(s) {
    var d = new Date(s + 'T12:00:00');
    return MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function buildGraph(contributions) {
    var map = {};
    contributions.forEach(function (c) { map[c.date] = c; });

    var today = new Date();
    var todayStr = today.toISOString().split('T')[0];
    var weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    var weeks = [];
    for (var w = WEEKS - 1; w >= 0; w--) {
      var week = [];
      for (var d = 0; d < 7; d++) {
        var dt = new Date(weekStart);
        dt.setDate(weekStart.getDate() - w * 7 + d);
        var ds = dt.toISOString().split('T')[0];
        week.push({ date: ds, count: (map[ds] || {}).count || 0, level: (map[ds] || {}).level || 0, future: ds > todayStr });
      }
      weeks.push(week);
    }

    // Month labels: first column always gets its month; subsequent labels only
    // when the 1st of the month falls in that week and it's 3+ cols from last label.
    var monthLabels = [];
    var lastLabelCol = -4;
    monthLabels.push({ col: 0, label: MONTHS[new Date(weeks[0][0].date + 'T12:00:00').getMonth()] });
    lastLabelCol = 0;
    weeks.forEach(function (week, i) {
      for (var d = 0; d < week.length; d++) {
        var day = new Date(week[d].date + 'T12:00:00');
        if (day.getDate() === 1 && i - lastLabelCol >= 3) {
          monthLabels.push({ col: i, label: MONTHS[day.getMonth()] });
          lastLabelCol = i;
          break;
        }
      }
    });

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;align-items:flex-start;gap:6px;min-width:max-content;';

    var dayCol = document.createElement('div');
    dayCol.style.cssText = 'display:flex;flex-direction:column;gap:' + GAP + 'px;padding-top:22px;flex-shrink:0;';
    ['', 'Mon', '', 'Wed', '', 'Fri', ''].forEach(function (label) {
      var s = document.createElement('span');
      s.textContent = label;
      s.style.cssText = 'height:' + CELL + 'px;font-size:9px;color:var(--text-muted);font-family:var(--font-mono);line-height:' + CELL + 'px;display:block;';
      dayCol.appendChild(s);
    });

    var main = document.createElement('div');
    main.style.cssText = 'display:flex;flex-direction:column;';

    var monthRow = document.createElement('div');
    monthRow.style.cssText = 'position:relative;height:18px;margin-bottom:4px;';
    monthLabels.forEach(function (ml) {
      var s = document.createElement('span');
      s.textContent = ml.label;
      s.style.cssText = 'position:absolute;left:' + (ml.col * STEP) + 'px;font-size:10px;color:var(--text-muted);font-family:var(--font-mono);';
      monthRow.appendChild(s);
    });

    var weeksRow = document.createElement('div');
    weeksRow.style.cssText = 'display:flex;gap:' + GAP + 'px;';

    weeks.forEach(function (week, wi) {
      var weekEl = document.createElement('div');
      weekEl.style.cssText = 'display:flex;flex-direction:column;gap:' + GAP + 'px;opacity:0;transform:translateY(4px);transition:opacity 0.25s ease,transform 0.25s ease;';

      week.forEach(function (contrib) {
        var cell = document.createElement('div');
        var bg = contrib.future ? 'transparent' : COLORS[contrib.level || 0];
        cell.style.cssText = 'width:' + CELL + 'px;height:' + CELL + 'px;border-radius:2px;cursor:default;flex-shrink:0;background:' + bg + ';';
        if (!contrib.future) {
          var text = contrib.count === 0
            ? 'No contributions on ' + fmtDate(contrib.date)
            : contrib.count + ' contribution' + (contrib.count !== 1 ? 's' : '') + ' on ' + fmtDate(contrib.date);
          cell.addEventListener('mouseenter', function (e) { showTip(e, text); });
          cell.addEventListener('mousemove', moveTip);
          cell.addEventListener('mouseleave', hideTip);
        }
        weekEl.appendChild(cell);
      });

      weeksRow.appendChild(weekEl);
      setTimeout(function () {
        weekEl.style.opacity = '1';
        weekEl.style.transform = 'translateY(0)';
      }, wi * 22 + 80);
    });

    main.appendChild(monthRow);
    main.appendChild(weeksRow);
    wrapper.appendChild(dayCol);
    wrapper.appendChild(main);

    var inner = document.createElement('div');
    inner.style.cssText = 'overflow-x:auto;';
    inner.appendChild(wrapper);

    var total = weeks.reduce(function (sum, week) {
      return sum + week.reduce(function (s, c) { return s + (!c.future ? c.count || 0 : 0); }, 0);
    }, 0);
    var footer = document.createElement('p');
    footer.textContent = total.toLocaleString() + ' contributions in the last 9 months';
    footer.style.cssText = 'margin-top:10px;font-size:11px;color:var(--text-muted);font-family:var(--font-mono);';

    container.innerHTML = '';
    container.appendChild(inner);
    container.appendChild(footer);
  }

  container.innerHTML = '<p style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono)">loading...</p>';

  fetch('https://github-contributions-api.jogruber.de/v4/jaxsonsprinkles?y=last')
    .then(function (r) { return r.json(); })
    .then(function (data) { buildGraph(data.contributions); })
    .catch(function () {
      container.innerHTML = '<p style="font-size:11px;color:var(--text-muted)">could not load activity</p>';
    });
})();

// Press [c] to copy email
(function () {
  var hint = document.getElementById('emailHint');
  if (!hint) return;
  var original = hint.innerHTML;

  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'c' &&
      !e.ctrlKey &&
      !e.metaKey &&
      document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA'
    ) {
      navigator.clipboard.writeText('jaxsonsprinkles@gmail.com').then(function () {
        hint.textContent = 'copied ✓';
        hint.classList.add('copied');
        setTimeout(function () {
          hint.innerHTML = original;
          hint.classList.remove('copied');
        }, 2000);
      }).catch(function () {});
    }
  });
})();
