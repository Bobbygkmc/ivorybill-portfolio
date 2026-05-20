# Phase 2-12: Implementation Guide
**Date:** 2026-05-20  
**Status:** Ready for execution  
**Prerequisites:** Phase 1 audit complete

---

## Overview

This guide provides step-by-step instructions for implementing the full site redesign across both the portfolio (dev.uyammadu.com) and blog (blog.uyammadu.com). Each phase builds on the previous one and includes validation checkpoints.

**CRITICAL:** Do not push to GitHub without explicit approval. Test all changes in staging first.

---

## Phase 2: Engineering Identity Rebuild

### Objective
Strengthen the engineering identity across both sites with consistent messaging, positioning, and tone.

### Tasks

#### 2.1: Update Blog About Page
**File:** `/home/lo-mein/blog/src/pages/about.md`

Replace current content with:

```markdown
---
layout: ../layouts/AboutLayout.astro
title: "About"
---

## Engineering Identity

Chukwuemelie "Chuk" Uyammadu builds practical technology systems for real-world operations. The work spans software development, data analytics, AI systems, cybersecurity, infrastructure engineering, and operational tooling — all approached with a systems-thinking mindset and a focus on maintainability.

## Background

- **Information Systems Management** background with practical business operations awareness
- **IT support and data analysis** experience in restaurant and small-business environments
- **Software development** focus on Python, backend systems, and AI-assisted tooling
- **Infrastructure engineering** through Linux homelab work, Raspberry Pi deployments, and local-first systems
- **Operator mindset** — technology should be understandable, documented, and transferable

## Technical Focus Areas

### Software Development
Building backend systems, APIs, and automation workflows. Primary stack includes Python (FastAPI, Pydantic), Rust (Axum), and TypeScript (Astro, Node.js). Focus on typed interfaces, error handling, and deterministic behavior.

### AI Systems
Exploring AI-assisted workflows with safety guardrails, decision trails, and human oversight. Projects like Orion demonstrate how to build AI systems that are reviewable, testable, and safe for business operations.

### Data Analytics
Operational intelligence, reporting automation, and business dashboards. Experience with restaurant POS data, sales analysis, and owner-friendly summaries that translate technical metrics into actionable insights.

### Infrastructure Engineering
Raspberry Pi deployments, Docker containers, systemd services, Tailscale mesh networks, and Cloudflare infrastructure. Focus on local-first systems that owners can control and understand.

### Cybersecurity
Practical security concepts, threat modeling, and operational security patterns. Not enterprise-scale, but thoughtful approaches to authentication, authorization, secrets management, and system hardening.

## Development Philosophy

**Local-first, owner-controlled systems.** Technology should not create vendor lock-in or dependency on external services that can disappear. When cloud services are used (Cloudflare, Resend), they're chosen for reliability and clear pricing, not because they're trendy.

**Documentation as a first-class deliverable.** Every project includes handoff documentation, architecture decisions, and operational runbooks. The next person (or future you) should be able to understand what was built and why.

**Iterative experimentation over perfect planning.** Build small, test assumptions, learn from failures, and iterate. Many projects start as private research or lab builds before becoming public-facing deployments.

**AI-assisted development workflows.** Using AI tools (Claude, Cursor, GitHub Copilot) to accelerate development while maintaining code quality, security awareness, and architectural discipline.

## Current Projects

Active work includes:
- **Orion** — Safe AI business intelligence prototype with security guardrails
- **Forgeworks** — Community platform for local makers and builders
- **Camera/NVR systems** — Privacy-first security camera deployments
- **Crenshaw agent** — Internal workflow automation and build notifications
- **Raspberry Pi infrastructure** — Local services, development environments, and homelab operations

See the [Projects](/projects) page for full portfolio and case studies.

## Technology Stack

**Languages:** Python, Rust, TypeScript, JavaScript, Bash  
**Frameworks:** FastAPI, Axum, Astro, Node.js  
**Infrastructure:** Raspberry Pi 5, Debian Linux, Docker, systemd, Tailscale, Cloudflare  
**Databases:** SQLite, PostgreSQL (when needed)  
**AI Tools:** Claude, Cursor, GitHub Copilot  
**Development:** Git, VS Code, Linux terminal, AI-assisted workflows

## Contact

For project inquiries, collaboration opportunities, or technical discussions:

- **Email:** [chuk.uyammadu@gmail.com](mailto:chuk.uyammadu@gmail.com)
- **GitHub:** [github.com/bobbygkmc](https://github.com/bobbygkmc)
- **LinkedIn:** [linkedin.com/in/cuyammadu](https://www.linkedin.com/in/cuyammadu)
- **Portfolio:** [dev.uyammadu.com](https://dev.uyammadu.com)

## About This Site

This blog serves as the public-facing platform for technical writing, project documentation, and engineering notes. It's built with Astro (static site generator), deployed on Cloudflare Pages, and maintained as a living document of ongoing work.

The focus is not on shipping everything quickly — it's on building systems deliberately, documenting lessons clearly, and creating technology that remains practical for people and businesses.
```

#### 2.2: Update Blog Homepage
**File:** `/home/lo-mein/blog/src/pages/index.astro`

Replace typewriter effect with static, confident statement:

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import Socials from "../components/Socials.astro";
import ProjectCard from "../components/ProjectCard.astro";
import { SITE, SOCIALS } from "../config";
import { getCollection } from "astro:content";

const socialCount = SOCIALS.filter(social => social.active).length;
const projects = (await getCollection("projects"))
  .sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf())
  .slice(0, 3);
---

<Layout title={SITE.title}>
  <Header />
  <main id="main-content" class="app-layout">
    <section id="hero" class="py-16 md:py-24">
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
        Building practical technology systems for real-world operations.
      </h1>
      <p class="text-lg md:text-xl text-foreground/85 max-w-2xl leading-relaxed mb-8">
        Software development, data analytics, AI systems, infrastructure engineering, and operational tooling. 
        Focused on maintainability, documentation, and owner-controlled systems.
      </p>

      {socialCount > 0 && (
        <div class="mt-8">
          <Socials />
        </div>
      )}
    </section>

    <div class="h-px bg-border w-full opacity-20"></div>

    <section id="recent-projects" class="py-16">
      <h2 class="text-2xl font-bold tracking-wide mb-8">Recent Projects</h2>
      {projects.length > 0 ? (
        <ul class="space-y-4">
          {projects.map(project => <ProjectCard {...project} />)}
        </ul>
      ) : (
        <p class="text-foreground/70">Projects coming soon.</p>
      )}
      <div class="mt-8">
        <a href="/projects" class="text-accent hover:underline">View all projects →</a>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

#### 2.3: Update Site Config
**File:** `/home/lo-mein/blog/src/config.ts`

Update site description:

```typescript
export const SITE: Site = {
  website: "https://blog.uyammadu.com",
  author: "Chuk Uyammadu",
  desc: "Technical writing, project documentation, and engineering notes on software development, AI systems, data analytics, and infrastructure engineering.",
  title: "Chuk Uyammadu",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000,
};
```

### Validation
- [ ] About page reads professionally and technically
- [ ] Homepage hero is confident, not gimmicky
- [ ] Site description matches engineering identity
- [ ] No placeholder text on live pages
- [ ] Messaging consistent with portfolio

---

## Phase 3: Project System Refinement

### Objective
Standardize all project pages with consistent structure and sufficient detail.

### Tasks

#### 3.1: Define Standard Project Template

All projects must include these sections:

1. **Overview** - What is this project?
2. **Problem** - What problem does it solve?
3. **What Was Built** - Technical implementation details
4. **Technology Stack** - Languages, frameworks, tools
5. **Current Status** - Live, Prototype, In Development, etc.
6. **Key Lessons** - What was learned?
7. **Infrastructure / Deployment Notes** - How is it deployed?
8. **Future Improvements** - What's next?

#### 3.2: Update Existing Project Files

For each project in `/home/lo-mein/blog/src/data/projects/`, ensure it follows the template.

**Example: orion.md**

```markdown
---
title: "Orion — Safe AI Business Intelligence Prototype"
description: "AI-assisted business intelligence with security guardrails, decision trails, and human oversight. Demonstrates safe AI patterns for operational use."
pubDatetime: 2026-02-20T00:00:00Z
status: "Prototype"
stack:
  - "Python"
  - "FastAPI"
  - "Pydantic"
  - "Security Guardrails"
---

## Overview

Orion is a safe AI business intelligence prototype that demonstrates how to build AI-assisted analysis systems with security guardrails, decision trails, and human oversight. It uses fictional demo data and read-only patterns to show safe AI implementation for business operations.

## Problem

AI systems for business intelligence often lack:
- Security guardrails against destructive operations
- Decision trails for audit and review
- Read-only patterns to prevent data corruption
- Eval checks to validate AI outputs
- Human oversight mechanisms

## What Was Built

A Python/FastAPI prototype with:
- **Read-only connectors** - No write operations to data sources
- **Destructive operation blocking** - Prevents DELETE, DROP, TRUNCATE
- **Eval checks** - Validates AI outputs before execution
- **Decision trails** - Logs all AI decisions for review
- **Fictional demo data** - Safe testing environment
- **Typed responses** - Pydantic models for validation

## Technology Stack

- **Backend:** Python 3.11+, FastAPI
- **Validation:** Pydantic for typed responses
- **AI:** Claude API (Anthropic)
- **Security:** Custom guardrail patterns
- **Demo Data:** Fictional business scenarios

## Current Status

**Prototype.** Demonstrates safe AI patterns but not production-ready. Used as reference implementation for client projects.

## Key Lessons

1. **Read-only by default** - AI systems should never have write access without explicit human approval
2. **Decision trails matter** - Every AI decision must be logged and reviewable
3. **Eval checks are essential** - Validate AI outputs before execution
4. **Fictional data is safer** - Use demo data for prototypes to avoid real data exposure
5. **Typed responses reduce errors** - Pydantic models catch issues early

## Infrastructure / Deployment Notes

- Runs locally on Raspberry Pi 5 for development
- No production deployment (prototype only)
- Uses environment variables for API keys
- Logs stored locally for review

## Future Improvements

- Add more guardrail patterns (rate limiting, cost controls)
- Implement approval workflows for sensitive operations
- Add real-time monitoring dashboard
- Create reusable guardrail library
- Document patterns for other developers

---

**Related Documentation:**
- [Orion Case Study](/docs/ORION_CASE_STUDY.md)
- [Security Guardrails Guide](/docs/AI_SECURITY_PATTERNS.md)
```

#### 3.3: Create Missing Sections

For projects lacking detail, add general sections:

```markdown
## Future Improvements

This project is in active development. Future improvements will be documented as they're implemented.
```

### Validation
- [ ] All projects follow standard template
- [ ] No placeholder text ("coming soon", "syncing from homelab")
- [ ] Each project has sufficient detail (minimum 500 words)
- [ ] Technology stacks are accurate
- [ ] Status badges are honest

---

## Phase 4: Create /lab or /stack Page

### Objective
Create a new page showcasing the development environment and technology stack.

### Tasks

#### 4.1: Create Lab Page
**File:** `/home/lo-mein/blog/src/pages/lab.astro`

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { SITE } from "../config";
---

<Layout title={`Lab | ${SITE.title}`}>
  <Header />
  <main id="main-content" class="app-layout pb-12">
    <section class="py-16">
      <h1 class="text-4xl font-bold mb-4">The Lab</h1>
      <p class="text-lg text-foreground/85 max-w-2xl mb-12">
        A practical engineering environment for building, testing, and deploying technology systems. 
        Local-first, owner-controlled, and documented.
      </p>

      <div class="space-y-16">
        <!-- Hardware -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Hardware</h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <h3 class="text-lg font-semibold mb-2">Raspberry Pi 5</h3>
              <p class="text-sm text-foreground/75 mb-4">
                Primary development and deployment server. Runs Docker containers, systemd services, 
                and local infrastructure.
              </p>
              <ul class="text-sm text-foreground/75 space-y-1">
                <li>• 8GB RAM</li>
                <li>• 256GB NVMe SSD</li>
                <li>• Debian Linux</li>
                <li>• Always-on local services</li>
              </ul>
            </div>

            <div class="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <h3 class="text-lg font-semibold mb-2">Development Workstation</h3>
              <p class="text-sm text-foreground/75 mb-4">
                Primary development machine for coding, testing, and AI-assisted workflows.
              </p>
              <ul class="text-sm text-foreground/75 space-y-1">
                <li>• Linux desktop environment</li>
                <li>• VS Code + Cursor</li>
                <li>• Docker Desktop</li>
                <li>• Git + GitHub CLI</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Software Stack -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Software Stack</h2>
          
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-semibold mb-3">Languages</h3>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Python</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Rust</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">TypeScript</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">JavaScript</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Bash</span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Frameworks</h3>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">FastAPI</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Axum</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Astro</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Node.js</span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Infrastructure</h3>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Docker</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">systemd</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Tailscale</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Cloudflare</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Nginx</span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Databases</h3>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">SQLite</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">PostgreSQL</span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">AI Tools</h3>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Claude</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">Cursor</span>
                <span class="rounded-full bg-muted/70 px-3 py-1 text-sm">GitHub Copilot</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Development Workflow -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Development Workflow</h2>
          <div class="space-y-4">
            <div class="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <h3 class="text-lg font-semibold mb-2">Local-First Development</h3>
              <p class="text-sm text-foreground/75">
                All development starts locally on Raspberry Pi or workstation. Services run in Docker containers 
                or systemd units. Remote access via Tailscale mesh network (no exposed ports).
              </p>
            </div>

            <div class="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <h3 class="text-lg font-semibold mb-2">AI-Assisted Coding</h3>
              <p class="text-sm text-foreground/75">
                Using Claude, Cursor, and GitHub Copilot to accelerate development while maintaining code quality. 
                AI suggestions are reviewed, tested, and validated before merging.
              </p>
            </div>

            <div class="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <h3 class="text-lg font-semibold mb-2">Documentation-Driven</h3>
              <p class="text-sm text-foreground/75">
                Every project includes architecture decisions, deployment notes, and operational runbooks. 
                Documentation is written alongside code, not as an afterthought.
              </p>
            </div>

            <div class="rounded-2xl border border-border/80 bg-muted/30 p-6">
              <h3 class="text-lg font-semibold mb-2">Iterative Deployment</h3>
              <p class="text-sm text-foreground/75">
                Build small, test assumptions, deploy incrementally. Many projects start as private research 
                before becoming public-facing deployments.
              </p>
            </div>
          </div>
        </section>

        <!-- Deployment Philosophy -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Deployment Philosophy</h2>
          <div class="prose prose-lg max-w-none">
            <p>
              Technology should be <strong>understandable</strong>, <strong>documented</strong>, 
              and <strong>transferable</strong>. When building systems for clients or personal use, 
              the goal is always owner control and operational clarity.
            </p>
            <ul>
              <li><strong>Local-first:</strong> Services run on owner-controlled hardware when possible</li>
              <li><strong>Cloud-aware:</strong> Use cloud services (Cloudflare, Resend) for reliability, not lock-in</li>
              <li><strong>Documentation-first:</strong> Every deployment includes handoff docs and runbooks</li>
              <li><strong>Security-conscious:</strong> Secrets management, least privilege, audit trails</li>
              <li><strong>Cost-transparent:</strong> No surprise bills, clear pricing, predictable costs</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

#### 4.2: Add Lab Link to Navigation
**File:** `/home/lo-mein/blog/src/components/Header.astro`

Update `navLinks` array:

```typescript
const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/posts", label: "Posts" },
  { href: "/lab", label: "Lab" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
];
```

### Validation
- [ ] Lab page renders correctly
- [ ] Navigation includes Lab link
- [ ] Content is accurate and believable
- [ ] No exaggerated claims
- [ ] Mobile responsive

---

## Phase 5: About Page Upgrade (Portfolio)

### Objective
Rewrite portfolio About page with founder/operator narrative.

### Tasks

#### 5.1: Update Portfolio About Page
**File:** `/home/lo-mein/uyammadu-portfolio/about.html`

This requires significant HTML rewriting. Key sections to include:

1. **Hero:** "Building practical technology for people and businesses"
2. **Background:** Information Systems Management, IT support, data analysis
3. **Technical Focus:** Software, AI, data, infrastructure, cybersecurity
4. **Philosophy:** Local-first, documentation-driven, iterative
5. **Current Work:** Active projects and services
6. **Contact:** Email, phone, GitHub, LinkedIn

Use existing `.uy-*` component classes for consistency.

### Validation
- [ ] About page reads professionally
- [ ] No exaggerated claims
- [ ] Contact information accurate
- [ ] Consistent with blog About page
- [ ] Mobile responsive

---

## Phase 6: UI/Design System Refinement

### Objective
Consolidate design systems and create shared components.

### Tasks

#### 6.1: Clean Up Blog Base.css
**File:** `/home/lo-mein/blog/src/styles/base.css`

Remove duplicate hamburger menu implementations (keep only one):

```css
/* Minimalist Architect Menu */
.hamburger-menu {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
  cursor: pointer;
}
.hamburger-menu span {
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hamburger-menu span:nth-child(1) { width: 100%; }
.hamburger-menu span:nth-child(2) { width: 60%; align-self: flex-end; }
.hamburger-menu:hover span:nth-child(2) { width: 100%; }
```

Delete the other two duplicate implementations.

#### 6.2: Create Unified Button Component
**File:** `/home/lo-mein/blog/src/components/Button.astro`

```astro
---
type Props = {
  variant?: "primary" | "accent" | "ghost" | "quiet";
  size?: "default" | "lg";
  href?: string;
  class?: string;
};

const { variant = "primary", size = "default", href, class: className } = Astro.props;

const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all";
const sizeClasses = {
  default: "min-h-[44px] px-5 py-3 text-sm",
  lg: "min-h-[52px] px-6 py-3.5 text-base",
};
const variantClasses = {
  primary: "bg-accent text-background hover:bg-accent/90 shadow-md hover:shadow-lg",
  accent: "bg-accent text-background hover:bg-accent/90",
  ghost: "bg-transparent border border-border/80 text-foreground hover:border-accent/50 hover:text-accent",
  quiet: "bg-transparent text-foreground hover:text-accent",
};

const classes = [baseClasses, sizeClasses[size], variantClasses[variant], className].filter(Boolean).join(" ");

const Tag = href ? "a" : "button";
---

<Tag href={href} class={classes}>
  <slot />
</Tag>
```

#### 6.3: Update Spacing Scale
**File:** `/home/lo-mein/blog/tailwind.config.js` (if exists) or document in design tokens

Define unified spacing scale:
- 4px base (0.25rem)
- 8/12/16/24/32/48/64/96 (0.5/0.75/1/1.5/2/3/4/6rem)

#### 6.4: Standardize Typography
**File:** `/home/lo-mein/blog/src/styles/typography.css`

Add type scale utilities:

```css
@layer utilities {
  .text-xs { font-size: 0.75rem; line-height: 1.5; }
  .text-sm { font-size: 0.875rem; line-height: 1.5; }
  .text-base { font-size: 1rem; line-height: 1.6; }
  .text-lg { font-size: 1.125rem; line-height: 1.6; }
  .text-xl { font-size: 1.25rem; line-height: 1.5; }
  .text-2xl { font-size: 1.5rem; line-height: 1.4; }
  .text-3xl { font-size: 1.875rem; line-height: 1.3; }
  .text-4xl { font-size: 2.25rem; line-height: 1.2; }
  .text-5xl { font-size: 3rem; line-height: 1.1; }
  .text-6xl { font-size: 3.75rem; line-height: 1; }
}
```

### Validation
- [ ] No duplicate CSS code
- [ ] Button component works across site
- [ ] Spacing is consistent
- [ ] Typography scale is clear
- [ ] Mobile responsive

---

## Phase 7: React Islands Implementation

### Objective
Add React islands for interactive features without destroying Astro performance.

### Tasks

#### 7.1: Install React Integration
```bash
cd /home/lo-mein/blog
npx astro add react
```

#### 7.2: Create Theme Toggle Component
**File:** `/home/lo-mein/blog/src/components/ThemeToggle.tsx`

```tsx
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme as "light" | "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 hover:bg-muted/60 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
}
```

#### 7.3: Add Theme Toggle to Header
**File:** `/home/lo-mein/blog/src/components/Header.astro`

```astro
---
import ThemeToggle from "./ThemeToggle";
// ... existing imports
---

<header class="app-layout w-full py-6 sm:py-8">
  <div class="flex items-center justify-between gap-4">
    <!-- ... existing brand and nav ... -->
    
    <div class="flex items-center gap-2">
      <ThemeToggle client:load />
      <!-- ... existing mobile menu ... -->
    </div>
  </div>
</header>
```

#### 7.4: Create Project Filter Component (Optional)
**File:** `/home/lo-mein/blog/src/components/ProjectFilter.tsx`

```tsx
import { useState } from "react";
import type { CollectionEntry } from "astro:content";

type Props = {
  projects: CollectionEntry<"projects">[];
};

export default function ProjectFilter({ projects }: Props) {
  const [filter, setFilter] = useState<string>("all");
  
  const statuses = ["all", ...new Set(projects.map(p => p.data.status))];
  
  const filtered = filter === "all" 
    ? projects 
    : projects.filter(p => p.data.status === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === status
                ? "bg-accent text-background"
                : "bg-muted/70 text-foreground/80 hover:bg-muted"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      
      <ul className="space-y-6">
        {filtered.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.slug}`} className="block">
              <h3 className="text-lg font-semibold text-accent hover:underline">
                {project.data.title}
              </h3>
              <p className="mt-2 text-foreground/85">{project.data.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Validation
- [ ] React islands load correctly
- [ ] Theme toggle works
- [ ] No hydration errors
- [ ] Performance not degraded
- [ ] Islands are isolated (don't affect rest of site)

---

## Phase 8: Accessibility + Performance

### Objective
Ensure both sites meet WCAG AA standards and perform well.

### Tasks

#### 8.1: Run Lighthouse Audits
```bash
# Portfolio
npx lighthouse https://dev.uyammadu.com --view

# Blog
npx lighthouse https://blog.uyammadu.com --view
```

Fix issues with scores below 90.

#### 8.2: Validate Color Contrast
Use browser DevTools or online tools to check all text/background combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

#### 8.3: Add Skip Links
**File:** `/home/lo-mein/blog/src/components/Header.astro`

```astro
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-background focus:rounded-lg">
  Skip to content
</a>
```

#### 8.4: Validate Heading Hierarchy
Ensure every page has:
- One `<h1>` (page title)
- Logical `<h2>` sections
- No skipped levels (h1 → h3)

#### 8.5: Add ARIA Labels
All interactive elements without visible text need `aria-label`:

```astro
<button aria-label="Toggle mobile menu">
  <svg>...</svg>
</button>
```

#### 8.6: Test Keyboard Navigation
- Tab through all interactive elements
- Ensure focus states are visible
- Test mobile menu with keyboard
- Verify search is keyboard-accessible

#### 8.7: Optimize Images
```bash
# Convert to WebP
for img in assets/images/**/*.{jpg,png}; do
  cwebp -q 85 "$img" -o "${img%.*}.webp"
done
```

Update image references to use WebP with fallbacks.

### Validation
- [ ] Lighthouse scores > 90 (all categories)
- [ ] Color contrast passes WCAG AA
- [ ] Skip links work
- [ ] Heading hierarchy is logical
- [ ] All interactive elements have labels
- [ ] Keyboard navigation works
- [ ] Images optimized

---

## Phase 9: Design Review

### Objective
Critical assessment of design decisions and remaining issues.

### Tasks

#### 9.1: Document 8 Things That Need Improvement

**File:** `/home/lo-mein/uyammadu-portfolio/docs/DESIGN_REVIEW.md`

```markdown
# Design Review

## 8 Things That Still Need Improvement

1. **Portfolio/Blog visual inconsistency** - Different color schemes, button styles, spacing
2. **Mobile navigation UX** - Portfolio and blog have different patterns
3. **Project card designs** - Not unified across sites
4. **Typography hierarchy** - Different scales and weights
5. **Dark mode implementation** - Blog has it, portfolio doesn't
6. **Footer designs** - Completely different layouts
7. **Form styling** - Contact forms use different patterns
8. **Loading states** - No consistent loading/skeleton patterns

## 8 Alternative Implementation Approaches

1. **Unified design system** - Create shared Tailwind config for both sites
2. **Component library** - Build Astro components that work in both repos
3. **Monorepo structure** - Combine portfolio and blog into single repo
4. **Headless CMS** - Use Sanity or similar for content management
5. **Full Astro migration** - Convert portfolio HTML to Astro
6. **Tailwind everywhere** - Remove SASS, use Tailwind exclusively
7. **React for interactivity** - Use React islands for all interactive features
8. **Design tokens package** - NPM package with shared tokens

## 8 Strongest Design Decisions

1. **Pill-style navigation** - Modern, compact, professional
2. **Calm color palette** - Not over-animated or hype-driven
3. **Clear status badges** - Honest project statuses (Live, Prototype, etc.)
4. **Documentation-first** - Every project has case study
5. **Local-first messaging** - Clear positioning around owner control
6. **Accessible focus states** - Visible keyboard navigation
7. **Mobile-first responsive** - Works well on small screens
8. **Fast static sites** - Astro SSG for performance

## 8 Weakest UI/UX Areas Remaining

1. **Inconsistent button sizing** - Some too large, some too small
2. **Spacing rhythm breaks** - Not systematic across all sections
3. **Card hover states** - Some cards have hover, others don't
4. **Form validation feedback** - Not clear when errors occur
5. **Loading indicators** - No feedback during async operations
6. **Empty states** - "No projects" messaging is weak
7. **Error pages** - 404 page is generic
8. **Search UX** - Search results page needs improvement

## 8 Future Expansion Ideas

1. **Command palette** - Keyboard shortcut for navigation (Cmd+K)
2. **Project timeline view** - Visual timeline of all projects
3. **Tech stack visualization** - Interactive diagram of tools/frameworks
4. **Case study templates** - Reusable templates for new projects
5. **Blog series** - Multi-part technical deep dives
6. **Newsletter integration** - Email signup for updates
7. **RSS improvements** - Full-text RSS with images
8. **Analytics dashboard** - Public stats on site usage
```

### Validation
- [ ] Design review document created
- [ ] Issues documented honestly
- [ ] Alternative approaches considered
- [ ] Strengths acknowledged
- [ ] Future ideas captured

---

## Phase 10: Safety Rules (Ongoing)

### Critical Rules

**DO NOT:**
- Push to GitHub without approval
- Delete major content without backup
- Remove portfolio history
- Expose secrets or credentials
- Touch .env files
- Modify credentials
- Break deployment
- Replace Astro entirely
- Add fake content
- Invent business metrics
- Invent enterprise claims

**ALWAYS:**
- Test in staging first
- Use feature branches
- Document changes
- Validate builds
- Check git status
- Verify live site
- Keep backups

---

## Phase 11: Validation

### Objective
Comprehensive testing before considering work complete.

### Tasks

#### 11.1: Build Validation
```bash
# Portfolio
cd /home/lo-mein/uyammadu-portfolio
npm run build

# Blog
cd /home/lo-mein/blog
npm run build
```

Both must succeed with no errors.

#### 11.2: Git Status Check
```bash
# Portfolio
cd /home/lo-mein/uyammadu-portfolio
git status -sb

# Blog
cd /home/lo-mein/blog
git status -sb
```

Review all changes before committing.

#### 11.3: Live Site Verification
```bash
# Portfolio
curl -I https://dev.uyammadu.com

# Blog
curl -I https://blog.uyammadu.com
```

Both should return HTTP/2 200.

#### 11.4: Feature Checklist
- [ ] Projects render correctly
- [ ] Mobile nav works
- [ ] Search works
- [ ] RSS works
- [ ] Sitemap works
- [ ] Theme toggle works (blog)
- [ ] Contact form works (portfolio)
- [ ] No broken routes
- [ ] No hydration mismatch
- [ ] No missing assets
- [ ] No console errors

#### 11.5: Cross-Browser Testing
Test on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

#### 11.6: Performance Testing
```bash
# Run Lighthouse on both sites
npx lighthouse https://dev.uyammadu.com --view
npx lighthouse https://blog.uyammadu.com --view
```

Target scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Validation
- [ ] Builds succeed
- [ ] Git status clean
- [ ] Live sites responding
- [ ] All features work
- [ ] Cross-browser tested
- [ ] Performance acceptable

---

## Phase 12: Final Report

### Objective
Comprehensive documentation of all changes and recommendations.

### Tasks

#### 12.1: Create Final Report
**File:** `/home/lo-mein/uyammadu-portfolio/docs/FINAL_REPORT.md`

Include:
1. **Files Modified** - Complete list with descriptions
2. **Files Created** - New files and their purpose
3. **Design System Changes** - What changed and why
4. **React Islands Added** - Which components, why
5. **Project Structure Improvements** - Organization changes
6. **Accessibility Improvements** - WCAG compliance updates
7. **Performance Improvements** - Speed optimizations
8. **Remaining Risks** - Known issues or technical debt
9. **8 Next-Step Recommendations** - Future work
10. **Commit Recommendations** - Suggested commit strategy

#### 12.2: Document Commit Strategy

**Recommended approach:**

```bash
# Feature branch for each phase
git checkout -b phase-2-engineering-identity
# ... make changes ...
git add .
git commit -m "Phase 2: Update About pages and homepage messaging"
git push origin phase-2-engineering-identity
# Create PR, review, merge

# Repeat for each phase
git checkout -b phase-3-project-refinement
# ... etc
```

**DO NOT** push directly to main without review.

### Validation
- [ ] Final report complete
- [ ] All changes documented
- [ ] Commit strategy defined
- [ ] Risks acknowledged
- [ ] Next steps clear

---

## Execution Checklist

Before starting implementation:
- [ ] Read entire guide
- [ ] Understand each phase
- [ ] Have staging environment ready
- [ ] Have backups of both sites
- [ ] Have approval to proceed

During implementation:
- [ ] Work one phase at a time
- [ ] Test after each phase
- [ ] Document issues as they arise
- [ ] Ask for clarification when needed
- [ ] Don't skip validation steps

After implementation:
- [ ] Run full validation (Phase 11)
- [ ] Create final report (Phase 12)
- [ ] Get approval before pushing
- [ ] Monitor live sites after deployment
- [ ] Document lessons learned

---

## Support & Questions

If you encounter issues during implementation:

1. **Check the audit** - Phase 1 audit may have relevant context
2. **Review validation steps** - Ensure previous phases completed successfully
3. **Test in isolation** - Isolate the issue to specific component/page
4. **Document the problem** - Clear description helps troubleshooting
5. **Ask for help** - Don't guess, ask for clarification

---

## Conclusion

This guide provides a complete roadmap for implementing the full site redesign. Each phase builds on the previous one and includes validation checkpoints to ensure quality.

**Remember:** The goal is not to ship everything quickly — it's to build systems deliberately, document lessons clearly, and create technology that remains practical for people and businesses.

Take your time. Test thoroughly. Document everything.
