# Claude Design Handoff — dev.uyammadu.com

This document is a self-contained brief for a Claude.ai session with the
Figma connector enabled. It captures everything Claude Design needs to
produce Figma frames + a token library that match the live site.

The implementation lives in `~/uyammadu-portfolio` (static HTML + SCSS
+ ~50 lines vanilla JS). Claude Design does not need filesystem access
to this repo — copy/paste this doc into the Claude.ai conversation, and
attach the screenshots listed in §10.

---

## 1. Brief

**Product**: dev.uyammadu.com — personal portfolio and public-facing
business technology services site for Chukwuemelie "Chuk" Uyammadu.
Veteran-owned, solo operator, based in Bucks County, PA, serving local
+ remote.

**Name usage**: use `Chuk Uyammadu` in public display copy, use
`Chukwuemelie "Chuk" Uyammadu` in formal/about/resume-style context,
and never use Bob as a public display name.

**Audiences (two at once)**:

- **Local operators** — restaurant, retail, service-business, office,
  property owners who need pragmatic websites, networks, cameras, AI,
  day-to-day tech help.
- **Professional collaborators** — recruiters, partners, fellow
  builders evaluating Chuk's portfolio and the wider Uyammadu
  ecosystem.

**Tone**: confident, practical, plainspoken, technical without being
cold. Anti-buzzword. Anti-overclaim. Anti-template.

**Design pattern**: Trust & Authority. Operations-center read.
Veteran-operator credibility. Not a startup, not an agency, not a
hobbyist.

---

## 2. Visual direction

| Direction          | Decision                                          |
| ------------------ | ------------------------------------------------- |
| Color base         | Deep navy + workhorse blue + slate neutrals       |
| Accent             | Subtle cyan (highlights, focus rings, hover only) |
| Warm accent        | Amber — sparingly, status only                    |
| Light/dark         | Light-default with one dark inverted section + dark CTA strip + dark footer |
| Density            | Generous container (1240px wide), rich whitespace, two scales per section max |
| Type personality   | Inter (sans) + JetBrains Mono (code/terminal/status) |
| Motion             | Restrained — 1–2px hover lift, color/border transitions, no scale, no parallax |
| Imagery            | None at this time. Hero uses a code-card mock. No stock photos. No 3D. |

---

## 3. Design tokens (Figma variables)

Import these into a Figma variable collection named
`uyammadu / dev`. Group as marked.

### 3.1 Colors

```
brand/deep         #0A1F3D    Primary headlines, dark sections, primary CTA bg
brand/primary      #0062B9    Workhorse blue — links, primary surfaces, hover
brand/accent       #00B4D8    Cyan — highlights, focus rings, accent CTA
brand/warm         #F59E0B    Amber — status only, never decorative

ink/100            #0F172A    Body text default
ink/200            #1E293B    Secondary headings, label text
ink/muted          #475569    Body prose, captions
ink/muted-2        #94A3B8    Tertiary text, icon defaults
ink/line           #E2E8F0    Card borders, dividers
ink/line-2         #CBD5E1    Hover borders, secondary dividers

surface/0          #FFFFFF    Default page background
surface/1          #F8FAFC    Alt section background
surface/2          #F1F5F9    Tertiary surface, inactive pills, code chips
surface/deep       #0A1628    Dark inverted sections, footer

status/live        #10B981    'Live' projects
status/proto       #6366F1    'Prototype'
status/dev         #F59E0B    'In Development'
status/private     #64748B    'Private Deployment'
status/research    #8B5CF6    'Research Concept'
```

### 3.2 Typography

Both fonts loaded from Google Fonts.

```
font/sans      Inter            400, 500, 600, 700, 800
font/mono      JetBrains Mono   400, 600
```

**Type styles** (Figma text styles):

```
display/h1     Inter 700  clamp 36→64    -2% letter-spacing  line 1.05
display/h2     Inter 700  clamp 28→42    -1.5% letter-spacing line 1.15
display/h3     Inter 700  clamp 20→26    line 1.25
display/h4     Inter 600  18             -0.5% letter-spacing line 1.4
body/lede      Inter 400  clamp 17→21    line 1.6
body/default   Inter 400  17             line 1.7
body/small     Inter 400  14
mono/default   JetBrains Mono 400  14
mono/eyebrow   JetBrains Mono 600  12   uppercase  +0.5px tracking
ui/eyebrow     Inter 600  13   uppercase  +1.2px tracking
ui/pill        Inter 600  12   uppercase  +0.4px tracking
ui/btn         Inter 600  15
ui/label       Inter 600  13   +0.2px tracking
ui/footer-h    Inter 700  12   uppercase  +1px tracking
```

### 3.3 Radius

```
radius/sm     6px      Inline tags, code chips
radius/md    10px      Buttons, inputs
radius/lg    16px      Cards, panels
radius/xl    24px      Hero panels, ecosystem tiles
radius/pill  999px     Pills, eyebrows, status badges
```

### 3.4 Shadow

```
shadow/sm    0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.04)
shadow/md    0 4px 16px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.04)
shadow/lg    0 12px 40px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.06)
shadow/glow  0 0 0 1px rgba(0,98,185,0.12), 0 12px 40px rgba(0,98,185,0.18)
```

Rule: never stack two shadows on one element. Glow is reserved for the
primary CTA hover state.

### 3.5 Spacing

8-point base. Container 1240px / narrow container 880px.

```
space/1      4px
space/2      8px
space/3     12px
space/4     16px
space/5     24px
space/6     32px
space/7     40px
space/8     56px
space/9     80px
space/10   100px

container/wide      1240px (min(92%, 1240px))
container/narrow     880px

section/y/desktop    100px (top + bottom)
section/y/tablet      70px
section/y/phone       55px
```

### 3.6 Motion

```
motion/ease           cubic-bezier(0.4, 0, 0.2, 1)
motion/ease-out       cubic-bezier(0.22, 1, 0.36, 1)
motion/duration-fast  150ms   color/border
motion/duration-base  180ms   transform/shadow
motion/duration-slow  220ms   composite hover
```

---

## 4. Component library

These components exist in code today. Build them in Figma as a single
linked component set so the per-page mocks reuse them.

| Component        | Variants                                          |
| ---------------- | ------------------------------------------------- |
| Button           | primary, accent, ghost, quiet × default/lg/block  |
| Pill             | neutral, live, proto, dev, private, research      |
| Eyebrow          | default                                           |
| Top nav          | desktop, mobile-collapsed, mobile-open            |
| Hero (home)      | desktop, tablet, mobile                           |
| Page hero (sub)  | with/without breadcrumb                           |
| Service card     | default, dark variant, feature variant            |
| Project card     | default with status pill + tag row                |
| Pricing group    | head + N pricing-rows, optional callout/disclaimer |
| Form             | default, with status banner                       |
| Process step     | numbered (auto via CSS counter)                   |
| Eco card         | dark surface, mono name + title + status          |
| CTA strip        | dark gradient                                     |
| Footer           | 4-col desktop, 2-col tablet, 1-col phone          |
| Code-card        | hero terminal mock with red/yellow/green dots     |

### 4.1 Button hierarchy rule

Per visible viewport, MAX:
- 2 × `primary`
- 1 × `accent`
- unlimited `ghost` and `quiet`

Pricing's "popular" tier uses `primary` (deep navy bg), NOT `accent`.

### 4.2 Card hover behavior

All cards: `translateY(-2px)` + `border-color: ink/line-2` + shadow
step-up to `shadow/md`. NO scale transforms (cause layout shift). NO
rotation.

---

## 5. Page architecture

Six pages currently exist. Each needs a desktop (1440) + mobile (375)
mock at minimum; tablet (768) is optional.

```
/index.html      Home
/services.html   Service catalog
/pricing.html    Tiered pricing + retainer + FAQ
/projects.html   Portfolio index
/cameras.html    Camera/security vertical landing
/contact.html    Service request form + contact methods
```

### 5.1 Home (`index.html`)

```
1. Sticky nav (light, blurred, brand mark + 5 links + Contact CTA)
2. Hero
   - left: eyebrow + h1 + lede + 2 CTAs (primary "Start a project",
     ghost "See pricing") + 3 stat strip (years building, services,
     response time)
   - right: code-card (terminal mock with bash prompt + uyammadu CLI)
3. Service preview — 6 service cards (3-col → 2-col → 1-col)
4. Process — 4 numbered steps (4-col → 2-col → 1-col)
5. Featured projects — 4 project cards with status pills (2-col → 1-col)
6. Ecosystem (DARK SECTION) — 6 eco cards naming sibling subdomains
   (uyammadu.com, agents., ventures., writing., lab., crenshaw.)
7. CTA strip (DARK gradient) — "Start a project" primary + email link
8. Footer (DARK)
```

### 5.2 Services (`services.html`)

```
1. Sticky nav
2. Page hero (compact, with breadcrumb)
3. Services grouped by domain — Web · Network · AI · Cameras ·
   Automation · Operations. Each card: icon + title + 1-line summary
   + "What's included" bulleted list.
4. CTA strip
5. Footer
```

### 5.3 Pricing (`pricing.html`)

```
1. Sticky nav
2. Page hero
3. Pricing groups — Web | Network | AI | Cameras (each is a
   .uy-pricing-group with head + rows). Each row: name, $ range,
   timeframe.
4. Callout — amber-tinted "Custom scope? Talk first."
5. Retainer block — mono table with monthly tiers
6. FAQ — 6–8 expanding details (objections: scope creep, payment,
   revisions, ownership, timeline, support after handoff)
7. Disclaimer — slate-bordered note about ranges being estimates
8. CTA strip
9. Footer
```

### 5.4 Projects (`projects.html`)

```
1. Sticky nav
2. Page hero
3. Projects grid — 2-col project cards. Sort: Live first, then
   In Development, Prototype, Private Deployment, Research Concept.
   Each card: status pill + title + 2-line description + tag row
   (mono chips for stack: Next.js, Tailscale, Caddy, etc.).
4. CTA strip
5. Footer
```

### 5.5 Cameras (`cameras.html`)

```
1. Sticky nav
2. Page hero (camera-specific lede)
3. What's included — feature-list (2-col bulleted)
4. Honest scope — split layout: "What's covered" / "What I don't do
   without a licensed partner". (Critical trust signal — see §8.)
5. Process — 3 compact steps
6. CTA strip → contact (camera-specific intake)
7. Footer
```

### 5.6 Contact (`contact.html`)

```
1. Sticky nav
2. Page hero
3. Two-column split:
   - LEFT (primary): form — name, email, business, project type
     (select), budget range (select), timeline (select), message.
     Submit = primary CTA. Status banner above form for response-time
     commitment.
   - RIGHT (secondary): direct contact — email, call/text, GitHub,
     service area note, hours.
4. NO CTA strip at bottom — the form IS the CTA.
5. Footer
```

---

## 6. Section ordering philosophy

Service-business pages convert when the visitor moves through:

> **identify → understand → trust → act**

Every page is ordered along this flow. Trust signals ALWAYS precede
the close.

---

## 7. CTA hierarchy

The site has ONE canonical CTA: **Start a project**. Every page
funnels there.

| Surface       | Primary CTA          | Secondary CTA            |
| ------------- | -------------------- | ------------------------ |
| Hero          | Start a project      | See pricing / services   |
| Service card  | (card itself links)  | —                        |
| Project card  | (card itself links)  | —                        |
| Pricing tier  | Start a project      | —                        |
| CTA strip     | Start a project      | Email link               |
| Footer        | Email + call/text    | —                        |

Persistent CTA: nav `Contact` link is the always-on destination.
NO floating chat bubbles. NO exit-intent popups. NO cookie banners
(no analytics yet). NO sticky bottom bars on mobile.

---

## 8. Trust signals (solo veteran operator — no fake social proof)

Standard "social proof" patterns (testimonial carousels, client logo
strips, headcount, "1000+ users") DO NOT APPLY. Do not generate them.
Use these honest signals instead:

1. **Veteran-owned** — stated plainly in hero/footer, not flag-emoji'd.
2. **Service area** — "Bucks County, PA + remote." Specific beats vague.
3. **Project status pills** — every project on the index carries
   `Live | Prototype | In Development | Private Deployment | Research`.
   Honest status > a "completed" filter.
4. **Process clarity** — 4-step home process + per-service "What's
   included" lists. No freelancer mystery box.
5. **Pricing transparency** — explicit ranges + timeframes. No
   "contact for quote" on standard offerings.
6. **Response-time commitment** — stated on contact page. Pick a
   number you'll hold to.
7. **GitHub link** — visible in footer. Code is the resume.
8. **Ecosystem map** — uyammadu.com umbrella + sibling subdomains
   = real operator, not freelance one-off.
9. **Specific stack callouts** on project cards — Next.js, Tailscale,
   Caddy, ntfy, etc. Reads as technical depth without buzzword fluff.

---

## 9. Anti-patterns (DO NOT INCLUDE)

If any of these appears in a Figma frame, the frame is wrong:

- Neon AI-startup gradients (purple/pink, magenta/cyan, holographic)
- Heavy glassmorphism (translucent stacks, blurred wallpapers)
- Crypto aesthetic (animated mesh gradients, hex grids, "matrix")
- Faux 3D / WebGL hero
- Stock photos of teams/offices (solo operation — no fake staff)
- Carousel testimonials, fabricated client logos, fake metrics
- Animated number counters as decoration
- Skeuomorphic buttons (beveled, glossy)
- Cards stacked at angles ("floating" trend-filler)
- Mixed icon sets (use ONE stroke-weight inline SVG style)
- Emoji as UI icons (use SVG)
- "10x", "growth hacker", "AI-powered" buzzword positioning
- Claims of licensing (alarm/electrical/low-voltage) — solo op is NOT
  licensed for these and the site MUST NOT imply otherwise

---

## 10. Reference screenshots to attach

When pasting this doc into the Claude.ai session, attach these
screenshots so Claude Design can see the current implementation:

1. Home — desktop full-page screenshot
2. Home — mobile (375px) full-page screenshot
3. Services — desktop
4. Pricing — desktop, focused on a pricing-group with rows
5. Projects — desktop, showing status pills
6. Contact — desktop, showing the two-column form + sidebar
7. Footer — close-up of the dark footer at desktop width

If the site isn't deployed yet, capture from a local `npm run
compile:scss` + opening `index.html` in a browser.

---

## 11. Deliverables expected from Claude Design

After this handoff, Claude Design should produce:

1. A Figma file `uyammadu / dev` with:
   - One variable collection containing all tokens from §3
   - One component library (page-frame at top of file) covering §4
   - Six page mocks (desktop + mobile minimum) per §5
   - One "anti-patterns" frame at bottom — visual examples of what
     was rejected and WHY (so future iterations don't drift back)
2. A short markdown changelog noting any deviations from this brief
   (every deviation must cite the design rule it serves)

---

## 12. Tech context (for handoff back to implementation)

The implementation is **static HTML + SCSS, no framework**. When
Claude Design hands work back, the implementation Claude (this CLI)
will:

- Translate Figma layouts into existing component classes
  (`.uy-card`, `.uy-btn--primary`, `.uy-pricing-row`, etc.)
- Add new partials only when an existing component class can't
  represent the new pattern
- Avoid new JS dependencies — vanilla JS only, ~50 lines total

If Claude Design proposes a component that requires JavaScript
beyond what the existing `index.js` can carry (auto-rotating
carousels, scroll-driven canvas, etc.), the proposal must come with
a justification AND a no-JS fallback that still satisfies the brief.
