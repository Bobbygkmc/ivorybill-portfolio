# Site Blueprint — dev.uyammadu.com

This document defines the information architecture, brand positioning,
and design system for Chukwuemelie "Chuk" Uyammadu's personal portfolio
and public-facing business technology services branch of the Uyammadu
digital ecosystem.

The umbrella domain is `uyammadu.com`. The build target for this
repository is `dev.uyammadu.com`. The repo is intentionally static
(HTML / CSS / JS with a SASS build step) and contains no backend.

---

## 1. Brand positioning

**Primary one-liner**

> Veteran-owned technology services for small businesses, restaurants,
> and professionals in Bucks County and beyond.

**Ecosystem one-liner**

> uyammadu.com is the home base for Chuk Uyammadu's portfolio,
> AI agents, technical ventures, and business technology services.

**Name usage**

- Public display copy: `Chuk Uyammadu`
- Formal/about/resume-style copy: `Chukwuemelie "Chuk" Uyammadu`
- Never use Bob as a public display name.

The site speaks to two audiences at once:

- **Local operators** — owners of restaurants, retail shops, service
  businesses, offices, and properties who need pragmatic help with
  websites, networks, cameras, AI tools, and day-to-day technology.
- **Professional collaborators** — recruiters, partners, fellow
  builders, and anyone evaluating Chuk's portfolio of work and the
  larger Uyammadu ecosystem.

Tone: confident, practical, plainspoken, technical without being cold.
Avoid AI buzzwords. Avoid overclaiming. Avoid generic "freelancer
template" language.

**Design pattern**: Trust & Authority. Visual identity reads as an
operations center for a technical operator — restrained, credentialed,
infrastructure-aware. Not a startup. Not an agency. Not a hobbyist.

---

## 2. Domains and roles

| Domain                | Role                                                     |
| --------------------- | -------------------------------------------------------- |
| `uyammadu.com`        | Umbrella brand, future router, long-form home base       |
| `dev.uyammadu.com`    | This repo — services, pricing, projects, contact         |
| Future subdomains     | `agents.`, `ventures.`, `writing.`, `lab.`, `crenshaw.`  |

Treat `dev.uyammadu.com` as the dependable, business-facing surface.
Other subdomains can be more experimental.

---

## 3. Page architecture

The static site has the following pages.

```
/
├── index.html          Home — hero + ecosystem + service preview + CTAs
├── about.html          Formal profile — Chukwuemelie "Chuk" Uyammadu
├── services.html       Full service catalog
├── pricing.html        Estimated price ranges and timeframes
├── projects.html       Portfolio index
├── orion.html          Case study — Orion secure agentic BI prototype
├── cameras.html        Camera and security systems
└── contact.html        Service request and contact methods
```

Future pages (not yet built):

- `ecosystem.html` — full ecosystem map
- `writing.html` — public writing index
- `agents.html` — AI agent showcase
- `lab.html` — experiments and prototypes

---

## 4. Information architecture

**Header navigation (every page)**

`Home / About / Services / Pricing / Projects / Cameras / Contact`

**Footer (every page)**

- Short brand description
- Contact email and call/text placeholder
- Social links (GitHub, email)
- Service area note (Bucks County, PA + remote)
- Copyright

---

## 5. Design system

### 5.1 Source files

The design system lives under SCSS partials and is the source of truth.
The compiled `css/style.css` is a build artifact — do not edit by hand.

- `sass/abstracts/_variables.scss` — all `$uy-*` design tokens
- `sass/components/uy-*.scss` — current design-system components
- `sass/pages/uy-*.scss` — current page-specific design-system partials
- `sass/abstracts/_mixins.scss` — responsive breakpoints
- `sass/base/_base.scss` — reset, smooth scroll, base font scaling

All new pages MUST include `class="uy-page"` on `<body>` so they pick
up the new system. Legacy partials (`_home.scss`, `_project-case-study.scss`)
remain for archived pages and must not be referenced from new work.

### 5.2 Color tokens

| Token                | Hex       | Use                                      |
| -------------------- | --------- | ---------------------------------------- |
| `$uy-deep`           | `#0a1f3d` | Headlines, dark sections, primary CTA bg |
| `$uy-primary`        | `#0062b9` | Workhorse blue — links, primary surfaces |
| `$uy-accent`         | `#00b4d8` | Bright cyan — highlights, focus rings    |
| `$uy-warm`           | `#f59e0b` | Warm accent — sparingly, status only     |
| `$uy-ink`            | `#0f172a` | Primary body text                        |
| `$uy-ink-2`          | `#1e293b` | Secondary headings                       |
| `$uy-muted`          | `#475569` | Body text, captions                      |
| `$uy-muted-2`        | `#94a3b8` | Tertiary text, icons                     |
| `$uy-line`           | `#e2e8f0` | Card borders, dividers                   |
| `$uy-line-2`         | `#cbd5e1` | Hover borders, secondary dividers        |
| `$uy-surface`        | `#ffffff` | Default background                       |
| `$uy-surface-2`      | `#f8fafc` | Alt section background                   |
| `$uy-surface-3`      | `#f1f5f9` | Tertiary surfaces, inactive pills        |
| `$uy-surface-deep`   | `#0a1628` | Dark inverted sections                   |

**Status pill colors**

| Token                | Hex       | Status                                  |
| -------------------- | --------- | --------------------------------------- |
| `$uy-status-live`    | `#10b981` | `Live`                                  |
| `$uy-status-proto`   | `#6366f1` | `Prototype`                             |
| `$uy-status-dev`     | `#f59e0b` | `In Development`                        |
| `$uy-status-private` | `#64748b` | `Private Deployment`                    |
| `$uy-status-research`| `#8b5cf6` | `Research Concept`                      |

Color philosophy: navy and slate carry every page. Cyan is a focal
accent — never the background. Warm amber appears only on status
pills and `In Development` indicators. No purple or pink in primary
brand surfaces (status pills excepted).

### 5.3 Typography

Two families, both already loaded from Google Fonts:

- **Inter** — body and headlines. Weights 400, 500, 600, 700, 800.
- **JetBrains Mono** — code blocks, terminal hero, monospace eyebrows,
  status pills. Weights 400, 600.

Font tokens (in `_variables.scss`):

```scss
$uy-font-sans: 'Inter', 'Source Sans Pro', system-ui, ...
$uy-font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, ...
```

**Type scale** (clamp-based, fluid 600px → 1200px):

| Class      | Size                                | Use                            |
| ---------- | ----------------------------------- | ------------------------------ |
| `.uy-h1`   | `clamp(3.6rem, 5vw + 1rem, 6.4rem)` | Hero headline                  |
| `.uy-h2`   | `clamp(2.8rem, 3vw + 1rem, 4.2rem)` | Section heading                |
| `.uy-h3`   | `clamp(2rem, 1.2vw + 1.4rem, 2.6rem)`| Card heading, sub-section     |
| `.uy-h4`   | `1.8rem`                            | Card title, list heading       |
| `.uy-lede` | `clamp(1.7rem, 0.6vw + 1.4rem, 2.1rem)` | Hero/section subtitle      |
| `.uy-body` | `1.7rem`                            | Body text                      |
| `.uy-mono` | `1.4rem`                            | Mono captions, file paths      |

Base scaling: `html { font-size: 62.5% }` at 1200px → `1rem = 10px`.
Scaled down on smaller breakpoints inside `_base.scss`.

**Rules**:
- Headlines: Inter 700, color `$uy-deep`, letter-spacing `-0.02em` to `-0.005em`.
- Body: Inter 400/500, color `$uy-muted`, line-height 1.6–1.7.
- Line length on body prose capped to 70rem (≈ 65–75ch).
- Mono is reserved for technical signal (terminal, paths, status, code).
  Do not use mono for full paragraphs.

### 5.4 Spacing rhythm

The site is tuned to a 124rem container with a base 8px-equivalent
rhythm (each `1rem = 10px`).

| Token / pattern             | Value                          | Use                          |
| --------------------------- | ------------------------------ | ---------------------------- |
| Container default           | `min(92%, 124rem)`             | Wide content                 |
| Container narrow            | `min(92%, 88rem)`              | Long-form prose, forms       |
| Section vertical padding    | 10rem desktop / 7rem tab / 5.5rem phone | `.uy-section`         |
| Tight section padding       | 6rem                           | `.uy-section--tight`         |
| Card internal padding       | 3rem–3.6rem                    | service / project cards      |
| Card-to-card gap            | 2.4rem mobile / 2.8rem desktop | grids                        |
| Inline gap                  | 0.8rem / 1.2rem / 2rem         | meta strips, button rows     |
| Section-head bottom margin  | 5rem                           | space before section content |

**Vertical rhythm rule**: a single section never mixes more than two
internal vertical scales. Either heading → lede → grid (3 scales) or
heading → grid (2 scales). Avoid stacking five+ vertical blocks
without a break (alt section background or divider).

### 5.5 Cards, surfaces, depth

Cards default to:
- Background `$uy-surface`
- Border `1px solid $uy-line`
- Radius `$uy-radius-lg` (16px)
- Shadow `$uy-shadow-sm` resting → `$uy-shadow-md` on hover
- Hover lift: `transform: translateY(-2px)` + border `$uy-line-2`

**Radius scale**

| Token             | Value | Use                                |
| ----------------- | ----- | ---------------------------------- |
| `$uy-radius-sm`   | 6px   | Inline tags, code chips            |
| `$uy-radius-md`   | 10px  | Buttons, inputs                    |
| `$uy-radius-lg`   | 16px  | Cards, panels                      |
| `$uy-radius-xl`   | 24px  | Hero panels, ecosystem tiles       |
| `$uy-radius-pill` | 999px | Pills, eyebrows, status badges     |

**Shadow scale**: `$uy-shadow-sm` (rest), `$uy-shadow-md` (raised),
`$uy-shadow-lg` (modal/featured), `$uy-shadow-glow` (primary CTA hover,
cyan-tinted). Depth is restrained — never stack two shadows on one
element, and never use a colored shadow as decoration.

### 5.6 Interaction & motion

- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` (`$uy-ease`)
- Default duration: 150–200ms for color/border/shadow, 180–220ms for
  transform
- Focus ring: `outline: 2px solid $uy-accent; outline-offset: 2px`
- Hover patterns: 1–2px translate, shadow step-up, border color shift.
  No scale transforms (cause layout shift). No rotation on hover.
- Respect `prefers-reduced-motion`: disable transforms, keep color
  transitions.

### 5.7 Button hierarchy

| Variant            | Use                                  | Per page max |
| ------------------ | ------------------------------------ | ------------ |
| `.uy-btn--primary` | Primary CTA (deep navy bg)           | 2            |
| `.uy-btn--accent`  | Highlighted CTA (cyan bg)            | 1            |
| `.uy-btn--ghost`   | Secondary action                     | unlimited    |
| `.uy-btn--quiet`   | Tertiary / inline link-button        | unlimited    |

Modifiers: `.uy-btn--lg` (hero), `.uy-btn--block` (full-width on phone).

**Rule**: only ONE accent button visible per viewport. Primary is the
default CTA color; accent is the "the user must see this" override.
Pricing CTAs in the highlighted tier use `--primary`, not `--accent`.

### 5.8 Pills, eyebrows, status

- `.uy-eyebrow` — uppercase, primary-tinted, on every section heading.
  Doubles as the section's "what is this" label.
- `.uy-pill` — neutral status badge. Project status colors live as
  modifiers (`--live`, `--proto`, `--dev`, `--private`, `--research`).
- All pills are pill-radius, 1.2rem, uppercase, letter-spaced.

---

## 6. Section ordering philosophy

Service-business landing pages convert when the visitor moves through:
**identify → understand → trust → act**. Section ordering across the
site follows this philosophy.

### 6.1 Home (`index.html`)

1. **Hero** — one-line value prop + sub-prop + primary CTA (`Start a
   project`) + secondary ghost CTA (`See pricing`). Code-card visual
   reinforces "operator" identity.
2. **Service preview** — 6 service cards. Each card is a self-contained
   answer to "what do you do for businesses like mine?".
3. **Process** — 4-step workflow. Trust signal #1: shows you have a
   repeatable method.
4. **Featured projects** — 4 cards with status pills. Trust signal #2:
   real work, transparently labeled.
5. **Ecosystem** — positions `uyammadu.com` as a larger umbrella.
   Differentiator + trust signal #3.
6. **Final CTA strip** — single primary CTA, dark background.

### 6.2 Services (`services.html`)

1. Page hero (compact: title + lede)
2. Full service catalog grouped by domain (web, network, AI, cameras,
   automation, ops). Each entry: icon, name, 1-line summary, "what's
   included" list.
3. CTA strip → contact

### 6.3 Pricing (`pricing.html`)

1. Page hero
2. Pricing tiers (3) — middle tier carries `--popular` highlight (deep
   border, slight shadow lift, NOT a different color)
3. Retainer block (separate section)
4. FAQ (expanding details — addresses common objections about scope,
   timing, included revisions)
5. CTA strip → contact

### 6.4 Projects (`projects.html`)

1. Page hero
2. Projects grid with status pills. Sort: Live → In Development →
   Prototype → Private → Research.
3. CTA strip → contact

### 6.5 Cameras (`cameras.html`)

Vertical landing page for camera/security systems. Same flow as Home
but tighter:

1. Hero (camera-specific value prop)
2. What's included (services list)
3. Honest scope: what's covered, what isn't (no fake licensing claims)
4. Process (compact, 3 steps)
5. CTA → contact (camera-specific intake)

### 6.6 Contact (`contact.html`)

1. Page hero
2. Two-column: form (left, primary action) + contact methods (right)
3. Service-area note + response-time commitment
4. NO CTA strip at bottom — the form IS the CTA

---

## 7. CTA hierarchy

The site has one canonical CTA: **start a project**. Every page funnels
toward `contact.html` or its inline form.

| Surface       | Primary CTA            | Secondary CTA           |
| ------------- | ---------------------- | ----------------------- |
| Hero          | Start a project        | See pricing / services  |
| Service card  | (none — card itself links to services anchor) | — |
| Project card  | (none — card links to case study)             | — |
| Pricing tier  | Start a project        | —                       |
| CTA strip     | Start a project        | Email link              |
| Footer        | Email + call/text      | —                       |

**Sticky behavior**: the navigation `Contact` link is the persistent
CTA across the site. No floating chat bubbles, no exit-intent popups,
no banners.

---

## 8. Trust signals (solo veteran-owned operator)

The site is a one-person operation. Standard "social proof" patterns
(testimonial carousels, client logos, "1000+ users") do not apply and
must not be fabricated. These trust signals are honest and sufficient:

- **Veteran-owned** — stated plainly in hero/footer, not flag-emoji'd.
- **Service area** — Bucks County, PA + remote. Specific beats vague.
- **Project transparency** — every project on `projects.html` carries
  a status pill (Live, Prototype, In Dev, Private, Research). Honest
  status is more credible than a "completed" filter that hides reality.
- **Process clarity** — 4-step process on home + per-service "what's
  included" lists. Removes the freelancer mystery box.
- **Pricing transparency** — explicit ranges and timeframes on
  `pricing.html`. No "contact for quote" on standard offerings.
- **Response-time commitment** — stated on `contact.html`. Pick a
  number you can actually hold to.
- **GitHub link** — visible in footer. Code is the resume.
- **Ecosystem map** — the umbrella + sibling domains signal a real
  operator, not a one-time freelancer.
- **Specific tooling and stack callouts** — listing what was actually
  used on a project (Next.js, Tailscale, Caddy, ntfy, etc.) reads as
  technical depth without buzzword fluff.

**Forbidden** (carries forward from §10):

- Fabricated testimonials, logos, headcounts, revenue numbers
- Generic "trusted by industry leaders" language with no proof
- Stock photos of fake teams or fake offices
- Any claim of licensing (electrical, low-voltage, alarm) without a
  separately-documented license number
- "Production-ready" labels on prototypes
- Star ratings without a verifiable source

---

## 9. Accessibility goals

- Semantic HTML on every page (`header`, `nav`, `main`, `section`,
  `article`, `footer`)
- Visible focus states on all interactive elements (`$uy-accent`
  outline, 2px offset)
- Form fields have `<label>` elements bound by `for`/`id`
- Decorative icons use `aria-hidden="true"` and empty `alt`;
  meaningful icons describe their purpose
- Color contrast meets WCAG AA in body text and CTAs (verify
  `$uy-muted` on `$uy-surface` and CTAs in dark sections)
- Mobile-first responsive layout, no horizontal scroll on phone widths
- Touch targets minimum 44×44px (button padding tokens already meet this)
- Tab order matches visual order
- Icon-only buttons carry `aria-label`
- Respect `prefers-reduced-motion`

---

## 10. Content guardrails

The following are **explicitly forbidden** on this site:

- Claims of services not actually offered
- Claims of licensing (alarm, electrical, low-voltage, etc.) unless
  separately documented and verified
- Overclaimed AI capabilities or "production-ready" language for
  prototypes
- Tracking pixels, analytics scripts, or third-party trackers without
  an explicit follow-up decision
- Hardcoded secrets, API keys, or private tokens
- Fabricated testimonials, client logos, revenue numbers, or
  headcount claims
- "10x", "growth hacker", "AI-powered" buzzword positioning

Project statuses on `projects.html` are restricted to:
`Live`, `Prototype`, `In Development`, `Private Deployment`,
`Research Concept`.

---

## 11. Anti-patterns (visual)

These visual patterns are **off-limits** for this site. They conflict
with the operator-first / Trust & Authority identity.

- **Neon AI-startup gradients** — purple/pink, magenta/cyan, holographic
- **Heavy glassmorphism** — translucent stacks, blurred backgrounds
  beyond a single subtle hero accent
- **Cryptocurrency aesthetic** — animated gradient meshes, "matrix"
  drops, hex grids as decoration
- **Excessive motion** — scroll-jacking, parallax layers, auto-playing
  videos as backgrounds, animated charts on every metric
- **Emoji as UI icons** — use SVG (the existing inline SVGs are correct
  practice). Status pills use neither emoji nor icon.
- **Stock photography of teams/offices** — solo operation; no fake
  staff
- **Faux 3D / WebGL hero** — does not match a static-first, trust-first
  identity and adds dependency weight
- **Carousel testimonials** — see §8
- **Animated number counters** — fine for real metrics on a real
  dashboard; not appropriate for a trust-first marketing surface
- **Skeuomorphic buttons** — beveled, glossy, drop-shadowed
- **"Floating" cards stacked at angles** — design-trend filler
- **Mixed icon sets** — keep to one stroke-weight inline SVG style

---

## 12. Responsive behavior rules

Breakpoints (already defined in `_mixins.scss`):

| Mixin       | Breakpoint | Notes                                |
| ----------- | ---------- | ------------------------------------ |
| `phone`     | 600px      | Single-column everywhere             |
| `tab-port`  | 900px      | 2-column grids collapse to 1         |
| `tab-land`  | 1200px     | Container narrows, base font scales  |
| `big-desktop` | 1800px   | Container caps; further scaling minor|

**Rules**:

- Mobile-first: write the smallest layout, expand up.
- Hero: stacks vertically below `tab-port`. Code-card moves below the
  copy, never beside it.
- Service grid: 3 col → 2 col → 1 col.
- Project grid: 2 col → 1 col.
- Pricing: 3 col → 1 col (NOT 2 col — middle tier needs full width
  to keep readability).
- Process: 4 col → 2 col → 1 col with vertical timeline.
- Nav: collapses to hamburger below `tab-port`. Slide-down panel,
  no slide-in drawer.
- Forms: labels stack above inputs at all sizes (no inline labels).
- Touch targets: 44×44px minimum at every breakpoint.

---

## 13. Future ecosystem

`uyammadu.com` is intended to grow into:

- Portfolio and case studies
- Dev services and freelance offerings
- AI agents (Crenshaw and others)
- Business tools and operator-focused experiments
- Public writing and notes
- Ventures and side businesses

This repo represents the dev-services branch and should remain stable
and trustworthy even as more experimental work appears under sibling
subdomains.

When sibling subdomains launch, they should adopt the `$uy-*` tokens
and the layout primitives (`.uy-section`, `.uy-container`, `.uy-btn`,
`.uy-eyebrow`) so the umbrella reads as one ecosystem. Visual
deviations are allowed in `lab.` and `agents.` only — `dev.` stays
the conservative anchor.
