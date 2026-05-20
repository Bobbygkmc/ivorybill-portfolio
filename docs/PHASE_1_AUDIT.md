# Phase 1: Full Project Audit
**Date:** 2026-05-20  
**Scope:** Both `/home/lo-mein/uyammadu-portfolio` and `/home/lo-mein/blog`

---

## Executive Summary

This audit identifies critical inconsistencies, duplicate systems, and opportunities for consolidation across the portfolio site (dev.uyammadu.com) and blog platform (blog.uyammadu.com). Both sites serve the same engineering identity but use completely different design systems, component patterns, and styling approaches.

**Key Finding:** Two separate design systems with zero shared components or design tokens. This creates maintenance burden and brand inconsistency.

---

## 1. Duplicate Styling Systems

### Portfolio (dev.uyammadu.com)
- **Framework:** Custom SASS architecture
- **Structure:** 
  - `sass/abstracts/` - variables, mixins, utilities
  - `sass/components/` - 14 component files
  - `sass/pages/` - 7 page-specific files
- **Design System:** Custom `_uy-*` prefix system
- **Button System:** `.uy-btn` with variants (primary, accent, ghost, quiet, disabled)
- **Navigation:** `.uy-nav` with sticky header, mobile menu
- **Typography:** Custom font stack (Geist, JetBrains Mono)
- **Colors:** Custom CSS variables (`$uy-primary`, `$uy-accent`, `$uy-deep`, etc.)
- **Spacing:** Custom rhythm system
- **Build:** SASS compilation to `css/style.css`

### Blog (blog.uyammadu.com)
- **Framework:** Tailwind CSS v4
- **Structure:**
  - `src/styles/base.css` - hamburger menu styles (duplicated 3x!)
  - `src/styles/global.css` - Tailwind imports, theme variables
  - `src/styles/typography.css` - prose overrides
- **Design System:** Tailwind utility classes
- **Button System:** Inline Tailwind classes (no component)
- **Navigation:** `.hamburger-menu` with pill-style nav
- **Typography:** Google Sans Code (loaded via Astro Font)
- **Colors:** CSS custom properties (`--background`, `--foreground`, `--accent`, `--muted`, `--border`)
- **Spacing:** Tailwind spacing scale
- **Build:** Tailwind JIT compilation

### Critical Issues
1. **Zero shared design tokens** - colors, spacing, typography all different
2. **Duplicate hamburger menu code** - `base.css` has 3 identical implementations
3. **Different button philosophies** - SASS components vs inline utilities
4. **Inconsistent color systems** - portfolio uses SASS vars, blog uses CSS custom props
5. **No component library** - each site reinvents basic UI patterns

---

## 2. Dead Code

### Portfolio
- `archive/` folder contains legacy HTML files (index-legacy.html, project-1/2/3.html)
- `dist/` folder committed to git (should be in .gitignore)
- Multiple unused SASS partials imported but not actively used
- `sass/components/_mouse-scroll.scss` - appears unused
- `sass/components/_skills.scss` - legacy component

### Blog
- `src/styles/base.css` - **3 duplicate hamburger menu implementations**
- `src/content-drafts/` - draft content directory (should be in .gitignore?)
- Unused Giscus comment system configuration in `config.ts` (enabled: false)
- `src/pages/archives/index.astro` - unclear if actively used

### Recommendations
- Remove `archive/` folder or document its purpose
- Add `dist/` to .gitignore
- Consolidate hamburger menu to single implementation
- Remove unused SASS partials
- Clean up draft content handling

---

## 3. Inconsistent Layouts

### Portfolio Layout Patterns
- **Hero sections:** Custom `.uy-hero` with operator card visual
- **Section structure:** `.uy-section` with `.uy-container` wrapper
- **Grid system:** Custom `.uy-grid` for card layouts
- **Project cards:** `.uy-project` with custom styling
- **Case studies:** Dedicated HTML pages (orion.html, forgeworks.html)

### Blog Layout Patterns
- **Hero sections:** Inline Tailwind on index page with typewriter effect
- **Section structure:** `.app-layout` utility class
- **Grid system:** Tailwind grid utilities
- **Project cards:** `ProjectCard.astro` component
- **Case studies:** Dynamic `ProjectDetails.astro` layout

### Critical Issues
1. **No shared layout components** - hero, section, container all different
2. **Different grid systems** - custom vs Tailwind
3. **Inconsistent spacing rhythm** - portfolio uses custom, blog uses Tailwind scale
4. **Different card patterns** - `.uy-card` vs `ProjectCard.astro`
5. **No unified case study template** - HTML pages vs Astro layout

---

## 4. Weak Spacing

### Portfolio Spacing Issues
- Inconsistent vertical rhythm between sections
- Some sections use `padding: 6rem 0`, others use `padding: 8rem 0`
- Card gaps vary: `.uy-grid` uses `gap: 2.4rem`, `.uy-projects` uses custom
- Button padding inconsistent: standard vs `--lg` variant
- Mobile spacing not systematically reduced

### Blog Spacing Issues
- Tailwind spacing used inconsistently
- Some components use `py-16`, others use `py-24`
- No clear spacing scale documented
- Header padding: `py-6 sm:py-8` (arbitrary values)
- Project card spacing: `my-6` (no systematic rhythm)

### Recommendations
- Define unified spacing scale (4px base, 8/12/16/24/32/48/64/96)
- Document spacing tokens for sections, cards, buttons
- Create spacing utility classes that work across both sites
- Ensure mobile spacing is systematically reduced (50-75% of desktop)

---

## 5. Typography Inconsistencies

### Portfolio Typography
- **Fonts:** Geist (400/500/600/700/800), JetBrains Mono (400/500/600)
- **Headings:** 
  - `.uy-h1`: 4.8rem (mobile: 3.6rem)
  - `.uy-h2`: 3.6rem (mobile: 2.8rem)
  - `.uy-h3`: 2.4rem
- **Body:** 1.6rem base
- **Line height:** 1.6 for body, 1.2 for headings
- **Letter spacing:** Custom per element

### Blog Typography
- **Fonts:** Google Sans Code (400 weight only)
- **Headings:**
  - h1: `text-4xl md:text-6xl` (Tailwind scale)
  - h2: `text-2xl` (inconsistent)
- **Body:** Tailwind defaults
- **Line height:** Tailwind defaults
- **Letter spacing:** `tracking-tight`, `tracking-wide` (inconsistent)

### Critical Issues
1. **Different font families** - Geist vs Google Sans Code
2. **No shared type scale** - custom rem values vs Tailwind scale
3. **Inconsistent heading hierarchy** - portfolio has clear h1-h3, blog is ad-hoc
4. **Different line heights** - portfolio uses 1.6, blog uses Tailwind defaults
5. **Letter spacing chaos** - portfolio uses custom, blog uses Tailwind utilities

### Recommendations
- Choose ONE font family for both sites (Geist recommended)
- Define unified type scale (14/16/18/20/24/32/40/48/64)
- Document heading hierarchy (h1-h6 with sizes, weights, line heights)
- Standardize letter spacing (tight for headings, normal for body)
- Create typography utility classes

---

## 6. Button Systems

### Portfolio Button System
```scss
.uy-btn {
  min-height: 4.4rem;
  padding: 1.2rem 2rem;
  font-size: 1.5rem;
  font-weight: 650;
  border-radius: $uy-radius-md;
  
  // Variants
  &--primary   // Blue background, white text
  &--accent    // Yellow background, dark text
  &--ghost     // Transparent, border, adapts to dark contexts
  &--quiet     // Transparent, no border, minimal
  &--disabled  // Muted, non-interactive
  &--lg        // Larger size
  &--block     // Full width
}
```

**Strengths:**
- Consistent sizing (roughly Facebook "Add Friend" size ✓)
- Dark context awareness (ghost/quiet adapt to dark backgrounds)
- Clear disabled state
- Accessible focus states

**Weaknesses:**
- SASS-only (not reusable in Astro/React)
- No TypeScript types
- No component abstraction

### Blog Button System
**No unified button component.** Buttons use inline Tailwind:
```astro
<a class="rounded-full border border-border/80 px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent">
```

**Strengths:**
- Flexible (can customize per use)
- Tailwind utilities are well-understood

**Weaknesses:**
- No consistency (every button is different)
- No dark mode adaptation
- Verbose (long class strings)
- No disabled state pattern
- No size variants
- Not accessible (no focus states)

### Recommendations
1. **Create unified button component** (Astro component that works in both sites)
2. **Port portfolio button variants** to Tailwind utilities
3. **Add TypeScript types** for button props
4. **Ensure accessibility** (focus states, disabled, aria attributes)
5. **Document button usage** (when to use each variant)

---

## 7. Navigation Systems

### Portfolio Navigation
- **Structure:** Sticky header with backdrop blur
- **Desktop:** Horizontal links + CTA button
- **Mobile:** Hamburger menu with slide-down panel
- **Active state:** Background highlight
- **Brand:** Logo mark + text
- **Dark background:** Always dark with light text

**Strengths:**
- Professional appearance
- Clear active states
- Accessible mobile menu
- Consistent branding

**Weaknesses:**
- SASS-only (not reusable)
- Mobile menu requires JavaScript
- No keyboard navigation documented

### Blog Navigation
- **Structure:** Sticky header
- **Desktop:** Pill-style nav with rounded background
- **Mobile:** Details/summary hamburger menu
- **Active state:** Filled pill
- **Brand:** Text-only (author name)
- **Light background:** Adapts to theme

**Strengths:**
- Modern pill design
- Native HTML details/summary (no JS required)
- Theme-aware
- Compact

**Weaknesses:**
- Different visual language from portfolio
- No logo/brand mark
- Hamburger menu code duplicated 3x in base.css
- Inconsistent with portfolio

### Recommendations
1. **Choose ONE navigation pattern** (pill-style recommended)
2. **Create unified Nav component** (Astro component)
3. **Add logo/brand mark** to blog nav
4. **Consolidate hamburger menu** (remove duplicates)
5. **Document keyboard navigation**
6. **Ensure mobile UX consistency**

---

## 8. Mobile Responsiveness

### Portfolio Mobile Issues
- Some text wraps awkwardly on small screens
- Button text can break mid-word
- Hero section operator card stacks poorly on mobile
- Navigation CTA hidden on tablet (good) but no mobile alternative
- Some sections have excessive padding on mobile
- Grid layouts don't always adapt well (2-column on tablet, 1-column on mobile)

### Blog Mobile Issues
- Typewriter effect on homepage may be distracting on mobile
- Navigation pills hidden on mobile (good) but hamburger menu is basic
- Project cards have minimal mobile optimization
- Some Tailwind breakpoints are arbitrary (`sm:`, `md:` used inconsistently)
- No documented mobile-first approach

### Recommendations
1. **Mobile-first approach** - design for mobile, enhance for desktop
2. **Test on real devices** - iPhone SE, iPhone 14, iPad, Android
3. **Reduce padding systematically** - 50-75% of desktop values
4. **Optimize touch targets** - minimum 44x44px
5. **Test with slow connections** - ensure fast load times
6. **Document breakpoints** - when layouts change, why

---

## 9. Accessibility Issues

### Portfolio Accessibility Gaps
- Some buttons lack focus-visible states
- Color contrast may be weak in some ghost button states
- No skip-to-content link visible (exists but off-screen)
- Heading hierarchy may skip levels in some sections
- Some interactive elements lack aria labels
- Keyboard navigation not fully documented

### Blog Accessibility Gaps
- Hamburger menu lacks proper aria attributes
- Some links lack descriptive text (icon-only)
- Focus states inconsistent across components
- Color contrast not validated for all theme combinations
- No documented keyboard shortcuts
- Search functionality may not be keyboard-accessible

### Recommendations
1. **Run Lighthouse audits** on both sites
2. **Test with screen readers** (NVDA, JAWS, VoiceOver)
3. **Validate color contrast** (WCAG AA minimum)
4. **Add aria labels** to all interactive elements
5. **Document keyboard navigation**
6. **Test with keyboard only** (no mouse)
7. **Ensure focus states** are visible and consistent

---

## 10. Non-Production-Feeling UI Sections

### Portfolio Issues
- **Ecosystem section** - cards feel placeholder-ish (many "Coming soon", "Planned")
- **Proof wall** - some projects lack detail (feels incomplete)
- **Operator card** - visual is interesting but may be too niche
- **Network background** - canvas animation may be overkill

### Blog Issues
- **Homepage hero** - typewriter effect feels bootcamp-ish
- **"Project list currently syncing from the homelab..."** - placeholder text on live site
- **Empty project showcase** - no projects displayed on homepage
- **Generic "Data Analyst" positioning** - doesn't match portfolio's operator/founder tone

### Recommendations
1. **Remove placeholder text** from live site
2. **Consolidate ecosystem section** - only show what exists
3. **Simplify homepage hero** - remove typewriter, use static confident statement
4. **Add real project showcase** to blog homepage
5. **Align messaging** - blog should match portfolio's engineering identity
6. **Remove or finish** incomplete sections

---

## 11. Project System Analysis

### Portfolio Projects
- **Featured projects:** Displayed on homepage with full details
- **Case studies:** Dedicated HTML pages (orion.html, forgeworks.html, cameras.html)
- **Project cards:** Custom `.uy-project` component with status pills
- **Status system:** Live, Prototype, In Development, Lab Build, Private Deployment, Research Concept
- **Tech stack:** Displayed as tags

### Blog Projects
- **Project data:** Markdown files in `src/data/projects/`
- **Project schema:** title, description, pubDatetime, status, stack, demoURL, repoURL
- **Project layout:** `ProjectDetails.astro` with metadata sidebar
- **Project cards:** `ProjectCard.astro` component
- **Status system:** Same as portfolio (good!)

### Critical Issues
1. **Different project templates** - HTML pages vs Astro markdown
2. **Inconsistent project structure** - portfolio has more detail
3. **No unified project schema** - portfolio has more fields (client, role)
4. **Different card designs** - `.uy-project` vs `ProjectCard.astro`
5. **Case studies not standardized** - some have sections, others don't

### Recommendations (Phase 3)
1. **Migrate portfolio case studies** to Astro markdown
2. **Standardize project schema** across both sites
3. **Create unified project template** with required sections:
   - Overview
   - Problem
   - What Was Built
   - Technology Stack
   - Current Status
   - Key Lessons
   - Infrastructure / Deployment Notes
   - Future Improvements
4. **Consolidate project cards** - one design, one component
5. **Ensure all projects** have sufficient detail (no placeholders)

---

## 12. Design System Consolidation Plan

### Recommended Approach
1. **Choose Tailwind CSS v4** as primary framework (modern, performant, well-documented)
2. **Port portfolio SASS components** to Tailwind utilities + Astro components
3. **Create shared design tokens** (colors, spacing, typography, shadows)
4. **Build component library** (Button, Nav, Card, Section, Hero, etc.)
5. **Document everything** (Storybook or similar)

### Migration Strategy
1. **Phase 1:** Audit (this document) ✓
2. **Phase 2:** Define design tokens (colors, spacing, typography)
3. **Phase 3:** Build core components (Button, Nav, Card)
4. **Phase 4:** Migrate portfolio to Astro + Tailwind
5. **Phase 5:** Consolidate blog styling
6. **Phase 6:** Test, validate, deploy

---

## 13. Performance Considerations

### Portfolio Performance
- **SASS compilation:** Adds build step
- **Network background:** Canvas animation may impact performance
- **Font loading:** Google Fonts (2 families, multiple weights)
- **Image optimization:** Not documented
- **Bundle size:** Not measured

### Blog Performance
- **Tailwind JIT:** Fast compilation
- **Astro SSG:** Excellent performance baseline
- **Font loading:** Astro Font (optimized)
- **Image optimization:** Astro Image (built-in)
- **Bundle size:** Likely small (static site)

### Recommendations
1. **Run Lighthouse audits** on both sites
2. **Measure bundle sizes** (JS, CSS, fonts, images)
3. **Optimize images** (WebP, responsive sizes)
4. **Lazy load** non-critical assets
5. **Minimize font weights** (only load what's needed)
6. **Consider removing** canvas animation if it impacts performance

---

## 14. Next Steps (Phase 2-12)

### Immediate Actions (Phase 2)
1. Define unified color palette (light + dark mode)
2. Define spacing scale (4px base)
3. Define typography scale (14-64px)
4. Document design tokens in shared config file

### Short-term (Phase 3-6)
1. Build core component library (Button, Nav, Card, Section)
2. Migrate portfolio to Astro + Tailwind
3. Consolidate blog styling
4. Create unified project template
5. Refine mobile responsiveness

### Medium-term (Phase 7-9)
1. Add React islands where beneficial (filtering, search, theme toggle)
2. Run accessibility audits and fix issues
3. Run performance audits and optimize
4. Design review and iteration

### Long-term (Phase 10-12)
1. Create /lab or /stack page
2. Upgrade About page
3. Final validation and testing
4. Comprehensive report and handoff

---

## 15. Risk Assessment

### High Risk
- **Breaking existing deployments** - portfolio is live at dev.uyammadu.com
- **Losing SEO** - URLs must remain stable
- **Breaking contact form** - Cloudflare Workers backend must continue working
- **Theme switching** - dark mode must work consistently

### Medium Risk
- **Component migration** - SASS to Tailwind may introduce bugs
- **Mobile responsiveness** - layout changes may break on some devices
- **Performance regression** - new system must be as fast or faster

### Low Risk
- **Design iteration** - visual changes are low-risk if functionality preserved
- **Documentation** - can be improved incrementally

### Mitigation Strategies
1. **Staging environment** - test all changes before production
2. **Git branches** - use feature branches, PR reviews
3. **Backup** - keep portfolio SASS system as fallback
4. **Incremental migration** - don't change everything at once
5. **User testing** - validate on real devices, real users

---

## Conclusion

This audit reveals significant opportunities for consolidation and improvement. The portfolio and blog currently operate as separate design systems with zero shared components or design tokens. This creates maintenance burden, brand inconsistency, and missed opportunities for code reuse.

**Primary Recommendation:** Consolidate both sites onto a unified Astro + Tailwind CSS v4 foundation with shared components, design tokens, and documentation. This will improve maintainability, consistency, and developer experience while preserving the calm, engineered aesthetic that defines the Uyammadu brand.

**Next Step:** Proceed to Phase 2 (Engineering Identity Rebuild) to define the unified design system and begin component migration.
