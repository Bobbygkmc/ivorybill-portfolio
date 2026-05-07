# Deployment Notes

How `dev.uyammadu.com` is built and shipped. The public pages are a
static build served from `dist/`. The contact form uses a Cloudflare
Pages Function at `/api/contact`; there is no database or message
storage behind it.

---

## Build

```bash
# Install dev dependencies (one time)
npm install

# Watch SASS during local development (compiles on save)
npm run dev

# Production build — compile CSS and copy deployable files to dist/
npm run build
```

The compiled CSS lives at `css/style.css`. SASS sources live in
`sass/` (7-1 pattern). Edit SASS, never the compiled CSS.

The contact form posts to `/api/contact`, a Cloudflare Pages Function
that sends email through Resend. Direct email and phone remain visible
as fallbacks.

The production build creates a clean `dist/` directory containing only
static deployable files: HTML, compiled CSS, assets, and `index.js`.
Do not publish the repository root, because it may contain `node_modules`,
docs, source Sass, and local tooling state.

---

## Local preview

```bash
npm run build
npm run preview
```

Then open `http://127.0.0.1:4173`.

`npm run preview` calls `scripts/preview.py`, a local-only static server
for `dist/`. It maps extensionless routes such as `/services` and
`/contact` to their generated `.html` files so local preview matches
Cloudflare Pages clean URLs. The Python preview does **not** execute
Cloudflare Pages Functions, so `/api/contact` is not testable through
`npm run preview`. For full local function testing, use Cloudflare Pages
local tooling later, without adding a deploy command.

---

## Recommended deploy targets

In rough order of how easy they are to set up.

### Netlify

- Connect the GitHub repo.
- Build command: `npm run build`
- Publish directory: `/`
- Add a custom domain: `dev.uyammadu.com`.

### Cloudflare Pages

- Connect the GitHub repo.
- Framework preset: **None** / **Static**.
- Root directory: `/`.
- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command: leave blank. Do **not** use `npx wrangler deploy`
  for this static Pages site.
- Add a custom domain: `dev.uyammadu.com`. Cloudflare's DNS makes the
  cutover quick if the apex is already on Cloudflare.
- Configure the contact form variables/secrets:
  - `RESEND_API_KEY` as a Cloudflare Pages secret.
  - `CONTACT_TO_EMAIL`, expected value `chuk.uyammadu@gmail.com`.
  - `CONTACT_FROM_EMAIL`, a verified Resend sender such as
    `Uyammadu Dev <contact@uyammadu.com>`.

This is a Cloudflare Pages static deploy, not a Cloudflare Worker.
Do not add `wrangler deploy` or `assets.directory = "."`; that causes
Wrangler to upload repository files such as `node_modules`, which can
exceed Worker asset limits.

The broader ecosystem blog URL is `https://blog.uyammadu.com`. That blog
is a separate project/deployment and may require its own Cloudflare Pages
site and DNS record.

### Vercel

- Connect the GitHub repo.
- Framework preset: **Other**.
- Build command: `npm run build`
- Output directory: `dist`
- Add a custom domain: `dev.uyammadu.com`.

### Self-host on `lo-mein` (advanced)

If `dev.uyammadu.com` is pointed at a self-hosted machine:

- Reverse-proxy via Caddy or Nginx.
- TLS via Let's Encrypt or Cloudflare-issued cert.
- Static root: this repo's working tree, post-build.

A reload script can re-run `npm run build` and trigger a no-op reload
on the reverse proxy. Document any production config under `infra/`
in a separate repo, not this one.

---

## DNS

`dev.uyammadu.com` is a subdomain of the umbrella `uyammadu.com`.

- Apex `uyammadu.com` — separate landing page, not in this repo.
- `dev.uyammadu.com` — this repo.
- Other subdomains (`agents.`, `lab.`, `writing.`) — separate repos
  or apps under the same umbrella.
- `blog.uyammadu.com` — intended public blog URL, deployed separately
  from this services site.

Add a CNAME or ALIAS record on `dev.uyammadu.com` pointing at the
hosting provider. Confirm HTTPS issuance after the record propagates.

---

## Pre-deploy checklist

- [ ] `npm run build` succeeds locally with no errors.
- [ ] `dist/` exists and does not contain `node_modules`.
- [ ] `find dist -type f -size +20M -print` prints nothing.
- [ ] `git status` is clean before tagging a release.
- [ ] No secrets, tokens, or `.env` files are staged.
- [ ] All page-internal links resolve (no 404s on the static set).
- [ ] Mobile layout sanity-checked at 375px and 414px widths.
- [ ] Favicon and meta tags load on all pages.
- [ ] Contact form environment variables are configured in Cloudflare
      Pages before relying on `/api/contact` in production.
- [ ] No external trackers or analytics scripts have been added
      without an explicit decision.

---

## Post-deploy checklist

- [ ] `dev.uyammadu.com` resolves and loads over HTTPS.
- [ ] Homepage hero, services, projects, ecosystem, and contact
      sections render cleanly.
- [ ] Service catalog page renders pricing and disclaimers.
- [ ] Cameras page renders the privacy and handoff sections.
- [ ] Contact form sends through `/api/contact`, or shows the direct
      email/phone fallback if Resend variables are missing.
- [ ] Lighthouse score on `index.html` is at least 90 across
      Performance, Accessibility, and Best Practices.

---

## Rollback

The site is a static repo. Rollback is a `git revert` plus a redeploy.
For Netlify / Cloudflare Pages / Vercel, the dashboard also offers a
one-click rollback to the previous deploy.

No database or external service state is involved, so rollback is
inherently safe.
