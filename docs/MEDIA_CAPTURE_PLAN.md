# Media Capture Plan

This site uses original SVG placeholders first, then replaces them with
owner-created photos and screenshots when safe. Visuals should reinforce
the operator proof-wall: real systems, clean handoff, local business
technology, and practical technical work.

The current placeholder filenames use stable project slugs such as
`project-ai-dashboard.svg` and `og-default.svg` because they are directly
referenced by static HTML. Campaign-style timestamped filenames are useful
for larger marketing asset libraries, but this site keeps public web
assets stable and tracks review state in `.assets/manifest.json`.

## Asset Locations

```
assets/images/
├── brand/          Brand-owned marks and lockups
├── headshots/      Approved Chuk headshots
├── projects/       Project thumbnails and case-study visuals
├── workflow/       Process diagrams, handoff visuals, workstation details
├── cameras/        Camera/NVR hardware photos and diagrams
├── social/         Open Graph and social preview images
└── placeholders/   Original generated SVG placeholders
```

## Required Future Media

- Chuk headshot: clean, current, shoulder-up, neutral background.
- Workstation/laptop setup: no private screens, passwords, customer
  names, chats, emails, or browser tabs visible.
- Raspberry Pi/server setup: hardware, cabling, and local dashboard
  context with no exposed IPs, hostnames, tokens, or home-address clues.
- Camera/NVR hardware setup: equipment photos only, no private footage,
  license plates, private addresses, or identifiable customers.
- Cloudflare deployment screenshot: deployment status only, with no
  environment variables, secrets, account IDs, tokens, billing, or private
  project settings visible.
- Orion dashboard/demo screenshot: fictional data only, no real
  customer data, no private business records, no API keys.
- ForgeWorks screenshot: public-safe prototype data only, no private
  member records, email addresses, invite links, or admin screens.
- Peppino's public-facing website, Google Business Profile, or local SEO
  screenshots only. Do not use internal/private systems or operational
  data.
- Restaurant tech/process photos only with permission, no customer faces,
  no staff faces without permission, no receipts, no POS screens, no order
  data, and no private camera footage.

## Privacy Rules

- Do not use private customer data.
- Do not use Peppino's internal/private data.
- Do not show passwords, API keys, tokens, QR login codes, recovery codes,
  billing data, private emails, private addresses, or financials.
- Do not show customer faces or staff faces without clear permission.
- Avoid license plates, street addresses, delivery labels, and receipts.
- Do not imply endorsements by restaurants, vendors, software products, or
  customers unless permission is explicit.
- Never publish screenshots from admin panels that expose environment
  variables, account IDs, billing, security settings, or user records.

## Screenshot Redaction Rules

Use source screenshots that are already safe whenever possible. If a
screenshot needs redaction:

- Crop first, then blur or cover remaining sensitive regions.
- Replace real names, emails, phone numbers, addresses, order IDs, and
  financial values with fictional examples.
- Use opaque blocks for secrets; do not rely on light blur for passwords
  or keys.
- Re-check the final exported image at 200% zoom before committing it.
- Keep the unredacted original outside the repo.

## File Naming

Use lowercase kebab-case:

```
area-subject-context-width.ext
project-orion-dashboard-demo-1600.png
cameras-nvr-hardware-bench-1200.jpg
headshot-chuk-neutral-1200.jpg
social-og-default-1200x630.png
```

For replacement images, prefer descriptive names over generic names like
`image1.png` or `screenshot-final.png`.

## Recommended Sizes

- Homepage hero visual: 1200 x 800 or SVG with a 3:2 viewBox.
- Project thumbnails: 900 x 600 or 1200 x 800, displayed at 16:10.
- Proof-wall thumbnails: 900 x 506 or 1200 x 675, displayed at 16:9.
- Case-study screenshots: 1600 px wide minimum.
- Headshots: 1200 x 1200 square crop plus original source outside repo.
- Open Graph image: 1200 x 630.

Prefer optimized JPG/WebP for photos and PNG/WebP for screenshots.
SVGs are appropriate for diagrams, placeholders, and abstract visuals.

## Stock Photo Guidance

Unsplash and Pexels can be used for commercial projects under their
licenses. Even then, avoid recognizable people, trademarks, logos, brand
heavy scenes, and visuals that imply an endorsement unless permission is
clear. Attribution is not required by those licenses but can be
appreciated.

Owner-created photos and screenshots are preferred. The site should not
look stock-photo first.

## Replacing Placeholders

1. Add the new approved file under the matching `assets/images/` folder.
2. Keep the existing SVG until the replacement has been reviewed.
3. Update the relevant `src` and `alt` text in the HTML.
4. Rebuild with `npm run build`.
5. Preview the page and confirm there is no layout shift or cropped
   critical detail.
6. Run the privacy checklist before deployment.

## Social Image Notes

`assets/images/social/og-default.svg` is the current social preview
asset. Some social platforms handle SVG Open Graph images inconsistently.
Create and reference `assets/images/social/og-default.png` later after
exporting a reviewed 1200 x 630 PNG. Do not add a PNG reference until the
PNG exists.

## Future Media Checklist

- [ ] Chuk headshot
- [ ] Workstation/laptop setup
- [ ] Raspberry Pi/server setup
- [ ] Camera/NVR hardware setup
- [ ] Cloudflare deployment screenshot with no secrets
- [ ] Orion dashboard/demo screenshot with fictional data only
- [ ] ForgeWorks screenshot with no private data
- [ ] Peppino's public-facing website/Google/local SEO screenshots only
- [ ] Restaurant tech/process photos only with permission and no
      private/customer data
