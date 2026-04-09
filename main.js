// Active nav icon based on current page
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-icon').forEach(function (el) {
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

  // Close on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
