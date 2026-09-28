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
