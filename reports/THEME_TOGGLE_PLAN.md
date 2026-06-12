# Light/Dark Theme Toggle Plan

Phase A planning only. No build, install/update/sync, commit, or push should be run for this phase.

Inputs read:

- `CLAUDE.md`
- `PORTFOLIO_RECON.md`
- `sass/abstracts/_variables.scss`
- Sass token references under `sass/`
- Current header markup and `index.js`

## 1. Token Map

The runtime theme needs CSS custom properties because current `$uy-*` Sass color variables compile to fixed colors.

| Current Sass token | Proposed CSS custom property | Current value |
| --- | --- | --- |
| `$uy-deep` | `--color-deep` | `#0f1a14` |
| `$uy-primary` | `--color-primary` | `#2d6a4f` |
| `$uy-accent` | `--color-accent` | `#b68a3e` |
| `$uy-warm` | `--color-warm` | `#8e6a2a` |
| `$uy-ink` | `--color-ink` | `#14181c` |
| `$uy-ink-2` | `--color-ink-2` | `#2c3531` |
| `$uy-muted` | `--color-muted` | `#5f6b65` |
| `$uy-muted-2` | `--color-muted-2` | `#8a938c` |
| `$uy-line` | `--color-line` | `#d6cfc0` |
| `$uy-line-2` | `--color-line-2` | `#b8ae99` |
| `$uy-surface` | `--color-surface` | `#ffffff` |
| `$uy-surface-2` | `--color-surface-2` | `#f8f4eb` |
| `$uy-surface-3` | `--color-surface-3` | `#eae3d5` |
| `$uy-surface-deep` | `--color-surface-deep` | `#0f1a14` |
| `$uy-surface-page` | `--color-surface-page` | `#f2ede3` |
| `$uy-status-live` | `--color-status-live` | `#2d6a4f` |
| `$uy-status-proto` | `--color-status-proto` | `#8e6a2a` |
| `$uy-status-dev` | `--color-status-dev` | `#b68a3e` |
| `$uy-status-private` | `--color-status-private` | `#6b7570` |
| `$uy-status-research` | `--color-status-research` | `#5a4a2a` |

Related but not strictly color tokens:

- `$uy-shadow-sm`, `$uy-shadow-md`, `$uy-shadow-lg`, `$uy-shadow-glow` include fixed `rgba(...)` colors. They should either become CSS variables such as `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`, or be rebuilt using color-aware CSS values.
- Radius, motion, type, and layout `$uy-*` tokens should stay Sass variables; they do not need runtime theme switching.

## 2. Proposed Light Palette

Default theme: warm off-white and grey, with one restrained sage accent for action/link/highlight use. Status values remain muted functional labels.

| Sass token | CSS property | Light value |
| --- | --- | --- |
| `$uy-deep` | `--color-deep` | `#1A1714` |
| `$uy-primary` | `--color-primary` | `#5B7568` |
| `$uy-accent` | `--color-accent` | `#5B7568` |
| `$uy-warm` | `--color-warm` | `#6F665C` |
| `$uy-ink` | `--color-ink` | `#1A1714` |
| `$uy-ink-2` | `--color-ink-2` | `#34302B` |
| `$uy-muted` | `--color-muted` | `#6F6962` |
| `$uy-muted-2` | `--color-muted-2` | `#9B938A` |
| `$uy-line` | `--color-line` | `#DDD7D0` |
| `$uy-line-2` | `--color-line-2` | `#C8BFB5` |
| `$uy-surface` | `--color-surface` | `#FFFFFF` |
| `$uy-surface-2` | `--color-surface-2` | `#F1EEE9` |
| `$uy-surface-3` | `--color-surface-3` | `#E7E1DA` |
| `$uy-surface-deep` | `--color-surface-deep` | `#1A1714` |
| `$uy-surface-page` | `--color-surface-page` | `#FAF8F5` |
| `$uy-status-live` | `--color-status-live` | `#4F7667` |
| `$uy-status-proto` | `--color-status-proto` | `#7A6854` |
| `$uy-status-dev` | `--color-status-dev` | `#5B7568` |
| `$uy-status-private` | `--color-status-private` | `#77716B` |
| `$uy-status-research` | `--color-status-research` | `#6F6254` |

Optional shadow variables for light:

```css
--shadow-sm: 0 1px 0 rgb(26 23 20 / 0.04), 0 1px 3px rgb(26 23 20 / 0.04);
--shadow-md: 0 1px 0 rgb(26 23 20 / 0.04), 0 8px 22px rgb(26 23 20 / 0.07);
--shadow-lg: 0 2px 0 rgb(26 23 20 / 0.05), 0 18px 48px rgb(26 23 20 / 0.12);
--shadow-glow: 0 0 0 1px rgb(91 117 104 / 0.16), 0 16px 42px rgb(91 117 104 / 0.18);
```

## 3. Proposed Dark Palette

Dark theme: warm near-black base, warm grey surfaces, high-contrast warm text, same restrained sage accent adjusted lighter.

| Sass token | CSS property | Dark value |
| --- | --- | --- |
| `$uy-deep` | `--color-deep` | `#0C0A09` |
| `$uy-primary` | `--color-primary` | `#8FB3A2` |
| `$uy-accent` | `--color-accent` | `#8FB3A2` |
| `$uy-warm` | `--color-warm` | `#A79D92` |
| `$uy-ink` | `--color-ink` | `#F4EFE8` |
| `$uy-ink-2` | `--color-ink-2` | `#DED6CD` |
| `$uy-muted` | `--color-muted` | `#B8AEA4` |
| `$uy-muted-2` | `--color-muted-2` | `#8F867D` |
| `$uy-line` | `--color-line` | `#3A342E` |
| `$uy-line-2` | `--color-line-2` | `#51483F` |
| `$uy-surface` | `--color-surface` | `#1B1815` |
| `$uy-surface-2` | `--color-surface-2` | `#24201C` |
| `$uy-surface-3` | `--color-surface-3` | `#2E2924` |
| `$uy-surface-deep` | `--color-surface-deep` | `#0C0A09` |
| `$uy-surface-page` | `--color-surface-page` | `#12100E` |
| `$uy-status-live` | `--color-status-live` | `#8FB3A2` |
| `$uy-status-proto` | `--color-status-proto` | `#C4A678` |
| `$uy-status-dev` | `--color-status-dev` | `#8FB3A2` |
| `$uy-status-private` | `--color-status-private` | `#9A928B` |
| `$uy-status-research` | `--color-status-research` | `#BCA978` |

Optional shadow variables for dark:

```css
--shadow-sm: 0 1px 0 rgb(0 0 0 / 0.24), 0 1px 3px rgb(0 0 0 / 0.22);
--shadow-md: 0 1px 0 rgb(0 0 0 / 0.24), 0 10px 28px rgb(0 0 0 / 0.30);
--shadow-lg: 0 2px 0 rgb(0 0 0 / 0.28), 0 22px 58px rgb(0 0 0 / 0.42);
--shadow-glow: 0 0 0 1px rgb(143 179 162 / 0.20), 0 18px 48px rgb(143 179 162 / 0.14);
```

## 4. Runtime Mechanism

Use CSS custom properties at the document root:

```scss
:root {
  color-scheme: light;
  --color-deep: #1A1714;
  --color-primary: #5B7568;
  --color-accent: #5B7568;
  --color-warm: #6F665C;
  --color-ink: #1A1714;
  --color-ink-2: #34302B;
  --color-muted: #6F6962;
  --color-muted-2: #9B938A;
  --color-line: #DDD7D0;
  --color-line-2: #C8BFB5;
  --color-surface: #FFFFFF;
  --color-surface-2: #F1EEE9;
  --color-surface-3: #E7E1DA;
  --color-surface-deep: #1A1714;
  --color-surface-page: #FAF8F5;
  --color-status-live: #4F7667;
  --color-status-proto: #7A6854;
  --color-status-dev: #5B7568;
  --color-status-private: #77716B;
  --color-status-research: #6F6254;
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-deep: #0C0A09;
  --color-primary: #8FB3A2;
  --color-accent: #8FB3A2;
  --color-warm: #A79D92;
  --color-ink: #F4EFE8;
  --color-ink-2: #DED6CD;
  --color-muted: #B8AEA4;
  --color-muted-2: #8F867D;
  --color-line: #3A342E;
  --color-line-2: #51483F;
  --color-surface: #1B1815;
  --color-surface-2: #24201C;
  --color-surface-3: #2E2924;
  --color-surface-deep: #0C0A09;
  --color-surface-page: #12100E;
  --color-status-live: #8FB3A2;
  --color-status-proto: #C4A678;
  --color-status-dev: #8FB3A2;
  --color-status-private: #9A928B;
  --color-status-research: #BCA978;
}
```

Sass references should be updated in `sass/abstracts/_variables.scss` like this for direct property use:

```scss
$uy-deep: var(--color-deep);
$uy-primary: var(--color-primary);
$uy-accent: var(--color-accent);
$uy-warm: var(--color-warm);
$uy-ink: var(--color-ink);
$uy-ink-2: var(--color-ink-2);
$uy-muted: var(--color-muted);
$uy-muted-2: var(--color-muted-2);
$uy-line: var(--color-line);
$uy-line-2: var(--color-line-2);
$uy-surface: var(--color-surface);
$uy-surface-2: var(--color-surface-2);
$uy-surface-3: var(--color-surface-3);
$uy-surface-deep: var(--color-surface-deep);
$uy-surface-page: var(--color-surface-page);
$uy-status-live: var(--color-status-live);
$uy-status-proto: var(--color-status-proto);
$uy-status-dev: var(--color-status-dev);
$uy-status-private: var(--color-status-private);
$uy-status-research: var(--color-status-research);
```

Aliasing is useful but not sufficient by itself.

Direct uses such as `color: $uy-ink`, `background: $uy-surface`, and `border-color: $uy-line` can keep the Sass variable and compile to `var(--color-...)`.

Any Sass color function around a token needs a real migration. Examples:

- `rgba($uy-primary, 0.13)` cannot safely become `rgba(var(--color-primary), 0.13)`.
- `color.adjust($uy-primary, $lightness: -8%)` cannot run against `var(--color-primary)`.

Recommended pattern:

- For alpha overlays, use CSS-native `color-mix(in srgb, var(--color-primary) 13%, transparent)` or introduce RGB channel companions such as `--rgb-primary: 91 117 104` and write `rgb(var(--rgb-primary) / 0.13)`.
- For hover/darker states, add explicit runtime tokens such as `--color-primary-hover`, `--color-accent-hover`, and `--color-warm-strong`, or use `color-mix(in srgb, var(--color-primary) 88%, black)`.
- For shadows, replace `$uy-shadow-*` values with CSS variables (`--shadow-sm`, `--shadow-md`, etc.) rather than trying to calculate them from theme colors in Sass.

Suggested source layout:

- Add theme custom properties near the top of `sass/abstracts/_variables.scss` or in a new partial imported immediately after variables, for example `sass/abstracts/_theme-properties.scss`.
- Keep non-color Sass variables for radius, motion, type, and layout unchanged.
- Convert direct color tokens first, then fix Sass color-function call sites.

## 5. Toggle Button and JavaScript

Header placement:

- Add the toggle inside `.uy-nav__inner`, after `.uy-nav__links` and before `.uy-nav__cta`.
- Because each page has its own duplicated header markup, add it consistently to every live `body.uy-page` page.
- For mobile, either keep the same button visible alongside the hamburger or add a second matching button in `.uy-nav__mobile` and wire both via `[data-theme-toggle]`.

Suggested markup:

```html
<button
  class="uy-theme-toggle"
  type="button"
  data-theme-toggle
  aria-label="Switch to dark theme"
  aria-pressed="false"
>
  <span class="uy-theme-toggle__icon" aria-hidden="true"></span>
  <span class="uy-visually-hidden" data-theme-toggle-label>Switch to dark theme</span>
</button>
```

Minimal JS, best placed near the top of `index.js`:

```js
(function () {
  var storageKey = 'uy-theme';
  var root = document.documentElement;
  var toggles = document.querySelectorAll('[data-theme-toggle]');
  var prefersDark = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (err) {}
  }

  function getInitialTheme() {
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    return prefersDark && prefersDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggles.forEach(function (button) {
      var next = theme === 'dark' ? 'light' : 'dark';
      var label = 'Switch to ' + next + ' theme';
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      var text = button.querySelector('[data-theme-toggle-label]');
      if (text) text.textContent = label;
    });
  }

  var currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  toggles.forEach(function (button) {
    button.addEventListener('click', function () {
      currentTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
      setStoredTheme(currentTheme);
    });
  });
})();
```

Flash-of-wrong-theme note:

- Since `index.js` is loaded at the end of `body`, a returning dark-theme visitor may briefly see the light default before JS runs.
- To avoid that, add a tiny inline head bootstrap before the stylesheet on every live page:

```html
<script>
  (function () {
    try {
      var t = localStorage.getItem('uy-theme');
      if (!t && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) t = 'dark';
      if (t === 'dark') document.documentElement.dataset.theme = 'dark';
    } catch (e) {}
  })();
</script>
```

## 6. Risk and Scope

Color token references:

- The color tokens appear in 16 dev-system Sass partials plus `sass/abstracts/_variables.scss`.
- Files with color-token references:
  - `sass/components/_uy-base.scss`
  - `sass/components/_uy-buttons.scss`
  - `sass/components/_uy-cards.scss`
  - `sass/components/_uy-cta.scss`
  - `sass/components/_uy-footer.scss`
  - `sass/components/_uy-form.scss`
  - `sass/components/_uy-misc.scss`
  - `sass/components/_uy-nav.scss`
  - `sass/components/_uy-network-bg.scss`
  - `sass/components/_uy-pricing.scss`
  - `sass/pages/_uy-case-study.scss`
  - `sass/pages/_uy-cv.scss`
  - `sass/pages/_uy-ecosystem.scss`
  - `sass/pages/_uy-hero.scss`
  - `sass/pages/_uy-pagehead.scss`
  - `sass/pages/_uy-projects.scss`

Main risks:

- Sass color functions currently wrap color tokens. These require manual migration before the token aliases can compile.
- Hardcoded `#fff`, `#efe8d6`, `#000`, and `rgba(#fff, ...)` values remain in dark panels, nav, footer, hero, pagehead, and legacy partials. Some are intentionally dark-surface styles, but they should be audited so light mode does not retain too much dark-only styling.
- `sass/components/_uy-network-bg.scss` has hardcoded gradient stops (`#efe5d4`, `#e8dfcf`) that should become theme variables.
- `sass/pages/_uy-cv.scss` has print-specific hardcoded black/white rules. Those should stay print-only and not be migrated blindly.
- Legacy Dopefolio partials use their own old tokens and hardcoded colors. They are archived-page support and can be left alone unless the theme toggle is expected to affect archive pages.
- Current page headers are duplicated across HTML files, so adding the toggle is repetitive and easy to miss on one page.
- The recent ForgeTable scoped partial `sass/components/_uy-ft-brand.scss` uses local `$ft-*` colors under `.ft-brand`. That scope should remain intentionally independent from the global theme unless a later decision says ForgeWorks should also react to the portfolio theme.
- Canvas network drawing in `index.js` may use hardcoded canvas colors farther down the file. If it does, canvas colors need to be read from computed CSS variables or redrawn on theme changes.

Recommended implementation order for a later phase:

1. Add `:root` and `[data-theme="dark"]` custom properties.
2. Alias direct `$uy-*` color tokens to `var(--color-...)`.
3. Replace Sass color-function contexts with CSS `color-mix(...)`, RGB channel variables, or explicit hover/shadow variables.
4. Audit hardcoded dark/light color literals in the dev-system partials.
5. Add the nav toggle markup to every live page.
6. Add the JS theme controller and optional no-flash head bootstrap.
7. Run `npm run build:css`, then inspect key pages in both themes.

Report path: `/home/lo-mein/uyammadu-portfolio/reports/THEME_TOGGLE_PLAN.md`
