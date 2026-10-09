import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Multi-page build: every HTML file is its own entry so each page keeps its
// own <title>/meta/canonical and URLs stay the same on GitHub Pages.
const pages = [
  "index",
  "about",
  "blog",
  "contact",
  "projects",
  "blog/if-you-build-it-they-will-not-come",
  "blog/you-can-just-email-people",
  "articles/index",
  "articles/linkedin-profile",
];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
