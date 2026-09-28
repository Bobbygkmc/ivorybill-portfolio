# Local services redesign

## Brief and product facts

Chuk Uyammadu provides IT and systems work for local business owners in Bucks
County, PA. The homepage should help an owner identify a service and contact
Chuk. Local services lead; Python, backend work and AI prototypes provide depth.
The supplied hero copy is verbatim, including its deliberate exceptions to the
otherwise plain, direct voice. Keep existing service prices and project limits.

## Recon

The checkout is `/home/lo-mein/uyammadu-portfolio` on lo-mein. No remote checkout
is required. The site uses static HTML, Sass and vanilla JavaScript. There is no
frontend framework or client router. HTML files map to extensionless routes.

Public copy sources:

- `index.html`: homepage, including the inline `.uy-hero` section.
- `about.html`: biography and technical background.
- `services.html`: service catalog.
- `cameras.html`: camera installation and handoff details.
- `projects.html`: project directory and status definitions.
- `orion.html`, `forgeworks.html`: project case studies.
- `pricing.html`: prices and estimate qualifications.
- `contact.html`: request form and direct contact details.
- `cv.html`: resume and print controls.
- `index.js`: menu labels, form progress, success and failure messages.
- `functions/api/contact.js`: form validation and delivery responses.
- `assets/images/social/og-default.svg`: social-preview text.
- `assets/images/projects/project-{ai-dashboard,restaurant-tech,cloudflare-pipeline,raspberry-pi-lab,camera-nvr,community-platform}.svg`
  and `assets/images/placeholders/project-operator-console.svg`: embedded image labels.

Historical HTML under `archive/` and exploratory `docs/remodel-samples/` are
outside the public build and this redesign. Existing documentation is reference
material rather than rendered site copy.

Build: `npm run build` compiles `sass/main.scss` into `css/style.css`, then copies
public assets into `dist/`. Cloudflare Pages settings are in `wrangler.toml`;
`_redirects` and `_headers` control routing and response policy. The contact
function at `/api/contact` uses the existing email provider configuration. No
change to its delivery or monitoring setup is required for this redesign.

## Design direction

A client work order: warm paper, dark ink, straight rules and modest headings.
Keep Geist for display and body copy; use the system monospace stack for field
labels and statuses. One green accent marks links, actions and deployed status.
No decorative gradients, glow, card shadows or entrance animation. The homepage
reads Services, Selected work, How I work, About, Contact with labels 01–05.
Services show Scope, Timeline and Handoff. Timelines describe scheduling steps;
they do not promise unconfirmed turnaround times.

Project statuses retain their context: Peppino's is private client support;
the business website is deployed; Orion remains a prototype with fictional data.

## Phases and validation

1. Rewrite public copy. Build and run the existing tests.
2. Build the light work-order layout, tickets and status variants. Build.
3. Reorder the homepage and finish navigation. Build, run tests and verify
   desktop plus 390px mobile in Chromium, including local routes and form states.

Each phase receives its own commit. Preserve unrelated work already present in
the checkout. Local preview does not execute Cloudflare Pages Functions, so form
UI tests use simulated responses and must not be described as email delivery
proof. Publishing requires a separate deployment decision.

## Review notes

The old theme toggle and entrance animation are removed from the public pages.
Geist is served from `assets/fonts/` with its OFL license. Field labels, section
numbers, project details and status badges use the system monospace stack. The new Sass partial is `sass/pages/_uy-work-order.scss`.
The social preview uses the same paper/ink treatment. The final phase removes
obsolete canvas markup and JavaScript from the committed files as well as the
working build. Existing unrelated Sass/config/backend edits remain uncommitted.

### Repeat the checks

```bash
npm run build
npm test
node --test --experimental-test-coverage tests/*.test.mjs
node scripts/check-redesign.mjs dist
```

For browser checks, start a separate headless Chromium with a temporary profile:

```bash
chromium --headless --no-sandbox --disable-gpu --disable-dev-shm-usage \
  --no-proxy-server --remote-debugging-port=9226 \
  --user-data-dir=/tmp/uyammadu-redesign-check about:blank
node scripts/check-redesign-browser.mjs
```

Use `--no-sandbox` only for the local test environment that requires it. The
browser script visits built files by default: Chromium's HTTP navigation stalled
in this environment even though curl received complete responses. Clean-route
HTTP status is checked separately against the preview server. This distinction
must remain visible in test reports. The script mocks contact responses; it does
not send email. Screenshots are local review artifacts in `.impeccable/review/`.

The design detector ran with missing parser modules and fell back to regex.
Its only findings were the retained Geist font. That is not a full accessibility
check; rendered browser checks and review provide the layout evidence.

### Completed validation — 2026-09-28

- All three phase builds passed. Phase 1 and Phase 2 were also rebuilt from
  isolated committed copies; the final staged files passed an isolated build
  and the new static contract suite.
- The working checkout's four Node test files passed. Node reported 96.08% line
  coverage for the files exercised by those tests, not whole-repository coverage.
- Chromium passed 20 route/viewport combinations: all ten public pages at 390px
  and 1440px. No horizontal overflow, offscreen controls, broken images, page
  console/runtime errors or targeted text-contrast failures were detected.
- Interactions passed: mobile menu opening, link close, Escape/focus return,
  desktop resize close, About portrait dialog and the CV print control. Contact
  form success and failure feedback passed with mocked responses and zero sends.
- V8 coverage for `index.js` across the browser checks was 81.7% of source bytes
  and 85.0% of functions. Coverage is collected after each route to retain
  execution from navigation contexts that Chromium later discards.
- All ten local clean routes returned HTTP 200 in separate curl checks.
- Independent finish review: ship, with no blocking finding. Palette checks
  reported 6.11:1 for muted text on paper and 8.01:1 for white text on the action.
- Exact hero exceptions were preserved. Remaining functional questions, such as
  Orion's demo query, are data examples rather than marketing CTAs.

These checks cover the local redesign. They do not prove live deployment or
contact-email delivery. No push or deployment was performed.

## Maintenance contracts

Most rules in `_uy-work-order.scss` apply to every `body.uy-page`. Keep secondary
pages in the visual checks when changing its tokens or base overrides.

Every `.work-ticket` contains one `.work-ticket__scope`, `.work-ticket__timeline`
and `.work-ticket__handoff`. Status badges use `data-status` values `deployed`,
`in-progress` and `supported`. Update the markup, Sass and redesign test together.
