# NFG // NfgOdin Website (`nfgodin.github.io`)

Official portfolio, **PC Ports** showcase, open-source project catalog, and technical tutorial hub for **Jonathan Roberts (`NfgOdin` / `NFG`)**, built with **Astro** and auto-deployed to [https://nfgodin.github.io](https://nfgodin.github.io) via GitHub Actions.

---

## Local Development

```bash
npm install
npm run dev      # Start local dev server (http://localhost:4321)
npm run check    # Run Astro + TypeScript checks
npm run build    # Build production static site into dist/
npm run preview  # Preview production dist/ locally
```

---

## Adding Content

- **Add a new PC Port**: Add an entry to `pcPorts` in [src/data/ports.ts](file:///c:/Users/jonat/Documents/Antigravity%20Projects/Nfg_Website/src/data/ports.ts). It automatically appears in `/projects/pc-ports/`, `/projects/`, the Home spotlight, the `Ctrl+K` command palette, `sitemap-index.xml`, and gets its own SEO detail page at `/projects/pc-ports/<slug>/`.
- **Add PC Port screenshots**: Drop images into `public/images/ports/<slug>/` and list them in the port's `screenshots` array in `src/data/ports.ts`.
- **Add a Project or Mod**: Add an entry to `projects` in [src/data/projects.ts](file:///c:/Users/jonat/Documents/Antigravity%20Projects/Nfg_Website/src/data/projects.ts).
- **Add a Tutorial**: Create a Markdown file with frontmatter inside `src/content/tutorials/<category>/<subcategory>/<slug>.md`. GitHub callouts (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`) and syntax-highlighted copyable code blocks work automatically.

---

## Deployment (GitHub Pages)

1. Push changes to `main`:
   ```bash
   git add .
   git commit -m "feat: site update"
   git push origin main
   ```
2. In your GitHub repository settings (**Settings → Pages → Build and deployment → Source**), ensure **GitHub Actions** is selected. The workflow at [.github/workflows/deploy.yml](file:///c:/Users/jonat/Documents/Antigravity%20Projects/Nfg_Website/.github/workflows/deploy.yml) automatically builds and publishes the site on every push.
