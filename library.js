// Bookshelf: builds book spines from BOOKS, tries a real cover image per
// Open Library cover id, and falls back to a styled CSS spine (color +
// vertical title/author) whenever no cover loads. Clicking a spine opens
// a small "have you read this too?" popover with a prefilled mailto link.
(function () {
  var shelf = document.getElementById('library-shelf');
  if (!shelf) return;

  var CONTACT_EMAIL = 'jaxsonsprinkles@gmail.com';

  // Influence, Everyone Communicates Few Connect, Pre-Suasion, and The 21
  // Irrefutable Laws of Leadership are pinned to the front of the shelf.
  var BOOKS = [
    { title: 'Influence', author: 'Robert Cialdini', coverId: 431011, w: 38 },
    { title: 'Everyone Communicates, Few Connect', author: 'John C. Maxwell', coverId: 9880925, w: 30 },
    { title: 'Pre-Suasion', author: 'Robert Cialdini', coverId: 7880005, w: 40 },
    { title: 'The 21 Irrefutable Laws of Leadership', author: 'John C. Maxwell', coverId: 1465659, w: 38 },
    { title: 'The Good Earth', author: 'Pearl S. Buck', coverId: 2626823, w: 34 },
    { title: 'Where the Sidewalk Ends', author: 'Shel Silverstein', coverId: 31070, w: 30 },
    { title: 'Scythe', author: 'Neal Shusterman', coverId: 8184999, w: 36 },
    { title: 'What If?', author: 'Randall Munroe', coverId: 9083979, w: 34 },
    { title: 'What If? 2', author: 'Randall Munroe', coverId: 14690788, w: 34 },
    { title: 'Eragon', author: 'Christopher Paolini', coverId: 13921600, w: 46 },
    { title: 'Eldest', author: 'Christopher Paolini', coverId: 12848701, w: 50 },
    { title: 'Brisingr', author: 'Christopher Paolini', coverId: 2411585, w: 54 },
    { title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', coverId: 10079937, w: 36 },
    { title: 'Outliers', author: 'Malcolm Gladwell', coverId: 10021591, w: 32 },
    { title: 'The Psychology of Money', author: 'Morgan Housel', coverId: 10389354, w: 28 },
    { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', coverId: 8315603, w: 32 },
    { title: 'Influencer', author: 'Patterson, Grenny, Maxfield, McMillan & Switzler', coverId: 7497436, w: 40 },
    { title: 'The Martian', author: 'Andy Weir', coverId: 11447888, w: 36 },
    { title: 'The Obstacle Is the Way', author: 'Ryan Holiday', coverId: 14428233, w: 30 },
    { title: 'The Hunger Games', author: 'Suzanne Collins', coverId: 12646537, w: 34 },
    { title: 'Project Hail Mary', author: 'Andy Weir', coverId: 11200092, w: 38 },
    { title: 'Harry Potter (Books 1–7)', author: 'J.K. Rowling', coverId: 276518, w: 90 },
    { title: 'The 4 Disciplines of Execution', author: 'McChesney, Covey & Huling', coverId: 9136687, w: 40 },
    { title: 'The Five Second Rule', author: 'Mel Robbins', coverId: 8114155, w: 26 },
    { title: 'Atomic Habits', author: 'James Clear', coverId: 12539702, w: 30 },
    { title: 'The Stars Beneath Our Feet', author: 'David Barclay Moore', coverId: 8806972, w: 32 },
    { title: 'The Things They Carried', author: "Tim O'Brien", coverId: 12639079, w: 28 },
    { title: 'An Empire of Wealth', author: 'John Steele Gordon', coverId: 21777, w: 42 },
    { title: 'Never Let Me Go', author: 'Kazuo Ishiguro', coverId: 1047334, w: 30 },
    { title: 'The Crucible', author: 'Arthur Miller', coverId: 8431392, w: 22 },
    { title: 'The Road', author: 'Cormac McCarthy', coverId: 198120, w: 26 },
    { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest & Stein', coverId: 2341462, w: 72 },
    { title: 'Deep Learning', author: 'Goodfellow, Bengio & Courville', coverId: 8086288, w: 56 },
    { title: 'Twenty-Four Seconds From Now', author: 'Jason Reynolds', coverId: 14824031, w: 28 },
    { title: 'The Complete Calvin and Hobbes', author: 'Bill Watterson', coverId: 14424592, w: 85 },
  ];

  var COLORS = [
    '#1a6b3c', // accent green
    '#7a2e2e', // maroon
    '#2e4a7a', // navy
    '#8a6d1f', // ochre
    '#6b3fa0', // plum
    '#1f6b6b', // teal
    '#a0522d', // sienna
    '#3d3d3d', // charcoal
    '#5c6b1f', // olive
  ];

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // --- hover tooltip -------------------------------------------------
  var tip = document.createElement('div');
  tip.className = 'book-tooltip';
  tip.setAttribute('role', 'tooltip');
  document.body.appendChild(tip);

  function showTipAtCursor(e, book) {
    if (openSpine) return;
    tip.innerHTML =
      '<span class="book-tooltip-title">' + escapeHtml(book.title) + '</span>' +
      '<span class="book-tooltip-author">' + escapeHtml(book.author) + '</span>';
    tip.style.left = e.clientX + 'px';
    tip.style.top = (e.clientY - 14) + 'px';
    tip.classList.add('visible');
  }

  function showTipAtElement(book, el) {
    if (openSpine) return;
    var r = el.getBoundingClientRect();
    tip.innerHTML =
      '<span class="book-tooltip-title">' + escapeHtml(book.title) + '</span>' +
      '<span class="book-tooltip-author">' + escapeHtml(book.author) + '</span>';
    tip.style.left = (r.left + r.width / 2) + 'px';
    tip.style.top = r.top + 'px';
    tip.classList.add('visible');
  }

  function hideTip() {
    tip.classList.remove('visible');
  }

  // --- click-to-email popover -----------------------------------------
  var popover = document.createElement('div');
  popover.className = 'book-popover';
  popover.setAttribute('aria-hidden', 'true');
  popover.innerHTML =
    '<div class="book-popover-title"></div>' +
    '<div class="book-popover-prompt">Have you read this too?</div>' +
    '<a class="book-popover-link"></a>';
  document.body.appendChild(popover);
  var popoverTitle = popover.querySelector('.book-popover-title');
  var popoverLink = popover.querySelector('.book-popover-link');
  var openSpine = null;

  function openPopover(book, el) {
    hideTip();
    popoverTitle.textContent = book.title;
    var subject = "I've also read " + book.title;
    var body = 'Hey Jaxson, I\'ve also read "' + book.title + '" by ' + book.author + '. Let\'s chat!';
    popoverLink.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    popoverLink.textContent = "Let's talk about it →";

    var r = el.getBoundingClientRect();
    var x = Math.min(Math.max(r.left + r.width / 2, 132), window.innerWidth - 132);
    popover.style.left = x + 'px';
    popover.style.top = r.top + 'px';
    popover.classList.add('visible');
    popover.setAttribute('aria-hidden', 'false');

    if (openSpine) openSpine.setAttribute('aria-expanded', 'false');
    el.setAttribute('aria-expanded', 'true');
    openSpine = el;
  }

  function closePopover() {
    popover.classList.remove('visible');
    popover.setAttribute('aria-hidden', 'true');
    if (openSpine) openSpine.setAttribute('aria-expanded', 'false');
    openSpine = null;
  }

  document.addEventListener('click', function (e) {
    if (!openSpine) return;
    if (popover.contains(e.target)) return;
    closePopover();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openSpine) closePopover();
  });

  // --- build spines ----------------------------------------------------
  BOOKS.forEach(function (book, i) {
    var color = COLORS[(i * 5) % COLORS.length];

    var spine = document.createElement('div');
    spine.className = 'book-spine';
    spine.style.setProperty('--spine-w', book.w + 'px');
    spine.style.setProperty('--spine-color', color);
    spine.tabIndex = 0;
    spine.setAttribute('role', 'button');
    spine.setAttribute('aria-haspopup', 'dialog');
    spine.setAttribute('aria-expanded', 'false');
    spine.setAttribute('aria-label', book.title + ' by ' + book.author);

    var titleEl = document.createElement('span');
    titleEl.className = 'book-spine-title';
    titleEl.textContent = book.title;
    titleEl.setAttribute('aria-hidden', 'true');

    var authorEl = document.createElement('span');
    authorEl.className = 'book-spine-author';
    authorEl.textContent = book.author;
    authorEl.setAttribute('aria-hidden', 'true');

    spine.appendChild(titleEl);
    spine.appendChild(authorEl);

    if (book.coverId) {
      var img = document.createElement('img');
      img.className = 'book-spine-cover';
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = 'https://covers.openlibrary.org/b/id/' + book.coverId + '-M.jpg';
      img.onerror = function () {
        img.remove();
      };
      img.onload = function () {
        // Open Library serves a tiny 1px placeholder when it has no cover on file
        if (img.naturalWidth <= 1) {
          img.remove();
          return;
        }
        spine.classList.add('has-cover');
      };
      spine.appendChild(img);
    }

    var shade = document.createElement('span');
    shade.className = 'book-spine-shade';
    shade.setAttribute('aria-hidden', 'true');
    spine.appendChild(shade);

    spine.addEventListener('mouseenter', function (e) {
      showTipAtCursor(e, book);
    });
    spine.addEventListener('mousemove', function (e) {
      showTipAtCursor(e, book);
    });
    spine.addEventListener('mouseleave', hideTip);
    spine.addEventListener('focus', function () {
      showTipAtElement(book, spine);
    });
    spine.addEventListener('blur', hideTip);

    spine.addEventListener('click', function (e) {
      e.stopPropagation();
      if (openSpine === spine) {
        closePopover();
      } else {
        openPopover(book, spine);
      }
    });
    spine.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        e.stopPropagation();
        if (openSpine === spine) {
          closePopover();
        } else {
          openPopover(book, spine);
        }
      }
    });

    if (!reduceMotion) {
      spine.style.transitionDelay = Math.min(i * 12, 300) + 'ms';
      spine.classList.add('book-spine-enter');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          spine.classList.remove('book-spine-enter');
        });
      });
    }

    shelf.appendChild(spine);
  });

  var shelfScroll = document.querySelector('.library-shelf-scroll');
  if (shelfScroll) shelfScroll.addEventListener('scroll', closePopover);
})();
