# backend/

Reserved for future, **locally hosted** tooling that supports the
Uyammadu ecosystem. This folder is intentionally empty today.

## What lives here (planned)

- `lead_radar/` — local opportunity radar (see
  `lead_radar_blueprint.md` and
  `../docs/OPPORTUNITY_RADAR_BLUEPRINT.md`).
- `notify/` — small wrappers around ntfy for the Crenshaw workflow
  (see `../docs/CRENSHAW_NTFY_WORKFLOW.md`).
- `scripts/` — operator-only shell scripts.

## What does not live here

- Anything that runs in production for the public site. The public
  site is static; if a backend is ever needed for the public site, it
  will live in a separate repo.
- Secrets, tokens, or `.env` files. Those stay outside the repo.
- Scraping code. Anything that fetches from third-party sources must
  follow the rules in `OPPORTUNITY_RADAR_BLUEPRINT.md` first, and
  then be approved by the operator.

## Working agreement

- Manual workflow first.
- Local-only by default.
- No external network calls without explicit approval.
- All data is operator-owned and operator-purgeable.
