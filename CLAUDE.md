# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

uyammadu-portfolio — the static `dev.uyammadu.com` personal portfolio
and dev services site for Chukwuemelie "Chuk" Uyammadu. Public pages
are HTML/CSS/vanilla JS with a SASS build step. The only server-side
surface is the Cloudflare Pages Function under `functions/api/contact.js`.

Name rule: use "Chuk Uyammadu" for public display copy. Use
"Chukwuemelie \"Chuk\" Uyammadu" for formal/about/resume-style context.
Do not use Bob as a public display name.

## Commands

```bash
# Watch SASS and compile to CSS during development
npm run dev

# Production build
npm run build

# Preview dist/ with clean local routes
npm run preview
```

> `css/style.css` is the **compiled output** — edit SASS source files, not this file directly.

## Architecture

**Pages**: `index.html`, `services.html`, `pricing.html`, `projects.html`,
`orion.html`, `cameras.html`, and `contact.html`.

**JavaScript** (`index.js`): Only handles hamburger menu toggle and mobile nav close-on-click. No external libraries.

**SASS structure** (7-1 pattern, entry point `sass/main.scss`).

Two coexisting systems share the same partial tree:

- **Legacy Dopefolio system** — `pages/_home.scss`, `pages/_project-case-study.scss`. Used by archived pages only. Do not reference from new work.
- **dev.uyammadu.com system** — split into focused partials, all wrapped in `body.uy-page { ... }`. New pages MUST set `class="uy-page"` on `<body>`.

```
abstracts/
  _variables.scss   Legacy + new tokens. New tokens are $uy-* (color, type,
                    radius, shadow, motion, layout). Legacy: $themeClrPrimary.
  _mixins.scss      Breakpoints: phone(600), tab-port(900), tab-land(1200),
                    big-desktop(1800)
  _utilities.scss   Legacy helper classes (.btn, .heading-*)
base/
  _base.scss        Reset, smooth scroll, responsive font scaling (10px @ 1200px)
components/
  _header.scss, _footer.scss, _skills.scss, _mouse-scroll.scss   (legacy)
  _uy-base.scss     body.uy-page wrapper, layout primitives, typography
  _uy-buttons.scss  .uy-btn variants + .uy-pill variants
  _uy-nav.scss      .uy-nav (sticky, blurred)
  _uy-cards.scss    .uy-grid, .uy-card, .uy-projects, .uy-project
  _uy-pricing.scss  .uy-pricing*, .uy-callout, .uy-disclaimer
  _uy-form.scss     .uy-form, .uy-status-banner
  _uy-cta.scss      .uy-steps, .uy-cta-strip
  _uy-footer.scss   .uy-footer
  _uy-misc.scss     .uy-divider, .uy-prose, .uy-feature-list, utilities
pages/
  _home.scss, _project-case-study.scss     (legacy)
  _uy-hero.scss     home hero + .uy-codecard terminal mock
  _uy-ecosystem.scss .uy-split, .uy-eco, .uy-eco-card
  _uy-case-study.scss portfolio case-study layouts
  _uy-pagehead.scss sub-page hero + breadcrumb
```

**Source of truth for the new system**: `docs/SITE_BLUEPRINT.md` (full design system) and `docs/CLAUDE_DESIGN_HANDOFF.md` (Figma handoff packet).

**To change a brand color**: edit a `$uy-*` token in `sass/abstracts/_variables.scss`, then rebuild.

**To add a new project**: add a card to `projects.html` with the appropriate status pill (`.uy-pill--live|proto|dev|private|research`). Case-study templates `project-N.html` are legacy.

**Compiler note**: this repo uses Dart Sass through the local `sass`
package. Run `npm run build:css` or `npm run build`; do not edit
`css/style.css` directly.
