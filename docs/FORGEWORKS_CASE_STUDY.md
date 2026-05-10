# ForgeWorks Case Study

Public source copy for the ForgeWorks / ForgeTable portfolio case study.
Mirror any public-facing ForgeWorks content here before updating
`forgeworks.html`, `projects.html`, or the homepage.

## Public summary

**Title:** ForgeWorks

**Subtitle:** Local builder community platform (ForgeTable)

**Status:** In development; public pilot polish in progress

**Short description:** A Rust-powered local builder community platform
prototype for organizing weekly project nights, RSVP flows, project
boards, public meeting recaps, sponsor pages, and community tech help —
with a careful public/private boundary between what members see and
what only operators touch.

**Long description:** ForgeWorks (working repo: ForgeTable) explores
what a credible "builder table" community platform looks like when the
public surface stays small, the admin surface stays gated, and the data
boundaries are explicit. The current prototype runs an Axum + SQLite
backend with static HTML pages and an operator-side `ft` CLI. The work
in progress is public launch polish: a single source of truth for build
metadata, data-driven home counts, an RSVP flow, a Tech Help Night
intake, and a public pilot confidence check that verifies the public
preview is safe before anyone outside the table sees it.

## Tags

- Rust
- Axum
- SQLite
- Community platform
- Events / RSVP
- Project showcase
- Public/private boundary

## Public link policy

- Case study: enabled at `/forgeworks`
- GitHub: private repo; label as `Private repo / available on request`
- Live demo: do not expose publicly; label as `Public pilot polish in progress`
- Do not link to local-only or admin URLs (Tailscale, Cloudflare tunnels,
  `127.0.0.1` previews, admin panel paths)

## Claim boundaries

- Do not claim ForgeWorks is fully launched.
- Do not claim it has paying customers, sponsors, or production-grade
  auth.
- Do not claim it has a public membership today.
- Do not claim Slack automation, AI features, or competition flows are
  shipped — they are deferred ideas in the product vision.
- Do not expose admin keys, Slack tokens, Cloudflare tunnel
  credentials, member emails, raw exports, the SQLite database, or
  unpublished recaps.
- Do not name specific upcoming events, sponsors in negotiation, or
  private operating model details.
- Do not name specific local venues as confirmed hosts on public copy.

## Case-study structure

1. **Problem:** Local technology communities tend to either stay
   informal (no project memory, no recap trail, no RSVP signal) or
   over-tool with SaaS that owns member data. ForgeWorks looks for a
   middle path: an operator-controlled platform that preserves a
   builder community's history without leaking private signal.
2. **Approach:** Build a small Rust + SQLite service with a strict
   public/private boundary. Public pages cover the homepage, project
   board, published recaps, sponsor page, public events, community
   tech help intake, and join page. Admin routes, Slack integration,
   raw data, and unpublished content stay behind an admin key.
3. **Implementation:** Axum HTTP service, SQLite as the source of
   truth, static HTML/CSS/JS for public pages, a Python "Scout" Slack
   bot skeleton kept intentionally separate, a Rust `ft` operator
   CLI, and a Raspberry Pi as the deployment target. Admin endpoints
   are gated by a `FORGETABLE_ADMIN_KEY`. Member emails, raw exports,
   and the SQLite database are never committed.
4. **Outcome (current):** Public launch polish work. Tech Help Night
   intake is implemented. A public pilot confidence check script
   verifies that admin data is not exposed and that admin routes
   reject invalid keys before any preview goes out.

## Public architecture placeholder

Use a sanitized flow diagram only:

`Member or visitor -> Public pages (home / projects / recaps / events
/ sponsors / join / tech help) -> Read-only public APIs -> SQLite -> Admin-key-gated
admin routes -> Operator CLI and Slack bot (private)`

Do not include:

- private repository URLs
- localhost / Tailscale / Cloudflare tunnel URLs
- the admin path or admin key
- Slack bot tokens or workspace data
- member emails or raw exports
- specific unpublished events or sponsor names

## What the case study demonstrates

- Designing a small, owner-controlled community platform without
  importing a heavy SaaS dependency.
- Drawing an explicit public/private data boundary into the
  architecture instead of bolting it on later.
- Using a typed Rust backend with SQLite and a separate operator CLI
  so the public surface stays small.
- Treating "is this safe to show in public preview?" as a scripted
  check, not a feeling.

## Public boundaries

- Prototype, not a production-ready product claim.
- No live public membership, no paid sponsors claimed, no production
  auth claimed.
- No public live demo URL is exposed.
- Repository is private; available on request.
