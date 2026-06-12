# Portfolio ForgeWorks Color Recon

Phase 1 investigation only. No build, install, update, commit, or push was run.

Repo checked: `/home/lo-mein/uyammadu-portfolio`  
Branch checked: `main...origin/main`  
Local instructions read: `CLAUDE.md`

## 1. Build System

`package.json` scripts:

```json
"scripts": {
  "clean": "rm -rf dist",
  "build:css": "sass sass/main.scss css/style.css --style=compressed --no-source-map",
  "build:static": "mkdir -p dist && cp -R *.html *.txt *.xml _redirects _headers css assets index.js dist/",
  "build": "npm run clean && npm run build:css && npm run build:static",
  "dev": "sass sass/main.scss css/style.css --watch --no-source-map",
  "preview": "python3 scripts/preview.py"
}
```

`wrangler.toml`:

```toml
name = "uyammadu-dev-pages"
pages_build_output_dir = "./dist"
compatibility_date = "2026-05-08"
```

Command behavior:

- `npm run build:css` compiles `sass/main.scss` to `css/style.css`.
- `npm run build` deletes `dist/`, compiles Sass to `css/style.css`, then copies HTML, CSS, assets, redirects, headers, and `index.js` into `dist/`.
- `wrangler.toml` points Cloudflare Pages at `./dist`.

Conclusion: editing `dist/` directly will be overwritten by `npm run build`, because `clean` removes `dist/` and `build:static` recopies files from source. Editing `css/style.css` directly will also be overwritten by `npm run build:css`; `CLAUDE.md` explicitly says `css/style.css` is compiled output and Sass source should be edited instead.

## 2. ForgeWorks / ForgeTable Block Locations

Dedicated page: `forgeworks.html`.

Relevant hero/case-study header:

```html
<section class="uy-pagehead">
  <div class="uy-container">
    <div class="uy-pagehead__crumb"><a href="/">Home</a><span>/</span><a href="/projects">Projects</a><span>/</span>ForgeWorks</div>
    <span class="uy-eyebrow">Portfolio case study</span>
    <h1 class="uy-h1">ForgeWorks</h1>
    <p class="uy-lede">Local builder community platform (working repo: ForgeTable)</p>
    <p class="uy-body">
      A Rust + Axum + SQLite prototype for organizing a weekly local
      builder table — project nights, RSVPs, a project board, published
      meeting recaps, sponsor and join pages, and a community tech help
      intake — designed around an explicit public/private boundary
      between member-facing pages and operator-only data. Public launch
      polish is in progress; the platform is not a finished public
      product.
    </p>
    <div class="uy-case-actions" aria-label="ForgeWorks project actions">
      <a class="uy-btn uy-btn--primary uy-btn--lg" href="/projects">Back to projects</a>
      <span class="uy-pill uy-pill--dev">In development</span>
      <span class="uy-btn uy-btn--ghost uy-btn--disabled" aria-disabled="true">Private repo / available on request</span>
      <span class="uy-btn uy-btn--ghost uy-btn--disabled" aria-disabled="true">Public pilot polish in progress</span>
    </div>
  </div>
</section>
```

Dedicated page body panels and architecture blocks are also in `forgeworks.html` using shared classes such as `.uy-case-grid`, `.uy-case-panel`, `.uy-case-pipeline`, `.uy-arch`, and `.uy-arch__node`.

Projects page card: `projects.html`.

Relevant card:

```html
<article class="uy-project">
  <div class="uy-project__media" aria-hidden="true">
    <span class="uy-project__media-label">Community / Build Platform</span>
  </div>
  <div class="uy-project__head">
    <h3 class="uy-project__title">ForgeWorks / ForgeTable</h3>
    <span class="uy-pill uy-pill--dev">In development</span>
  </div>
  <span class="uy-project__subtitle">Community / Build Platform</span>
  <p class="uy-project__desc">
    Community build platform concept for events, challenges, member profiles, and local technology collaboration. Built on a Rust + Axum + SQLite stack.
  </p>
  <div class="uy-project__tags">
    <span>Rust</span><span>Axum</span><span>SQLite</span><span>Events</span>
  </div>
  <div class="uy-project__actions">
    <a class="uy-btn uy-btn--ghost" href="/forgeworks">View Concept</a>
  </div>
</article>
```

Homepage: `index.html` has selected project cards, but it does not currently include a ForgeWorks / ForgeTable card.

## 3. Current Color Rules Styling That Block

There are no ForgeWorks-specific inline color styles on the `forgeworks.html` or `projects.html` ForgeWorks card markup. The colors come from shared Sass partials and global `$uy-*` tokens.

Source tokens in `sass/abstracts/_variables.scss`:

```scss
$uy-deep:    #0f1a14;   // Deep field green — hero, footer, dark panels
$uy-primary: #2d6a4f;   // Forest green — links, primary surfaces
$uy-accent:  #b68a3e;   // Brass — CTAs, highlights, operator marks
$uy-warm:    #8e6a2a;   // Aged brass — secondary warm accent

$uy-ink:        #14181c;
$uy-ink-2:      #2c3531;
$uy-muted:      #5f6b65;
$uy-muted-2:    #8a938c;
$uy-line:       #d6cfc0;
$uy-line-2:     #b8ae99;
$uy-surface:    #ffffff;
$uy-surface-2:  #f8f4eb;
$uy-surface-3:  #eae3d5;
$uy-surface-deep: #0f1a14;
$uy-surface-page: #f2ede3;

$uy-status-live:    #2d6a4f;
$uy-status-proto:   #8e6a2a;
$uy-status-dev:     #b68a3e;
$uy-status-private: #6b7570;
$uy-status-research: #5a4a2a;
```

ForgeWorks card rules in `sass/components/_uy-cards.scss`:

```scss
.uy-project {
  background: $uy-surface;
  border: 1px solid $uy-line;
  border-radius: $uy-radius-lg;
  ...

  &:hover {
    box-shadow: $uy-shadow-md;
    border-color: $uy-line-2;
  }

  &__media {
    border-bottom: 1px solid $uy-line;
    background:
      linear-gradient(to right, rgba($uy-line, 0.72) 1px, transparent 1px),
      linear-gradient(to bottom, rgba($uy-line, 0.72) 1px, transparent 1px),
      linear-gradient(135deg, rgba($uy-primary, 0.09), rgba($uy-accent, 0.10)),
      $uy-surface-2;
  }

  &__media-label {
    background: rgba($uy-surface, 0.92);
    border: 1px solid rgba($uy-line-2, 0.85);
    color: $uy-ink-2;
  }

  &__title { color: $uy-ink; }
  &__subtitle { color: $uy-muted; }
  &__desc { color: $uy-muted; }

  &__tags span {
    color: $uy-muted;
    background: $uy-surface-2;
    border: 1px solid $uy-line;
  }
}
```

ForgeWorks pagehead rules in `sass/pages/_uy-pagehead.scss`:

```scss
.uy-pagehead {
  background:
    radial-gradient(46rem 30rem at 10% -20%, rgba($uy-primary, 0.22), transparent 62%),
    $uy-deep;
  border-bottom: 1px solid rgba(#fff, 0.08);

  .uy-eyebrow {
    color: rgba(#fff, 0.62);
  }

  .uy-h1,
  .uy-h2,
  .uy-body {
    color: #efe8d6;
  }

  .uy-lede {
    color: rgba(#efe8d6, 0.76);
  }

  &__crumb {
    color: rgba(#efe8d6, 0.5);
    a { color: rgba(#efe8d6, 0.7); text-decoration: none; &:hover { color: #efe8d6; } }
  }
}
```

ForgeWorks case-study body rules in `sass/pages/_uy-case-study.scss`:

```scss
.uy-case-prose {
  p {
    color: $uy-muted;
  }
}

.uy-case-panel {
  background: $uy-surface;
  border: 1px solid $uy-line;
  box-shadow: $uy-shadow-sm;

  h3 {
    color: $uy-deep;
  }
}

.uy-case-list li {
  color: $uy-muted;

  &::before {
    background: $uy-accent;
  }
}

.uy-case-pipeline__step {
  border: 1px solid $uy-line;
  background: $uy-surface-2;
}

.uy-case-pipeline__num {
  background: rgba($uy-primary, 0.1);
  color: $uy-primary;
}

.uy-arch__node {
  border: 1px solid $uy-line;
  background: $uy-surface;
  box-shadow: $uy-shadow-sm;

  &::after {
    background: $uy-line-2;
  }

  span {
    color: $uy-primary;
  }

  strong {
    color: $uy-deep;
  }

  p {
    color: $uy-muted;
  }
}
```

Button and status pill rules in `sass/components/_uy-buttons.scss`:

```scss
.uy-btn {
  &:focus-visible {
    outline: 2px solid $uy-accent;
  }

  &--primary {
    background: $uy-primary;
    color: #fff;
  }

  &--accent {
    background: $uy-accent;
    color: $uy-deep;
  }

  &--ghost {
    background: transparent;
    color: $uy-ink;
    border-color: $uy-line-2;
  }

  &--disabled,
  &--disabled:hover {
    color: $uy-ink-2;
    background: $uy-surface-3;
    border-color: $uy-line;
  }
}

.uy-pagehead {
  .uy-btn--ghost,
  .uy-btn--quiet {
    color: #fff;
    border-color: rgba(#fff, 0.65);
    background: rgba(#fff, 0.10);
  }

  .uy-btn--disabled,
  .uy-btn--disabled:hover {
    color: rgba(#fff, 0.72);
    background: rgba(#fff, 0.06);
    border-color: rgba(#fff, 0.22);
  }
}

.uy-pill {
  background: $uy-surface-3;
  color: $uy-muted;

  &--dev {
    background: transparent;
    color: $uy-status-dev;
    border: 1px solid currentColor;
  }
}
```

## 4. CSS Custom Properties vs Sass Variables

The site does not use CSS custom properties for theme colors. The active design system is Sass-variable driven.

Relevant Sass variables:

- `$uy-deep: #0f1a14`
- `$uy-primary: #2d6a4f`
- `$uy-accent: #b68a3e`
- `$uy-warm: #8e6a2a`
- `$uy-ink: #14181c`
- `$uy-ink-2: #2c3531`
- `$uy-muted: #5f6b65`
- `$uy-muted-2: #8a938c`
- `$uy-line: #d6cfc0`
- `$uy-line-2: #b8ae99`
- `$uy-surface: #ffffff`
- `$uy-surface-2: #f8f4eb`
- `$uy-surface-3: #eae3d5`
- `$uy-surface-deep: #0f1a14`
- `$uy-surface-page: #f2ede3`
- `$uy-status-dev: #b68a3e`

Only unrelated language-proficiency rails use CSS custom properties:

```scss
.uy-language-rail {
  --rail: 0.5;
}

.uy-language-rail span {
  width: calc(var(--rail) * 100%);
}
```

Those `--rail` custom properties are not theme colors and do not affect ForgeWorks / ForgeTable.

## 5. Recommendation

Single rebuild-safe source of truth for the current shared color system:

```text
sass/abstracts/_variables.scss
```

If the desired change is to move the shared portfolio color system to the live ForgeTable palette, edit the `$uy-*` tokens there, mapping the live ForgeTable colors approximately as:

```scss
$uy-deep: #131010;          // ForgeTable iron near-black
$uy-primary: #FF6A3D;       // ForgeTable ember accent
$uy-accent: #FF6A3D;        // ForgeTable ember accent
$uy-surface-deep: #131010;  // ForgeTable iron near-black
```

and update the warm neutral tokens around the live ForgeTable iron/off-white palette, e.g. `$uy-line`, `$uy-line-2`, `$uy-surface-2`, `$uy-surface-3`, `$uy-surface-page`, `$uy-muted`, and `$uy-status-dev`.

Important scope note: editing `sass/abstracts/_variables.scss` will affect the whole `body.uy-page` portfolio design system, not only ForgeWorks. There is no existing ForgeWorks-only theme hook in the HTML, and the ForgeWorks card/page currently share generic `.uy-project`, `.uy-pagehead`, `.uy-case-*`, `.uy-btn`, and `.uy-pill` styles. If the requirement is ForgeWorks-only recoloring, a later implementation phase should add a scoped ForgeWorks class or modifier in the relevant HTML and place the scoped styles in Sass source, not in `dist/` or `css/style.css`.

Exact build command after source edits:

```bash
npm run build
```

This compiles Sass to `css/style.css` and then refreshes `dist/` for Cloudflare Pages. For CSS-only local iteration, `npm run build:css` compiles Sass to `css/style.css`, but it does not refresh `dist/`.
