# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal website for jaxsonsprinkles.dev. Vite + React + TypeScript + Tailwind CSS v4, using [BoardUI](https://www.boardui.com/llms.txt) components. Built to static files and deployed via GitHub Pages.

## Commands

- `bun install`, then `bun run dev` (dev server), `bun run build` (typecheck + build to `dist/`), `bun run preview`.

## Structure

- Multi-page build: each top-level `*.html` (and those in `blog/`, `articles/`) is a thin shell holding the page's `<head>` meta (title, description, `og:*`/`twitter:*`, canonical, favicon) plus `<div id="root" data-page="...">` and `/src/entry.tsx`. URLs stay `/about.html`, `/blog/<slug>.html`, etc.
- `src/entry.tsx` mounts the page named by `data-page`; the name → component map is `src/pages/index.tsx`.
- `src/pages/` — page components. `src/components/site/` — site chrome (`Layout` nav + mobile menu, section labels, GitHub graph, hover hints). `src/components/base/` — BoardUI components (source-owned; add more with `npx boardui@latest add <name>`).
- `src/content/` — project list, post metadata (`posts.ts`) and post/article bodies.
- `src/styles/` — BoardUI `theme.css`/`typography.css`/`globals.css` plus `site.css` (page layout, accent retinted to green).
- `public/` — static assets served as-is (images, `favicon.svg`, `resume.pdf`, `signature.json`, `CNAME`).

## Conventions

- Prefer an installed BoardUI component over hand-built UI; see `AGENTS.md` for BoardUI's token/typography rules (semantic tokens only, `cx()` for classes, Remix icons).
- Every new page needs its own HTML shell in the repo root (copy an existing one) **and** an entry in `vite.config.ts` `pages` and `src/pages/index.tsx`, with `<meta name="description">`, `og:*`/`twitter:*`, canonical, and the favicon link.
- Add the nav link in `src/components/site/layout.tsx` if the page belongs in the nav.
- **New blog posts**: add `src/content/<name>.tsx` (body), an entry in `src/content/posts.ts`, a page in `src/pages/posts.tsx`, an HTML shell `blog/<slug>.html`, and its `vite.config.ts` entry.

## Deployment

Push to `master` → GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys `dist/` to GitHub Pages at jaxsonsprinkles.dev. The repo's Pages source must be set to "GitHub Actions" (Settings → Pages).
