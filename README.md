# dev.uyammadu.com

Source for [dev.uyammadu.com](https://dev.uyammadu.com), the portfolio and
small-business technology services site of Chuk Uyammadu, a veteran-owned
tech practice in Bucks County, PA.

The site covers security cameras, networking and Wi-Fi, POS systems,
websites, and restaurant systems, plus case studies for projects such as
Orion and ForgeWorks.

## Stack

- Static HTML, CSS, and vanilla JavaScript
- SASS (7-1 layout) compiled to `css/style.css`
- One serverless function, `functions/api/contact.js`, for the contact form
- No frameworks, no database, no tracking scripts

## Run it locally

```bash
npm install        # dev dependencies (sass)
npm run dev        # watch SASS and recompile on save
npm run build      # compile CSS and copy deployable files to dist/
npm run preview    # serve dist/ at http://127.0.0.1:4173 with clean URLs
npm test           # page structure checks
```

Edit the SASS sources under `sass/`. `css/style.css` is build output.

## Project layout

```
.
├── index.html, about.html, services.html, pricing.html,
│   projects.html, orion.html, forgeworks.html, cameras.html,
│   contact.html, cv.html, 404.html
├── assets/              images, icons, brand marks
├── sass/                SASS sources
├── css/                 compiled CSS
├── index.js             navigation, year stamp, form guard
├── functions/api/       contact form endpoint
├── scripts/             local preview server and page checks
├── tests/               node:test checks
├── _headers, _redirects security headers and clean routes
└── wrangler.toml        Pages project config
```

## Deploy

`npm run build` writes the site to `dist/`. Publish `dist/` as static files
and deploy `functions/` alongside it for the contact form.

The contact function reads these environment variables (set them in the
host, never in the repo):

- `RESEND_API_KEY` (secret)
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## License

Built on the Dopefolio template, licensed under GPL-3.0 (see `LICENSE`).
Site content and new code are by Chuk Uyammadu.
