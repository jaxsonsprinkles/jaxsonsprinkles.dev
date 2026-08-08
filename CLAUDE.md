# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static personal website for jaxsonsprinkles.dev. No build step, no framework, no package manager. Pure HTML/CSS/JS deployed via GitHub Pages.

## Structure

- `index.html`, `about.html`, `blog.html`, `contact.html`, `projects.html` — top-level pages
- `blog/` — individual blog post HTML files; use `../style.css` and `../main.js` paths
- `style.css` — single shared stylesheet for all pages
- `main.js` — shared JS (active nav highlighting, hamburger menu)
- `CNAME` — GitHub Pages custom domain config

## Conventions

**Every page** must include:
1. Hamburger button + `#mobileMenu` div (mobile nav)
2. `.topnav` with `.nav-links` (`.nav-link` items)
3. `<link rel="stylesheet" href="style.css">` (or `../style.css` in `blog/`)
4. `<script src="main.js">` (or `../main.js` in `blog/`) at end of `<body>`
5. Set `class="active"` on the correct `.nav-link` for the current page (hardcoded in HTML; `main.js` will override on load)
6. `<meta name="description">`, `og:*`/`twitter:*` tags, `<link rel="canonical">`, and `<link rel="icon" type="image/svg+xml" href="favicon.svg">` (or `../favicon.svg` in `blog/`)

**Design tokens** (CSS vars in `:root`):
- `--bg`, `--surface`, `--border` — background layers
- `--text`, `--text-muted`, `--text-light` — text hierarchy
- `--accent` / `--accent-hover` — green (`#1a6b3c` / `#1f8049`)
- `--font-sans` (Inter) / `--font-mono` (JetBrains Mono)

**New blog posts**: create `blog/<slug>.html`, copy structure from existing post, update `blog.html` index listing.

## Deployment

Push to `master` → GitHub Pages auto-deploys to jaxsonsprinkles.dev. No CI, no build step.
