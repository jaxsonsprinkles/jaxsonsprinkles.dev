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
2. `.sidebar` nav with icon links
3. `<link rel="stylesheet" href="style.css">` (or `../style.css` in `blog/`)
4. `<script src="main.js">` (or `../main.js` in `blog/`) at end of `<body>`
5. Set `class="active"` on the correct `.nav-icon` for the current page (hardcoded in HTML; `main.js` will override on load)

**Design tokens** (CSS vars in `:root`):
- `--bg`, `--surface`, `--border` — background layers
- `--text`, `--text-muted`, `--text-light` — text hierarchy
- `--accent` / `--accent-hover` — green (`#2d5a27` / `#3d7a35`)
- `--font-serif` (Lora) / `--font-sans` (Nunito)

**New blog posts**: create `blog/<slug>.html`, copy structure from existing post, update `blog.html` index listing.

## Deployment

Push to `master` → GitHub Pages auto-deploys to jaxsonsprinkles.dev. No CI, no build step.
