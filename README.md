# dev.uyammadu.com

Public-facing freelance and business technology services site for
**Chuk Uyammadu**. Part of the broader `uyammadu.com` ecosystem.

This is a static, dependency-light website. Pure HTML, CSS, and a
small amount of vanilla JavaScript, with a SASS build step. No
framework, no backend, no tracking scripts.

---

## What this site is

`dev.uyammadu.com` is the dependable, business-facing surface of the
Uyammadu ecosystem. It covers:

- AI systems and automation
- Local business technology support
- Camera and security system installation and management
- Websites and local SEO
- Networking and IT support
- Restaurant technology consulting
- A working portfolio of projects across all of the above

The umbrella `uyammadu.com` will eventually host portfolio pages,
writing, AI agents, and other ventures. This repo is one branch of
that ecosystem.

---

## Local development

```bash
# Install dev dependencies (one time)
npm install

# Watch SASS during local development (compiles to css/style.css on save)
npm run dev

# Production build (compiles CSS and copies deployable files to dist/)
npm run build
```

Preview the generated `dist/` folder:

```bash
npm run preview
```

Then open `http://127.0.0.1:4173`. The preview command uses
`scripts/preview.py`, a small local-only static server that maps clean
routes like `/contact` to `dist/contact.html` so local preview matches
Cloudflare Pages' extensionless URLs.

> `css/style.css` is the **compiled output**. Edit SASS sources under
> `sass/`, never the compiled CSS directly.

---

## Page structure

```
/
├── index.html          Home — hero, services preview, projects preview, ecosystem, CTA
├── services.html       Full service catalog (5 practices)
├── pricing.html        Estimated price ranges and timeframes
├── projects.html       Portfolio index with honest status pills
├── cameras.html        Camera and security systems detail page
├── contact.html        Service request form (front-end only for now)
│
├── archive/            Previous portfolio pages, kept for reference
│   ├── README.md
│   ├── index-legacy.html
│   ├── README-dopefolio.md
│   ├── project-1.html
│   ├── project-2.html
│   └── project-3.html
│
├── docs/               Source-of-truth documents
│   ├── SITE_BLUEPRINT.md
│   ├── SERVICE_CATALOG.md
│   ├── PRICING_GUIDE.md
│   ├── CAMERA_SYSTEMS_SERVICE_GUIDE.md
│   ├── OPPORTUNITY_RADAR_BLUEPRINT.md
│   ├── CRENSHAW_NTFY_WORKFLOW.md
│   └── DEPLOYMENT_NOTES.md
│
├── backend/            Reserved scaffold for future local-only tooling
│   ├── README.md
│   ├── lead_radar_blueprint.md
│   └── .gitkeep
│
├── assets/             Images, SVG icons, brand mark
├── css/                Compiled CSS output
├── sass/               SASS sources (7-1 pattern; see below)
├── index.js            Mobile nav, year stamp, form guard
├── package.json        Build scripts
└── LICENSE
```

---

## SASS structure

The site uses the existing 7-1 SASS layout, with one **new** partial
that holds the entire `dev.uyammadu.com` design system.

```
sass/
├── main.scss
├── abstracts/
│   ├── _variables.scss   Legacy theme tokens + new $uy-* design tokens
│   ├── _mixins.scss      respond() breakpoints
│   └── _utilities.scss   .btn, .heading-*, .main-container (legacy)
├── base/
│   └── _base.scss        reset + responsive font scaling
├── components/           legacy header / footer / skills / mouse scroll
└── pages/
    ├── _home.scss              legacy
    ├── _project-case-study.scss legacy
    └── _uy.scss                 NEW design system, scoped to body.uy-page
```

All new pages set `<body class="uy-page">` and use the `uy-*` classes.
The legacy partials are kept compiling because the archived pages
reference them — but they are not linked from the live site.

To change the brand colors, edit the `$uy-*` tokens in
`sass/abstracts/_variables.scss` and rebuild. The full token list is
documented in `docs/SITE_BLUEPRINT.md`.

---

## Documentation

Each major service area or system has a corresponding markdown source
of truth in `docs/`:

| Doc                                          | Purpose                                                                |
| -------------------------------------------- | ---------------------------------------------------------------------- |
| `docs/SITE_BLUEPRINT.md`                     | IA, brand positioning, design tokens, accessibility goals               |
| `docs/SERVICE_CATALOG.md`                    | Source of truth for `services.html`                                     |
| `docs/PRICING_GUIDE.md`                      | Source of truth for `pricing.html`                                      |
| `docs/CAMERA_SYSTEMS_SERVICE_GUIDE.md`       | Source of truth for `cameras.html` (scope, retention, handoff)          |
| `docs/OPPORTUNITY_RADAR_BLUEPRINT.md`        | Future local lead-radar product blueprint (planning, not built)         |
| `docs/CRENSHAW_NTFY_WORKFLOW.md`             | How the Crenshaw agent uses ntfy during build / deploy                  |
| `docs/DEPLOYMENT_NOTES.md`                   | Deploy targets, build commands, rollout / rollback                      |

When updating site content, **update the doc first**, then mirror to
the page. This keeps the docs canonical.

---

## Deployment

Target domain: `dev.uyammadu.com`.

The repo is a static build. Recommended deploy targets and exact
commands are in `docs/DEPLOYMENT_NOTES.md`. In short:

- Build command: `npm run build`
- Publish directory: `/`

Works on Netlify, Cloudflare Pages, Vercel, or self-hosted via Caddy
or Nginx on `lo-mein`.

---

## Working agreement

A few rules baked into how this repo evolves:

- **Honest scope.** Don't claim services we don't actually offer. Use
  the project status pills (`Live`, `Prototype`, `In Development`,
  `Private deployment`, `Research concept`) accurately.
- **No tracking scripts** without an explicit follow-up decision.
- **No secrets** in the repo.
- **Update docs first**, then pages.
- **Preserve archive/.** Old work is kept, not deleted.
- **Static, dependency-light.** Don't add heavy build tooling unless
  there's a clear reason.

---

## Contact

- Email: `chuk.uyammadu@gmail.com`
- Phone: `254-258-7270`
- GitHub: [Bobbygkmc](https://github.com/Bobbygkmc)

---

## License

The original Dopefolio template was licensed under GPL-3.0 (see
`LICENSE`). All new content authored for `dev.uyammadu.com` is owned
by Chuk Uyammadu.
