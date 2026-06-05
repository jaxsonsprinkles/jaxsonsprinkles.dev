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
